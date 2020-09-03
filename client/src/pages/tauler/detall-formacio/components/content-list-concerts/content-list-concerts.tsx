import { Concert } from "model";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CalendarAvatar } from "standalone/calendar-avatar";
import { ContentList, ContentListBaseProps } from "standalone/content-list";
import { FixedTag } from "standalone/fixed-tag";
import { linkText } from "utils";

interface ContentListConcertsProps extends ContentListBaseProps {
  concerts: Concert[];
}

const ContentListConcerts: React.FC<ContentListConcertsProps> = ({
  title,
  concerts,
  loading = false,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <ContentList
      title={title || t("concerts")}
      loading={loading}
      dataSource={concerts.map((concert) => {
        const date = moment(concert.datahora_inici);

        return {
          id: concert.id_concert,
          title: concert.titol_concert,
          description: concert.hora_inici
            ? t("events:at time", { time: date.format("LT") })
            : "",
          link: `/${linkText(t("projects"))}/${concert.id_projecte}/${linkText(
            t("concerts")
          )}/${concert.id_concert}`,
          extra: concert.titol_projecte ? (
            <FixedTag
              tooltip={`${t("project")} «${concert.titol_projecte}»`}
              color={`#${concert.color_projecte}`}
            >
              <Link to={`/${linkText(t("projects"))}/${concert.id_projecte}`}>
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
};

export default ContentListConcerts;
