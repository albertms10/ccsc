import React, { useEffect, useState } from 'react';
import { Avatar, Col, Row, Tooltip } from 'antd';
import { IconAgrupacio } from '../../icons';
import { HeaderTitle } from '../../standalone/header-title';
import { ContentList } from '../../standalone/content-list';
import { CalendarAvatar } from '../../standalone/calendar-avatar';
import { FixedTag } from '../../standalone/fixed-tag';
import { SmallBadge } from '../../standalone/small-badge';
import moment from 'moment';

export default ({ agrupacio }) => {
  const [assajos, setAssajos] = useState([]);
  const [loadingAssajos, setLoadingAssajos] = useState(false);

  const [concerts, setConcerts] = useState([]);
  const [loadingConcerts, setLoadingConcerts] = useState(false);

  const [projectes, setProjectes] = useState([]);
  const [loadingProjectes, setLoadingProjectes] = useState(false);

  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);

  useEffect(() => {
    setLoadingAssajos(true);
    setLoadingConcerts(true);
    setLoadingProjectes(true);
    setLoadingParticipants(true);

    fetch(`/api/agrupacions/${agrupacio.id_agrupacio}/assajos`)
      .then(res => res.json())
      .then(data => {
        setAssajos(data);
        setLoadingAssajos(false);
      });

    fetch(`/api/agrupacions/${agrupacio.id_agrupacio}/concerts`)
      .then(res => res.json())
      .then(data => {
        setConcerts(data);
        setLoadingConcerts(false);
      });

    fetch(`/api/agrupacions/${agrupacio.id_agrupacio}/projectes`)
      .then(res => res.json())
      .then(data => {
        setProjectes(data);
        setLoadingProjectes(false);
      });

    fetch(`/api/agrupacions/${agrupacio.id_agrupacio}/participants`)
      .then(res => res.json())
      .then(data => {
        setParticipants(data);
        setLoadingParticipants(false);
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
            loading={loadingAssajos}
            data={assajos.map(({ id_assaig, data_inici, es_general, es_extra, projectes }) => {
              const date = moment(data_inici);

              return ({
                id: id_assaig,
                title: `Assaig${es_general ? ' general' : ''}${es_extra ? ' extra' : ''}`,
                description: `a les ${date.format('LT')}`,
                extra: projectes
                  ? (projectes.map(projecte => (
                    <Tooltip title={`Projecte «${projecte.titol}»`}>
                      <FixedTag color={'#' + projecte.color}>
                        {projecte.inicials}
                      </FixedTag>
                    </Tooltip>
                  )))
                  : null,
                avatar: <CalendarAvatar moment={date} />,
              });
            })}
          />
          <ContentList
            title="Concerts"
            loading={loadingConcerts}
            data={concerts.map(({ id_concert, titol_concert, data_inici, titol_projecte, inicials_projecte, color_projecte }) => {
              const date = moment(data_inici);

              return ({
                id: id_concert,
                title: titol_concert,
                description: `a les ${date.format('LT')}`,
                extra: titol_projecte
                  ? (
                    <Tooltip title={`Projecte «${titol_projecte}»`}>
                      <FixedTag color={'#' + color_projecte}>
                        {inicials_projecte}
                      </FixedTag>
                    </Tooltip>
                  )
                  : null,
                avatar: <CalendarAvatar moment={date} />,
              });
            })}
            style={{ marginTop: '3rem' }}
          />
        </Col>
        <Col span={12}>
          <ContentList
            title="Projectes"
            loading={loadingProjectes}
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
          <ContentList
            title="Participants"
            loading={loadingParticipants}
            data={participants.map(({ id_persona, nom, cognoms, nom_complet, veu, abreviatura_veu }) => ({
                id: id_persona,
                title: nom_complet,
                description: veu,
                avatar: (
                  <SmallBadge
                    count={abreviatura_veu}
                    style={{
                      backgroundColor: '#fff',
                      color: '#999',
                      boxShadow: '0 0 0 1px #d9d9d9 inset',
                    }}
                  >
                    <Avatar shape="circle">{nom[0]}{cognoms[0]}</Avatar>
                  </SmallBadge>
                ),
              }),
            )}
            style={{ marginTop: '3rem' }}
          />
        </Col>
      </Row>
    </>
  );
}
