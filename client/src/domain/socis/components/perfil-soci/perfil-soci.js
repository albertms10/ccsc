import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SubPage } from '../../../../standalone/sub-page';

export default () => {
  const [soci, setSoci] = useState({});
  const { username } = useParams();

  useEffect(() => {
    fetch(`/api/socis/${username}`)
      .then(res => res.json())
      .then(setSoci);
  }, [username]);

  return (
    <SubPage title={soci.nom_complet} subtitle={username}>

    </SubPage>
  );
}
