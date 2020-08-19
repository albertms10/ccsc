import { FragmentMovimentEsdevenimentMusical, Moviment } from "model";
import { useMemo } from "react";
import { useAPI } from "../../../../../helpers";

export default (moviment: Moviment) => {
  const [totsFragments, loadingTotsFragments] = useAPI<
    FragmentMovimentEsdevenimentMusical[]
  >(`/moviments/${moviment.id_moviment}/fragments`, []);

  const compassos = useMemo(() => {
    let high = 0;

    return new Array<number>(moviment.compassos)
      .fill(0)
      .map((valor, index) => {
        let count = 0;

        totsFragments.forEach((fragment) => {
          if (
            index >= fragment.compas_inici &&
            (fragment.compas_final ? index <= fragment.compas_final : true)
          )
            count++;
        });

        if (count > high) high = count;

        return valor + count;
      })
      .map((valor) => (high > 0 ? valor / high : 0));
  }, [moviment.compassos, totsFragments]);

  return [compassos, loadingTotsFragments] as const;
};
