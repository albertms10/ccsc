import React, { useEffect, useState } from 'react';

import { Page } from '../../standalone/page';
import { TaulaSocis } from '../../components/taula-socis';
import { ModalAfegirSoci } from '../../components/modal-afegir-soci';
import { Container } from '../../standalone/container';

export default () => {
  /**
   * @param socis
   * @param socis.nom_complet
   * @param socis.username
   * @param socis.email
   * @param socis.telefon
   * @param socis.estat_actiu
   * @param socis.dies_activitat
   * @param socis.data_inactiu
   */
  const [socis, setSocis] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSocis();
  }, []);

  const getSocis = (next) => {
    setLoading(true);
    fetch("/api/socis")
      .then((response) => response.json())
      .then((data) => {
        setSocis(data);
        setLoading(false);
        if (typeof next === "function") next();
      });
  };

  return (
    <Container>
      <Page title="Socis" action={<ModalAfegirSoci getSocis={getSocis} />}>
        <TaulaSocis socis={socis} getSocis={getSocis} loading={loading} />
      </Page>
    </Container>
  );
};
