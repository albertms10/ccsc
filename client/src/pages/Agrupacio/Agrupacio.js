import React, { useEffect, useState } from 'react';
import { Avatar, Col, Row } from 'antd';
import IconAgrupacio from '../../icons/IconAgrupacio';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import ContentList from '../../components/ContentList/ContentList';
import moment from 'moment';
import CalendarBadge from '../../components/CalendarBadge/CalendarBadge';

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
      .then(data => {
        data.forEach(projecte => {
          projecte.directors = JSON.parse(projecte.directors);
          projecte.agrupacions = JSON.parse(projecte.agrupacions);
        });
        setProjectes(data);
      });
  }, [agrupacio.id_agrupacio]);

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
            data={assajos.map(({ id_assaig, data_inici, es_extra }) => {
              const date = moment(data_inici);

              return ({
                id: id_assaig,
                title: 'Assaig' + (es_extra ? ' extra' : ''),
                extra: date.format('LT'),
                avatar: <CalendarBadge moment={date} />,
              });
            })}
          />
          <ContentList
            title="Concerts"
            data={concerts.map(({ id_concert, titol, data_inici }) => {
              const date = moment(data_inici);

              return ({
                id: id_concert,
                title: titol,
                extra: date.format('LT'),
                avatar: <CalendarBadge moment={date} />,
              });
            })}
            style={{ marginTop: '3rem' }}
          />
        </Col>
        <Col span={12}>
          <ContentList
            title="Projectes"
            data={projectes.map(({ id_projecte, titol, directors, agrupacions, inicials, color }) => (
              {
                id: id_projecte,
                title: titol,
                description: directors || agrupacions
                  ? <>Amb la col·laboració de <b>{directors[0].nom}</b></>
                  : null,
                avatar: <Avatar shape="square" style={{ backgroundColor: `#${color}` }}>{inicials}</Avatar>,
              }
            ))}
          />
        </Col>
      </Row>
    </>
  );
}
