import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { Projecte } from "model";
import React from "react";
import { useDispatch } from "react-redux";
import { ModalSeleccionarMoviment } from "../../../../components/modal-seleccionar-moviment";
import { usePostAPI } from "../../../../helpers";
import { fetchMoviments } from "../../../../store/moviments/thunks";

interface DropdownAfegirMovimentProjecteProps {
  projecte: Projecte;
}

const DropdownAfegirMovimentProjecte: React.FC<DropdownAfegirMovimentProjecteProps> = ({
  projecte,
}) => {
  const dispatch = useDispatch();

  const [loadingPostMoviment, postMoviment] = usePostAPI(
    `/projectes/${projecte.id_projecte}/moviments`
  );

  return (
    <Dropdown
      trigger={["click"]}
      overlay={
        <Menu>
          <ModalSeleccionarMoviment
            button={<Menu.Item>Selecciona moviment</Menu.Item>}
            loading={loadingPostMoviment}
            dataFilter={(moviment) =>
              !moviment.projectes.find(
                (projecteMoviment) =>
                  projecteMoviment.id_projecte === projecte.id_projecte
              )
            }
            onItemClick={({ id_moviment }) =>
              postMoviment({ id_moviment }).then(() =>
                dispatch(fetchMoviments())
              )
            }
          />
        </Menu>
      }
    >
      <Button type="primary">
        Afegeix moviment <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropdownAfegirMovimentProjecte;
