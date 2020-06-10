import { Button, List, Tooltip } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { CollapseCard } from "../../standalone/collapse-card";
import { SociPropTypes } from "../../typedef/prop-types";
import { TimelineActivitatSoci } from "./components/timeline-activitat-soci";
import { useActivitatSoci, useAltaSoci, useBaixaSoci } from "./hooks";

const SettingCardActivitat = ({ soci, active }) => {
  const [activitatSoci, loadingActivitat, fetchActivitat] = useActivitatSoci(
    soci
  );
  const [loadingAlta, modalAltaSoci] = useAltaSoci(soci);
  const [loadingBaixa, modalBaixaSoci] = useBaixaSoci(soci);

  const actionItem = useCallback(() => {
    if (activitatSoci.length > 0 && activitatSoci[activitatSoci.length - 1].data_baixa) {
      const disabled =
        moment(activitatSoci[activitatSoci.length - 1].data_alta).format(
          "L"
        ) === moment().format("L");

      return (
        <Tooltip title={disabled ? "Només es pot fer un cop al dia." : ""}>
          <Button
            type="primary"
            size="small"
            loading={loadingAlta}
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              modalAltaSoci(fetchActivitat);
            }}
          >
            Donar d’alta
          </Button>
        </Tooltip>
      );
    } else {
      return (
        <Button
          type="danger"
          size="small"
          loading={loadingBaixa}
          onClick={(e) => {
            e.stopPropagation();
            modalBaixaSoci(fetchActivitat);
          }}
        >
          Donar de baixa
        </Button>
      );
    }
  }, [
    activitatSoci,
    fetchActivitat,
    loadingAlta,
    loadingBaixa,
    modalAltaSoci,
    modalBaixaSoci,
  ]);

  return (
    <CollapseCard title="Activitat" actionItem={actionItem()} active={active}>
      <List
        dataSource={activitatSoci}
        loading={loadingActivitat}
        renderItem={(activitat) => (
          <List.Item>
            <TimelineActivitatSoci activitat={activitat} />
          </List.Item>
        )}
      />
    </CollapseCard>
  );
};

SettingCardActivitat.propTypes = {
  soci: SociPropTypes.isRequired,
  active: PropTypes.bool,
};

export default SettingCardActivitat;