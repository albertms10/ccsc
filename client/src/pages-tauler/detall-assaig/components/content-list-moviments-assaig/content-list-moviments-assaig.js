import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { Authorized } from "../../../../components/authorized";
import { useAPI, useDeleteAPI } from "../../../../helpers";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { ContentList } from "../../../../standalone/content-list";
import { AssaigContext } from "../../detall-assaig";
import { ModalListMovimentsAssaig } from "../modal-list-moviments-assaig";
import { PopoverProjectesAssaig } from "../popover-projectes-assaig";

export default () => {
  const assaig = useContext(AssaigContext);

  const [moviments, loadingMoviments, getMovimentsAssaig] = useAPI(
    `/assajos/${assaig.id_assaig}/moviments`
  );
  const [loadingDelete, deleteMoviment] = useDeleteAPI(
    `/assajos/${assaig.id_assaig}/moviments`,
    "el moviment"
  );

  return (
    <ContentList
      title="Moviments"
      dataSource={moviments.map((moviment) => ({
        id: moviment.id_moviment,
        title: moviment.titol_moviment,
        description: moviment.titol_obra,
        link: `/obres/${moviment.id_obra}/moviments/${moviment.id_moviment}`,
        extra: (
          <BorderlessButton
            size="small"
            type="circle"
            tooltip="Eliminar de l’assaig"
            icon={<CloseOutlined />}
            onClick={() => {
              deleteMoviment(moviment.id_moviment).then(() =>
                getMovimentsAssaig()
              );
            }}
          />
        ),
      }))}
      loading={loadingMoviments || loadingDelete}
      action={
        <Authorized>
          <ModalListMovimentsAssaig
            button={<BorderlessButton shape="circle" icon={<PlusOutlined />} />}
            movimentsAssaig={moviments}
            getMovimentsAssaig={getMovimentsAssaig}
          />
        </Authorized>
      }
      extra={<PopoverProjectesAssaig getMovimentsAssaig={getMovimentsAssaig} />}
    />
  );
};
