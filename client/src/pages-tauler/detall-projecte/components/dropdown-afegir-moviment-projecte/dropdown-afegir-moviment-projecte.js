import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { ModalSeleccionarMoviment } from "../../../../components/modal-seleccionar-moviment";
import { usePostAPI } from "../../../../helpers";
import { ProjectePropTypes } from "../../../../typedef/prop-types";

const DropdownAfegirMovimentProjecte = ({ projecte }) => {
  const [loadingPostMoviment, postMoviment] = usePostAPI(
    `/api/projectes/${projecte.id_projecte}/moviments`
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
                  projecteMoviment.id_projecte !== projecte.id_projecte
              )
            }
            onItemClick={({ id_moviment }) => postMoviment({ id_moviment })}
          />
        </Menu>
      }
    >
      <Button type="primary">
        Afegir moviment <DownOutlined />
      </Button>
    </Dropdown>
  );
};

DropdownAfegirMovimentProjecte.propTypes = {
  projecte: ProjectePropTypes,
};

export default DropdownAfegirMovimentProjecte;
