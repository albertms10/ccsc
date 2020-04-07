import React, { useEffect, useState } from 'react';

import TaulaSocis from '../../components/TaulaSocis/TaulaSocis';
import ModalAfegirSoci from '../../components/ModalAfegirSoci/ModalAfegirSoci';
import Page from '../Page';

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
    fetch('/api/socis')
      .then(response => response.json())
      .then(data => {
        setSocis(data);
        setLoading(false);
        if (typeof next === 'function') next();
      });
  };

  return (
    <Page
      title="Socis"
      action={<ModalAfegirSoci getSocis={getSocis} />}
    >
      <TaulaSocis socis={socis} getSocis={getSocis} loading={loading} />
    </Page>
  );
};
