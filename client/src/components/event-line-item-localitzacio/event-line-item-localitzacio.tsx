import { EnvironmentFilled } from "@ant-design/icons";
import { Typography } from "antd";
import { Esdeveniment } from "model";
import React from "react";
import { EventLineItem } from "../../standalone/event-line-item";
import { LinkButton } from "../../standalone/link-button";
import { Authorized } from "../authorized";

const { Text } = Typography;

interface EventLineItemLocalitzacioProps {
  esdeveniment: Esdeveniment;
}

const EventLineItemLocalitzacio: React.FC<EventLineItemLocalitzacioProps> = ({
  esdeveniment,
}) => (
  <EventLineItem icon={<EnvironmentFilled />}>
    {esdeveniment.establiment || esdeveniment.localitzacio ? (
      <>
        {esdeveniment.establiment && <Text>{esdeveniment.establiment}</Text>}
        <Text type={esdeveniment.establiment ? "secondary" : undefined}>
          {esdeveniment.localitzacio}
        </Text>
      </>
    ) : (
      <Authorized
        elseElement={<Text type="secondary">Sense localització</Text>}
      >
        <LinkButton>Afegeix localització</LinkButton>
      </Authorized>
    )}
  </EventLineItem>
);

export default EventLineItemLocalitzacio;
