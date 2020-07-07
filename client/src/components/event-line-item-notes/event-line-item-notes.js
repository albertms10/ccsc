import { AlignRightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import { EventLineItem } from "../../standalone/event-line-item";
import { LinkButton } from "../../standalone/link-button";
import { EsdevenimentPropTypes } from "../../typedef/prop-types-definitions";
import { Authorized } from "../authorized";

const { Text } = Typography;

const EventLineItemNotes = ({ esdeveniment }) => (
  <EventLineItem icon={<AlignRightOutlined />}>
    {esdeveniment.notes || (
      <Authorized elseElement={<Text type="secondary">Sense notes</Text>}>
        <LinkButton>Afegeix notes</LinkButton>
      </Authorized>
    )}
  </EventLineItem>
);

EventLineItemNotes.propTypes = {
  esdeveniment: EsdevenimentPropTypes.isRequired,
};

export default EventLineItemNotes;
