import { Typography } from "antd";
import React, { useContext } from "react";
import { useAPI } from "../../../../helpers";
import { ContentList } from "../../../../standalone/content-list";
import { timeDuration } from "../../../../utils";
import { ObraContext } from "../../detall-obra";
import { ModalAfegirMoviment } from "../modal-afegir-moviment";

export default () => {
  const { id_obra, durada_total } = useContext(ObraContext);

  const [moviments, loadingMoviments, getMoviments] = useAPI(
    `/api/obres/${id_obra}/moviments`
  );

  return (
    <ContentList
      title="Moviments"
      loading={loadingMoviments}
      dataSource={moviments.map((moviment) => ({
        id: moviment.id_moviment,
        title: moviment.titol,
        link: `/obres/${moviment.id_obra}/moviments/${moviment.id_moviment}`,
        extra: timeDuration(moviment.durada),
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
