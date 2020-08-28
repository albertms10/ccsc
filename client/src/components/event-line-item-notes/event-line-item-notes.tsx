import { AlignRightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Authorized } from "components/authorized";
import { Esdeveniment } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { EventLineItem } from "standalone/event-line-item";
import { LinkButton } from "standalone/link-button";

const { Text } = Typography;

interface EventLineItemNotesProps {
  esdeveniment: Esdeveniment;
}

const EventLineItemNotes: React.FC<EventLineItemNotesProps> = ({
  esdeveniment,
}) => {
  const { t } = useTranslation("events");

  return (
    <EventLineItem icon={<AlignRightOutlined />}>
      {esdeveniment.notes || (
        <Authorized elseElement={<Text type="secondary">{t("no notes")}</Text>}>
          <LinkButton>{t("actions:sadd notes")}</LinkButton>
        </Authorized>
      )}
    </EventLineItem>
  );
};

export default EventLineItemNotes;
