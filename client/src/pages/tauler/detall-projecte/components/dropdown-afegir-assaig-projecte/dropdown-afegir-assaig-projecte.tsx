import { Menu } from "antd";
import { ModalSeleccionarAssaig } from "components/modal-seleccionar-assaig";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { usePostAPI } from "helpers";
import { Projecte } from "model";
import { ModalAfegirAssaig } from "pages/tauler/assajos/components/modal-afegir-assaig";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ActionButton } from "standalone/action-button";
import { fetchAssajos } from "store/assajos/thunks";

dayjs.extend(isBetween);

interface DropdownAfegirAssaigProjecteProps {
  projecte: Projecte;
}

const DropdownAfegirAssaigProjecte: React.FC<DropdownAfegirAssaigProjecteProps> = ({
  projecte,
}) => {
  const { t } = useTranslation("actions");

  const dispatch = useDispatch();

  const [loadingPostAssaig, postAssaig] = usePostAPI<{ id_assaig: number }>(
    `/projectes/${projecte.id_projecte}/assajos`
  );

  return (
    <ActionButton mainAction={t("add rehearsal")}>
      <ModalAfegirAssaig
        button={<Menu.Item>{t("new rehearsal")}</Menu.Item>}
        idProjecte={projecte.id_projecte}
      />
      <ModalSeleccionarAssaig
        button={<Menu.Item>{t("select rehearsal")}</Menu.Item>}
        loading={loadingPostAssaig}
        dataFilter={(assaig) =>
          !assaig.projectes.find(
            (projecteAssaig) =>
              projecteAssaig.id_projecte === projecte.id_projecte
          ) &&
          (projecte.data_inici
            ? dayjs(assaig.datahora_inici).isBetween(
                dayjs(projecte.data_inici),
                dayjs(projecte.data_final)
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
