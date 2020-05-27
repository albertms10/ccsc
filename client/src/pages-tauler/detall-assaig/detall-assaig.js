import { PageHeader, Spin } from "antd";
import React, { useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { Container } from "../../standalone/container";
import { useAssaig } from "./hooks";

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);
  const history = useHistory();
  const { id } = useParams();
  const [assaig, loading] = useAssaig(id);

  useEffect(() => setPageHeader(assaig.titol), [setPageHeader, assaig]);

  return (
    <>
      <PageHeader
        ghost={false}
        title={assaig.titol}
        onBack={() => history.goBack()}
      />
      <Spin spinning={loading}>
        <Container>{assaig.titol}</Container>
      </Spin>
    </>
  );
};
