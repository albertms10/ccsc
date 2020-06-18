import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React, { useContext } from "react";
import { Authorized } from "../../../../components/authorized";
import { useAPI } from "../../../../helpers";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { ContentList } from "../../../../standalone/content-list";
import { AssaigContext } from "../../detall-assaig";
import { PopoverProjectesAssaig } from "../popover-projectes-assaig";

export default () => {
  const assaig = useContext(AssaigContext);

  const [moviments, loadingMoviments, getMovimentsAssaig] = useAPI(
    `/api/assajos/${assaig.id_assaig}/moviments`
  );

  return (
    <ContentList
      title="Moviments"
      persones={moviments}
      loading={loadingMoviments}
      action={
        <Space>
          <Authorized>
            <BorderlessButton shape="circle" icon={<PlusOutlined />} />
          </Authorized>
          <PopoverProjectesAssaig getMovimentsAssaig={getMovimentsAssaig} />
        </Space>
      }
      itemExtra={() => <BorderlessButton icon={<CloseOutlined />} />}
    />
  );
};
