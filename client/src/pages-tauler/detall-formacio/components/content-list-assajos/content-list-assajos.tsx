import { Assaig, Formacio } from "model";
import moment from "moment";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FixedTagsProjectes } from "../../../../components/fixed-tags-projectes";
import { IconsFormacions } from "../../../../components/icons-formacions";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import {
  ContentList,
  ContentListBaseProps,
} from "../../../../standalone/content-list";
import { linkText } from "../../../../utils";
import { FormacioContext } from "../../detall-formacio";

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
            ) && moment().isSameOrBefore(moment(assaig.data_inici))
        )
        .map((assaig) => {
          const date = moment(assaig.data_inici);
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
                ? [<IconsFormacions formacions={filteredFormacions} />]
                : []),
              ...(assaig.projectes && assaig.projectes.length > 0
                ? [<FixedTagsProjectes projectes={assaig.projectes} />]
                : []),
            ],
            avatar: <CalendarAvatar moment={date} />,
          };
        })}
    />
  );
};

export default ContentListAssajos;
