import moment from "moment";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { FixedTagsProjectes } from "../../../../components/fixed-tags-projectes";
import { IconsFormacions } from "../../../../components/icons-formacions";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { ContentList } from "../../../../standalone/content-list";
import { FormacioContext } from "../../formacio";

const ContentListAssajos = ({ assajos, loading = false }) => {
  const { id_formacio } = useContext(FormacioContext);

  return (
    <ContentList
      title="Assajos"
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
            description: assaig.hora_inici ? `a les ${date.format("LT")}` : "",
            link: `/assajos/${assaig.id_assaig}`,
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

ContentListAssajos.propTypes = {
  assajos: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default ContentListAssajos;
