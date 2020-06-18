import PropTypes from "prop-types";
import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { PopoverList } from "../../../../components/popover-list";
import { useAPI } from "../../../../helpers";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { FixedTag } from "../../../../standalone/fixed-tag";
import { AssaigContext } from "../../detall-assaig";
import { useProjecteAssaig } from "./hooks";

const PopoverProjectesAssaig = ({ getMovimentsAssaig }) => {
  const { id_assaig } = useContext(AssaigContext);

  const [projectes, loadingProjectes, getProjectes] = useAPI(
    `/api/assajos/${id_assaig}/projectes`
  );
  const [loadingProjecte, changeProjecteAssaig] = useProjecteAssaig(id_assaig);

  const tagsProjectes = useMemo(
    () =>
      projectes &&
      projectes
        .filter((projecte) => projecte.convocada)
        .map((projecte) => (
          <FixedTag
            key={projecte.id_projecte}
            tooltip={projecte.titol}
            color={"#" + projecte.color}
          >
            <Link to={`/projectes/${projecte.id_projecte}`}>
              {projecte.inicials}
            </Link>
          </FixedTag>
        )),
    [projectes]
  );

  return (
    <PopoverList
      title="Projectes convocades"
      searchPlaceholder="Cerca projectes"
      defaultValue={projectes
        .filter((projecte) => projecte.convocada)
        .map((projecte) => projecte.id_projecte)}
      dataSource={projectes.map((projecte) => ({
        ...projecte,
        value: projecte.id_projecte,
        label: projecte.titol,
      }))}
      searchFilters={(projecte) => ({
        texts: [projecte.nom],
      })}
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
      action={<BorderlessButton>{tagsProjectes} Projectes</BorderlessButton>}
      elseElement={
        <div>
          <span style={{ marginRight: 3 }}>Projectes:</span> {tagsProjectes}
        </div>
      }
      needsAuthorization
    />
  );
};

PopoverProjectesAssaig.propTypes = {
  getMovimentsAssaig: PropTypes.func,
};

export default PopoverProjectesAssaig;
