import { Typography } from "antd";
import React, { useContext } from "react";
import { ContentList } from "../../../../standalone/content-list";
import { timeDuration } from "../../../../utils";
import { ObraContext } from "../../detall-obra";
import { ModalAfegirMoviment } from "../modal-afegir-moviment";
import { useMoviments } from "./hooks";

export default () => {
  const { id_obra, durada_total } = useContext(ObraContext);

  const [moviments, loadingMoviments, getMoviments] = useMoviments(id_obra);

  return (
    <ContentList
      title="Moviments"
      loading={loadingMoviments}
      dataSource={moviments.map((moviment) => ({
        id: moviment.id_moviment,
        title: moviment.titol,
        link: `/obres/${moviment.id_obra}/moviments/${moviment.id_moviment}`,
        extra: moviment.durada ? timeDuration(moviment.durada) : "Sense durada",
        avatar: (
          <Typography.Text type="secondary" style={{ fontSize: "small" }}>
            {moviment.ordre}
          </Typography.Text>
        ),
      }))}
      action={<ModalAfegirMoviment getMoviments={getMoviments} />}
      extra={durada_total && `Total: ${timeDuration(durada_total)}`}
    />
  );
};
