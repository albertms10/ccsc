import { PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React, { useContext } from "react";
import { FixedTagsProjectes } from "../../../../components/fixed-tags-projectes";
import { useAPI } from "../../../../helpers";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { ContentList } from "../../../../standalone/content-list";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { timeDuration } from "../../../../utils";
import { ObraContext } from "../../detall-obra";
import { ModalAfegirMoviment } from "../modal-afegir-moviment";

export default () => {
  const { id_obra, durada_total } = useContext(ObraContext);

  const [moviments, loadingMoviments, getMoviments] = useAPI(
    `/obres/${id_obra}/moviments`
  );

  return (
    <ContentList
      title="Moviments"
      loading={loadingMoviments}
      dataSource={moviments.map((moviment) => ({
        id: moviment.id_moviment,
        title: moviment.titol_moviment,
        link: `/obres/${moviment.id_obra}/moviments/${moviment.id_moviment}`,
        actions: [
          timeDuration(moviment.durada),
          ...(moviment.projectes && moviment.projectes.length > 0
            ? [<FixedTagsProjectes projectes={moviment.projectes} />]
            : []),
          <DropdownBorderlessButton />,
        ],
        avatar: (
          <Typography.Text type="secondary" style={{ fontSize: "small" }}>
            {moviment.ordre}
          </Typography.Text>
        ),
      }))}
      action={
        <ModalAfegirMoviment
          button={<BorderlessButton shape="circle" icon={<PlusOutlined />} />}
          getMoviments={getMoviments}
        />
      }
      extra={durada_total && `Total: ${timeDuration(durada_total)}`}
    />
  );
};
