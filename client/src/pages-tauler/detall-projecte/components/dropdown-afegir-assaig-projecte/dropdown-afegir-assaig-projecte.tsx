import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { Projecte } from "model";
import moment from "moment";
import React from "react";
import { ModalSeleccionarAssaig } from "../../../../components/modal-seleccionar-assaig";
import { usePostAPI } from "../../../../helpers";
import { ModalAfegirAssaig } from "../../../assajos/components/modal-afegir-assaig";

interface DropdownAfegirAssaigProjecteProps {
  projecte: Projecte;
}

const DropdownAfegirAssaigProjecte: React.FC<DropdownAfegirAssaigProjecteProps> = ({
  projecte,
}) => {
  const [loadingPostAssaig, postAssaig] = usePostAPI(
    `/projectes/${projecte.id_projecte}/assajos`
  );

  return (
    <Dropdown
      trigger={["click"]}
      overlay={
        <Menu>
          <ModalAfegirAssaig
            button={<Menu.Item>Nou assaig</Menu.Item>}
            idProjecte={projecte.id_projecte}
          />
          <ModalSeleccionarAssaig
            button={<Menu.Item>Selecciona assaig</Menu.Item>}
            loading={loadingPostAssaig}
            dataFilter={(assaig) =>
              !!assaig.projectes.find(
                (projecteAssaig) =>
                  projecteAssaig.id_projecte !== projecte.id_projecte
              ) &&
              (projecte.data_inici
                ? moment(assaig.data_inici).isBetween(
                    moment(projecte.data_inici),
                    moment(projecte.data_final)
                  )
                : true)
            }
            onItemClick={({ id_assaig }) => postAssaig({ id_assaig })}
          />
        </Menu>
      }
    >
      <Button type="primary">
        Afegir assaig <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropdownAfegirAssaigProjecte;
