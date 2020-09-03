import { EnvironmentFilled } from "@ant-design/icons";
import { Typography } from "antd";
import { Authorized } from "components/authorized";
import { Esdeveniment } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { EventLineItem } from "standalone/event-line-item";
import { LinkButton } from "standalone/link-button";

const { Text } = Typography;

interface EventLineItemLocalitzacioProps {
  esdeveniment: Esdeveniment;
}

const EventLineItemLocalitzacio: React.FC<EventLineItemLocalitzacioProps> = ({
  esdeveniment,
}) => {
  const { t } = useTranslation("events");

  return (
    <EventLineItem icon={<EnvironmentFilled />}>
      {esdeveniment.nom_establiment || esdeveniment.nom_localitzacio ? (
        <>
          {esdeveniment.nom_establiment && (
            <Text>{esdeveniment.nom_establiment}</Text>
          )}
          <Text type={esdeveniment.nom_establiment ? "secondary" : undefined}>
            {esdeveniment.nom_localitzacio}
          </Text>
        </>
      ) : (
        <Authorized
          elseElement={<Text type="secondary">{t("no location")}</Text>}
        >
          <LinkButton>{t("actions:add location")}</LinkButton>
        </Authorized>
      )}
    </EventLineItem>
  );
};

export default EventLineItemLocalitzacio;
