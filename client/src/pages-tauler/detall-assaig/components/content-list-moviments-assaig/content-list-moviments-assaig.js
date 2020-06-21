import { CloseOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React, { useContext } from "react";
import { Authorized } from "../../../../components/authorized";
import { useAPI } from "../../../../helpers";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { ContentList } from "../../../../standalone/content-list";
import { AssaigContext } from "../../detall-assaig";
import { ModalListMovimentsAssaig } from "../modal-list-moviments-assaig";
import { PopoverProjectesAssaig } from "../popover-projectes-assaig";

export default () => {
  const assaig = useContext(AssaigContext);

  const [moviments, loadingMoviments, getMovimentsAssaig] = useAPI(
    `/api/assajos/${assaig.id_assaig}/moviments`
  );

  return (
    <ContentList
      title="Moviments"
      dataSource={moviments.map((moviment) => ({
        id: moviment.id_moviment,
        title: moviment.titol_moviment,
        description: moviment.titol_obra,
        link: `/obres/${moviment.id_obra}/moviments/${moviment.id_moviment}`,
      }))}
      loading={loadingMoviments}
      action={
        <Space>
          <Authorized>
            <ModalListMovimentsAssaig
              movimentsAssaig={moviments}
              getMovimentsAssaig={getMovimentsAssaig}
            />
          </Authorized>
          <PopoverProjectesAssaig getMovimentsAssaig={getMovimentsAssaig} />
        </Space>
      }
      itemExtra={() => <BorderlessButton icon={<CloseOutlined />} />}
    />
  );
};
