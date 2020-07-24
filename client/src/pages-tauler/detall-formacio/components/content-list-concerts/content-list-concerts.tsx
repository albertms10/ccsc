import { Concert } from "model";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { ContentList } from "../../../../standalone/content-list";
import { ContentListBaseProps } from "../../../../standalone/content-list/content-list";
import { FixedTag } from "../../../../standalone/fixed-tag";

interface ContentListConcertsProps extends ContentListBaseProps {
  concerts: Concert[];
}

const ContentListConcerts: React.FC<ContentListConcertsProps> = ({
  title = "Concerts",
  concerts,
  loading = false,
}) => (
  <ContentList
    title={title}
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
            <Link to={`/projectes/${concert.id_projecte}`}>
              {concert.inicials_projecte}
            </Link>
          </FixedTag>
        ) : undefined,
        avatar: <CalendarAvatar moment={date} />,
      };
    })}
    style={{ marginTop: 32 }}
  />
);

export default ContentListConcerts;
