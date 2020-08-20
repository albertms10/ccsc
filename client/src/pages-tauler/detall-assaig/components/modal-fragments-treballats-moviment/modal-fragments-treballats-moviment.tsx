import { BoxPlotOutlined } from "@ant-design/icons/lib";
import { Divider, List } from "antd";
import { ModalButton } from "components/modal-button";
import { useAPI } from "helpers";
import { FragmentMovimentEsdevenimentMusical, Moviment } from "model";
import { AssaigContext } from "pages-tauler/detall-assaig";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BorderlessButton } from "standalone/borderless-button";
import { HeatMap } from "standalone/heat-map";
import { LinkedInputNumbers } from "standalone/linked-input-numbers";
import { useCompassosTreballats, useSeccionsMoviments } from "./hooks";

interface ModalFragmentsTreballatsMovimentProps {
  moviment: Moviment;
}

const ModalFragmentsTreballatsMoviment: React.FC<ModalFragmentsTreballatsMovimentProps> = ({
  moviment,
}) => {
  const { t } = useTranslation("dashboard");

  const assaig = useContext(AssaigContext);

  const [fragmentsTreballats, loadingFragmentsTreballats] = useAPI<
    FragmentMovimentEsdevenimentMusical[]
  >(
    `/assajos/${assaig.id_assaig}/moviments/${moviment.id_moviment}/fragments`,
    []
  );

  const [seccionsMoviment, loadingSeccionsMoviment] = useSeccionsMoviments(
    moviment
  );
  const [
    compassosTreballats,
    loadingCompassosTreballats,
  ] = useCompassosTreballats(moviment);

  return (
    <ModalButton
      title={t("worked fragments")}
      button={
        <BorderlessButton
          size="small"
          shape="circle"
          tooltip={t("worked fragments")}
          icon={<BoxPlotOutlined />}
        />
      }
      footer={null}
      renderModalBody={() => (
        <>
          <HeatMap
            sections={seccionsMoviment}
            numbers={compassosTreballats}
            loading={loadingSeccionsMoviment || loadingCompassosTreballats}
          />
          <Divider />
          <List
            dataSource={fragmentsTreballats}
            loading={loadingFragmentsTreballats}
            renderItem={(fragment, index) => (
              <List.Item
                actions={[
                  <LinkedInputNumbers
                    values={[
                      fragment.compas_inici || 1,
                      fragment.compas_final || null,
                    ]}
                    placeholders={["common:start", "common:end"]}
                    max={moviment.compassos}
                  />,
                ]}
              >
                <List.Item.Meta title={t("fragment", { number: index + 1 })} />
              </List.Item>
            )}
          />
          <List.Item
            style={{ opacity: 0.7 }}
            actions={[
              <LinkedInputNumbers
                values={[null, null]}
                placeholders={["common:start", "common:end"]}
                max={moviment.compassos}
              />,
            ]}
          >
            <List.Item.Meta title={t("new fragment")} />
          </List.Item>
        </>
      )}
    />
  );
};

export default ModalFragmentsTreballatsMoviment;
