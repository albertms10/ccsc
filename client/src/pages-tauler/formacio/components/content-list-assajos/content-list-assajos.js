import moment from "moment";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { ContentList } from "../../../../standalone/content-list";
import { FixedTag } from "../../../../standalone/fixed-tag";
import { FormacioContext } from "../../formacio";

const ContentListAssajos = ({ assajos, loading }) => {
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

          return {
            id: assaig.id_assaig,
            title: assaig.titol,
            description: assaig.hora_inici ? `a les ${date.format("LT")}` : "",
            link: `/assajos/${assaig.id_assaig}`,
            extra: assaig.projectes.map((projecte) => (
              <FixedTag
                key={projecte.id_projecte}
                childKey={projecte.id_projecte}
                tooltip={projecte.titol}
                color={"#" + projecte.color}
              >
                {projecte.inicials}
              </FixedTag>
            )),
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

ContentListAssajos.defaultProps = {
  loading: false,
};

export default ContentListAssajos;
