import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Authorized } from "components/authorized";
import { useAPI, useDeleteAPI } from "helpers";
import { Moviment } from "model";
import { AssaigContext } from "pages/tauler/detall-assaig";
import React, { useContext } from "react";
import { BorderlessButton } from "standalone/borderless-button";
import { ContentList } from "standalone/content-list";
import { ModalFragmentsTreballatsMoviment } from "../modal-fragments-treballats-moviment";
import { ModalListMovimentsAssaig } from "../modal-list-moviments-assaig";
import { PopoverProjectesAssaig } from "../popover-projectes-assaig";

const ContentListMovimentsAssaig: React.FC = () => {
  const assaig = useContext(AssaigContext);

  const [moviments, loadingMoviments, getMovimentsAssaig] = useAPI<Moviment[]>(
    `/assajos/${assaig.id_assaig}/moviments`,
    []
  );
  const [loadingDelete, deleteMoviment] = useDeleteAPI(
    `/assajos/${assaig.id_assaig}/moviments`,
    "el moviment",
    getMovimentsAssaig
  );

  return (
    <ContentList
      title="Moviments"
      dataSource={moviments.map((moviment) => ({
        id: moviment.id_moviment,
        title: moviment.titol_moviment,
        description: moviment.titol_obra,
        link: `/obres/${moviment.id_obra}/moviments/${moviment.id_moviment}`,
        extra: <ModalFragmentsTreballatsMoviment moviment={moviment} />,
        actions: [
          <BorderlessButton
            key="delete"
            size="small"
            shape="circle"
            tooltip="Eliminar de l’assaig"
            icon={<CloseOutlined />}
            onClick={() => deleteMoviment(moviment.id_moviment)}
          />,
        ],
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

export default ContentListMovimentsAssaig;
