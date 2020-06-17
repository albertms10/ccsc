import React, { useContext } from "react";
import { ContentList } from "../../../../standalone/content-list";
import { ObraContext } from "../../detall-obra";
import { ModalAfegirMoviment } from "../modal-afegir-moviment";
import { useMoviments } from "./hooks";

export default () => {
  const { id_obra } = useContext(ObraContext);

  const [moviments, loadingMoviments, getMoviments] = useMoviments(id_obra);

  return (
    <ContentList
      title="Moviments"
      loading={loadingMoviments}
      dataSource={moviments.map((moviment) => ({
        id: moviment.id_moviment,
        title: moviment.titol,
        link: `/obres/${moviment.id_obra}/moviments/${moviment.id_moviment}`,
        extra: moviment.durada || "Sense durada",
      }))}
      action={<ModalAfegirMoviment getMoviments={getMoviments} />}
    />
  );
};
