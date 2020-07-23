import { AlignRightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Esdeveniment } from "model";
import React from "react";
import { EventLineItem } from "../../standalone/event-line-item";
import { LinkButton } from "../../standalone/link-button";
import { Authorized } from "../authorized";

const { Text } = Typography;

interface EventLineItemNotesProps {
  esdeveniment: Esdeveniment;
}

const EventLineItemNotes: React.FC<EventLineItemNotesProps> = ({
  esdeveniment,
}) => (
  <EventLineItem icon={<AlignRightOutlined />}>
    {esdeveniment.notes || (
      <Authorized elseElement={<Text type="secondary">Sense notes</Text>}>
        <LinkButton>Afegeix notes</LinkButton>
      </Authorized>
    )}
  </EventLineItem>
);

export default EventLineItemNotes;
