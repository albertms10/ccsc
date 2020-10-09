import { FixedTagsProjectes } from "components/fixed-tags-projectes";
import { IconsFormacions } from "components/icons-formacions";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Assaig, Formacio } from "model";
import dayjs from "dayjs";
import { FormacioContext } from "pages/tauler/detall-formacio";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CalendarAvatar } from "standalone/calendar-avatar";
import { ContentList, ContentListBaseProps } from "standalone/content-list";
import { linkText } from "utils/strings";

dayjs.extend(isSameOrBefore);

interface ContentListAssajosProps extends ContentListBaseProps {
  assajos: Assaig[];
}

const ContentListAssajos: React.FC<ContentListAssajosProps> = ({
  title,
  assajos,
  loading = false,
}) => {
  const { t } = useTranslation("dashboard");

  const { id_formacio } = useContext(FormacioContext) as Formacio;

  return (
    <ContentList
      title={title || t("rehearsals")}
      loading={loading}
      dataSource={assajos
        .filter(
          (assaig) =>
            assaig.formacions.find(
              (formacio) => formacio.id_formacio === id_formacio
            ) && dayjs().isSameOrBefore(dayjs(assaig.datahora_inici))
        )
        .map((assaig) => {
          const date = dayjs(assaig.datahora_inici);
          const filteredFormacions = assaig.formacions.filter(
            (formacio) => formacio.id_formacio !== id_formacio
          );

          return {
            id: assaig.id_assaig,
            title: assaig.titol,
            description: assaig.hora_inici
              ? t("events:at time", { time: date.format("LT") })
              : "",
            link: `/${linkText(t("rehearsals"))}/${assaig.id_assaig}`,
            actions: [
              ...(filteredFormacions.length > 0
                ? [
                    <IconsFormacions
                      key="icons-formacions"
                      formacions={filteredFormacions}
                    />,
                  ]
                : []),
              ...(assaig.projectes && assaig.projectes.length > 0
                ? [
                    <FixedTagsProjectes
                      key="fixed-tags-projectes"
                      projectes={assaig.projectes}
                    />,
                  ]
                : []),
            ],
            avatar: <CalendarAvatar dayjs={date} />,
          };
        })}
    />
  );
};

export default ContentListAssajos;
