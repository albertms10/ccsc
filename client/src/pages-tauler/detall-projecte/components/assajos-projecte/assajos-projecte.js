import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { ModalSeleccionarAssaig } from "../../../../components/modal-seleccionar-assaig";
import { usePostAPI } from "../../../../helpers";
import { Container } from "../../../../standalone/container";
import { ModalAfegirAssaig } from "../../../assajos/components/modal-afegir-assaig";
import { SearchAssajosTabs } from "../../../assajos/components/search-assajos-tabs";
import { ProjecteContext, SetActionContext } from "../../detall-projecte";

export default () => {
  const projecte = useContext(ProjecteContext);
  const setAction = useContext(SetActionContext);

  const [loadingPostAssaig, postAssaig] = usePostAPI(
    `/api/projectes/${projecte.id_projecte}/assajos`
  );

  useEffect(
    () =>
      setAction(
        <Dropdown
          trigger="click"
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
      ),
    [
      setAction,
      projecte.id_projecte,
      projecte.data_inici,
      projecte.data_final,
      loadingPostAssaig,
      postAssaig,
    ]
  );

  return (
    <Container>
      <SearchAssajosTabs idProjecte={projecte.id_projecte} />
    </Container>
  );
};
