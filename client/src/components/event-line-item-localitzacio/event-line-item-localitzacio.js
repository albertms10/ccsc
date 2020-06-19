import { EnvironmentFilled } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import { EventLineItem } from "../../standalone/event-line-item";
import { LinkButton } from "../../standalone/link-button";
import { EsdevenimentPropTypes } from "../../typedef/prop-types";
import { Authorized } from "../authorized";

const { Text } = Typography;

const EventLineItemLocalitzacio = ({ esdeveniment }) => (
  <EventLineItem icon={<EnvironmentFilled />}>
    {esdeveniment.establiment || esdeveniment.localitzacio ? (
      <>
        {esdeveniment.establiment && <Text>{esdeveniment.establiment}</Text>}
        <Text type={esdeveniment.establiment ? "secondary" : "primary"}>
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

EventLineItemLocalitzacio.propTypes = {
  esdeveniment: EsdevenimentPropTypes.isRequired,
};

export default EventLineItemLocalitzacio;
