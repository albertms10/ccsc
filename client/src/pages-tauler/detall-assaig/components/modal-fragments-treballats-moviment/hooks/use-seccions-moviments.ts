import { Moviment, SeccioMoviment } from "model";
import { useMemo } from "react";
import { useAPI } from "../../../../../helpers";
import { gcd } from "../../../../../utils";

export default (moviment: Moviment) => {
  const [seccionsMoviment, loadingSeccionsMoviment] = useAPI<SeccioMoviment[]>(
    `/moviments/${moviment.id_moviment}/seccions`,
    []
  );

  const seccions = useMemo(() => {
    if (seccionsMoviment.length === 0) return [];

    const primeraSeccio = seccionsMoviment[0];
    const darreraSeccio = seccionsMoviment[seccionsMoviment.length - 1];

    const fullSeccions: SeccioMoviment[] = [
      ...(primeraSeccio.compas_inici > 1
        ? [
            {
              id_seccio_moviment: 0,
              titol: "",
              compas_inici: 1,
              compas_final: seccionsMoviment[1].compas_final,
            },
          ]
        : []),
      ...seccionsMoviment,
      ...(darreraSeccio.compas_final &&
      darreraSeccio.compas_final < moviment.compassos
        ? [
            {
              id_seccio_moviment: darreraSeccio.id_seccio_moviment + 1,
              titol: "",
              compas_inici: darreraSeccio.compas_final,
              compas_final: moviment.compassos,
            },
          ]
        : []),
    ];

    const seccionsCompassos = fullSeccions.map((seccio) => ({
      name: seccio.titol,
      compassos:
        (seccio.compas_final || moviment.compassos) - seccio.compas_inici,
    }));

    const gcdSeccions =
      gcd(...seccionsCompassos.map((seccio) => seccio.compassos)) || 1;

    return seccionsCompassos.map((seccio) => ({
      name: seccio.name,
      weight: seccio.compassos / gcdSeccions,
    }));
  }, [moviment.compassos, seccionsMoviment]);

  return [seccions, loadingSeccionsMoviment] as const;
};
