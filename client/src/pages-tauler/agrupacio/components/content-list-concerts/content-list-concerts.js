import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { ContentList } from "../../../../standalone/content-list";
import { FixedTag } from "../../../../standalone/fixed-tag";

const ContentListConcerts = ({ concerts, loading }) => (
  <ContentList
    title="Concerts"
    loading={loading}
    dataSource={concerts.map((concert) => {
      const date = moment(concert.data_inici);

      return {
        id: concert.id_concert,
        title: concert.titol_concert,
        description: `a les ${date.format("LT")}`,
        link: `/projectes/${concert.id_projecte}/concerts/${concert.id_concert}`,
        extra: concert.titol_projecte ? (
          <FixedTag
            tooltip={`Projecte «${concert.titol_projecte}»`}
            color={"#" + concert.color_projecte}
          >
            {concert.inicials_projecte}
          </FixedTag>
        ) : null,
        avatar: <CalendarAvatar moment={date} />,
      };
    })}
    style={{ marginTop: 32 }}
  />
);

ContentListConcerts.propTypes = {
  concerts: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

ContentListConcerts.defaultProps = {
  loading: false,
};

export default ContentListConcerts;
