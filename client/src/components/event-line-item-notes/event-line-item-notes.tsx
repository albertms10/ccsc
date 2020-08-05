import { AlignRightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Esdeveniment } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { EventLineItem } from "../../standalone/event-line-item";
import { LinkButton } from "../../standalone/link-button";
import { Authorized } from "../authorized";

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
          <LinkButton>{t("add notes")}</LinkButton>
        </Authorized>
      )}
    </EventLineItem>
  );
};

export default EventLineItemNotes;
