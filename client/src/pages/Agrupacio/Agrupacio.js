import React, { useEffect, useState } from 'react';
import { Avatar, Col, Row } from 'antd';
import IconAgrupacio from '../../icons/IconAgrupacio';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import ContentList from '../../components/ContentList/ContentList';
import moment from 'moment';

export default ({ agrupacio }) => {
  const [assajos, setAssajos] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [projectes, setProjectes] = useState([]);

  useEffect(() => {
    fetch(`/api/agrupacions/${agrupacio.id_agrupacio}/assajos`)
      .then(res => res.json())
      .then(data => setAssajos(data));

    fetch(`/api/agrupacions/${agrupacio.id_agrupacio}/concerts`)
      .then(res => res.json())
      .then(data => setConcerts(data));

    fetch(`/api/agrupacions/${agrupacio.id_agrupacio}/projectes`)
      .then(res => res.json())
      .then(data => setProjectes(data));
  }, []);

  return (
    <>
      <HeaderTitle
        title={agrupacio.nom}
        subtitle={agrupacio.descripcio}
        icon={<IconAgrupacio name={agrupacio.nom_curt} style={{ color: '#1d71b8', fontSize: '4rem' }} />}
      />

      <Row gutter={32}>
        <Col span={12}>
          <ContentList
            title="Assajos"
            data={assajos.map(({ data_inici, es_extra }) => (
              {
                title: 'Assaig' + (es_extra ? ' extra' : ''),
                extra: moment(data_inici).format('LLL'),
              }
            ))}
          />
          <ContentList
            title="Concerts"
            data={concerts.map(({ titol, data_inici }) => (
              {
                title: titol,
                extra: moment(data_inici).format('LLL'),
              }
            ))}
            style={{ marginTop: '3rem' }}
          />
        </Col>
        <Col span={12}>
          <ContentList
            title="Projectes"
            data={projectes.map(({ titol, inicials, color }) => (
              {
                title: titol,
                avatar: <Avatar style={{ backgroundColor: `#${color}` }}>{inicials}</Avatar>,
              }
            ))}
          />
        </Col>
      </Row>
    </>
  );
}
