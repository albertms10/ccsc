import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React, { useContext, useEffect } from "react";
import { Container } from "../../../../standalone/container";
import { ModalAfegirAssaig } from "../../../assajos/components/modal-afegir-assaig";
import { SearchAssajosTabs } from "../../../assajos/components/search-assajos-tabs";
import { ProjecteContext, SetActionContext } from "../../detall-projecte";

export default () => {
  const { id_projecte } = useContext(ProjecteContext);
  const setAction = useContext(SetActionContext);

  useEffect(
    () =>
      setAction(
        <Dropdown
          trigger="click"
          overlay={
            <Menu>
              <ModalAfegirAssaig button={<Menu.Item>Nou assaig</Menu.Item>} />
              <Menu.Item>Selecciona’n…</Menu.Item>
            </Menu>
          }
        >
          <Button type="primary">
            Afegir assaig <DownOutlined />
          </Button>
        </Dropdown>
      ),
    [setAction, id_projecte]
  );

  return (
    <Container>
      <SearchAssajosTabs idProjecte={id_projecte} />
    </Container>
  );
};
