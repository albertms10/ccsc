import { PageHeader, Spin, Typography } from "antd";
import React, { createContext, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SelectEstatEsdeveniment } from "../../components/select-estat-esdeveniment";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { Container } from "../../standalone/container";
import { ContentListPersones } from "../formacio/components/content-list-persones";
import { PopoverVeusAssaig } from "./components/popover-veus-assaig";
import { useAssaig, useConvocatsAssaig } from "./hooks";

const { Title } = Typography;

export const AssaigContext = createContext({});

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);
  const history = useHistory();
  const { id } = useParams();

  const [assaig, loadingAssaig] = useAssaig(id);
  const [convocats, loadingConvocats, getConvocatsAssaig] = useConvocatsAssaig(
    id
  );

  useEffect(() => setPageHeader(assaig.titol), [setPageHeader, assaig.titol]);

  return (
    <AssaigContext.Provider value={assaig}>
      <PageHeader
        ghost={false}
        title={assaig.titol}
        onBack={() => history.goBack()}
      />
      <Spin spinning={loadingAssaig}>
        <Container>
          <Title level={2}>{assaig.titol}</Title>
          <ContentListPersones
            title="Convocades"
            persones={convocats}
            loading={loadingConvocats}
            action={
              <PopoverVeusAssaig getConvocatsAssaig={getConvocatsAssaig} />
            }
            itemExtra={(persona) => (
              <SelectEstatEsdeveniment idEsdeveniment={id} persona={persona} />
            )}
          />
        </Container>
      </Spin>
    </AssaigContext.Provider>
  );
};
