import PropTypes from "prop-types";
import React, { useContext, useMemo } from "react";
import { FixedTagsProjectes } from "../../../../components/fixed-tags-projectes";
import { PopoverList } from "../../../../components/popover-list";
import { useAPI } from "../../../../helpers";
import { searchFilterProjecte } from "../../../../helpers/search-filters";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { AssaigContext } from "../../detall-assaig";
import { useProjecteAssaig } from "./hooks";

const PopoverProjectesAssaig = ({ getMovimentsAssaig }) => {
  const { id_assaig } = useContext(AssaigContext);

  const [projectes, loadingProjectes, getProjectes] = useAPI(
    `/api/assajos/${id_assaig}/projectes`
  );
  const [loadingProjecte, changeProjecteAssaig] = useProjecteAssaig(id_assaig);

  const projectesElement = useMemo(
    () => (
      <>
        <span style={{ marginRight: 8 }}>Projectes:</span>
        <FixedTagsProjectes
          projectes={
            projectes && projectes.filter((projecte) => projecte.convocada)
          }
        />
      </>
    ),
    [projectes]
  );

  return (
    <PopoverList
      title="Projectes"
      searchPlaceholder="Cerca projectes"
      defaultValue={projectes
        .filter((projecte) => projecte.convocada)
        .map((projecte) => projecte.id_projecte)}
      dataSource={projectes.map((projecte) => ({
        ...projecte,
        value: projecte.id_projecte,
        label: projecte.titol,
      }))}
      searchFilters={searchFilterProjecte}
      loading={loadingProjectes || loadingProjecte}
      onChange={({ target }) => {
        changeProjecteAssaig({
          id_projecte: target.value,
          checked: target.checked,
        }).then(() => {
          getMovimentsAssaig();
          getProjectes();
        });
      }}
      action={
        <BorderlessButton style={{ paddingRight: 0 }}>
          {projectesElement}
        </BorderlessButton>
      }
      elseElement={projectesElement}
      needsAuthorization
    />
  );
};

PopoverProjectesAssaig.propTypes = {
  getMovimentsAssaig: PropTypes.func,
};

export default PopoverProjectesAssaig;
