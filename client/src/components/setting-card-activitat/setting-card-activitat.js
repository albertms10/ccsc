import { Button, List, Tooltip } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { SettingCard } from "../../standalone/setting-card";
import { SociPropTypes } from "../../typedef/prop-types";
import { TimelineActivitatSoci } from "./components/timeline-activitat-soci";
import { useActivitatSoci, useAltaSoci, useBaixaSoci } from "./hooks";

const SettingCardActivitat = ({ soci, active }) => {
  const [activitatSoci, loadingActivitat, fetchActivitat] = useActivitatSoci(
    soci
  );
  const [loadingAlta, modalAltaSoci] = useAltaSoci(soci);
  const [loadingBaixa, modalBaixaSoci] = useBaixaSoci(soci);

  const actionItem = () => {
    if (activitatSoci.length > 0 && activitatSoci[activitatSoci.length - 1]) {
      const disabled =
        moment(activitatSoci[activitatSoci.length - 1].data_alta).format(
          "L"
        ) === moment().format("L");

      return (
        <Tooltip
          title={disabled ? "Només es pot fer un cop al dia." : ""}
        >
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
  };

  return (
    <SettingCard title="Activitat" actionItem={actionItem()} active={active}>
      <List
        dataSource={activitatSoci}
        loading={loadingActivitat}
        renderItem={(activitat) => (
          <List.Item>
            <TimelineActivitatSoci activitat={activitat} />
          </List.Item>
        )}
      />
    </SettingCard>
  );
};

SettingCardActivitat.propTypes = {
  soci: SociPropTypes.isRequired,
  active: PropTypes.bool,
};

export default SettingCardActivitat;
