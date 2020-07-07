import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { ModalSeleccionarMoviment } from "../../../../components/modal-seleccionar-moviment";
import { usePostAPI } from "../../../../helpers";
import { fetchMoviments } from "../../../../redux/moviments/moviments-actions";
import { ProjectePropTypes } from "../../../../typedef/prop-types";

const DropdownAfegirMovimentProjecte = ({ projecte }) => {
  const dispatch = useDispatch();

  const [loadingPostMoviment, postMoviment] = usePostAPI(
    `/projectes/${projecte.id_projecte}/moviments`
  );

  return (
    <Dropdown
      trigger="click"
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

DropdownAfegirMovimentProjecte.propTypes = {
  projecte: ProjectePropTypes,
};

export default DropdownAfegirMovimentProjecte;
