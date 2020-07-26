import { Menu } from "antd";
import { Projecte } from "model";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { ModalSeleccionarAssaig } from "../../../../components/modal-seleccionar-assaig";
import { usePostAPI } from "../../../../helpers";
import { ActionButton } from "../../../../standalone/action-button";
import { fetchAssajos } from "../../../../store/assajos/thunks";
import { ModalAfegirAssaig } from "../../../assajos/components/modal-afegir-assaig";

interface DropdownAfegirAssaigProjecteProps {
  projecte: Projecte;
}

const DropdownAfegirAssaigProjecte: React.FC<DropdownAfegirAssaigProjecteProps> = ({
  projecte,
}) => {
  const dispatch = useDispatch();

  const [loadingPostAssaig, postAssaig] = usePostAPI<{ id_assaig: number }>(
    `/projectes/${projecte.id_projecte}/assajos`
  );

  return (
    <ActionButton mainAction="Afegir assaig">
      <ModalAfegirAssaig
        button={<Menu.Item>Nou assaig</Menu.Item>}
        idProjecte={projecte.id_projecte}
      />
      <ModalSeleccionarAssaig
        button={<Menu.Item>Selecciona assaig</Menu.Item>}
        loading={loadingPostAssaig}
        dataFilter={(assaig) =>
          !assaig.projectes.find(
            (projecteAssaig) =>
              projecteAssaig.id_projecte === projecte.id_projecte
          ) &&
          (projecte.data_inici
            ? moment(assaig.data_inici).isBetween(
                moment(projecte.data_inici),
                moment(projecte.data_final)
              )
            : true)
        }
        onItemClick={({ id_assaig }) => postAssaig({ id_assaig })}
        thenAction={() => dispatch(fetchAssajos())}
      />
    </ActionButton>
  );
};

export default DropdownAfegirAssaigProjecte;
