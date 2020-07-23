import { BooleanMap } from "common";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (idSoci: number) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const putAvisAcceptacio = <T = BooleanMap>(
    acceptacions: T,
    callback: (accepta: T) => void
  ) => {
    setLoading(true);
    fetchAPI<T>(
      `/socis/${idSoci}/acceptacions`,
      (accepta) => callback(accepta as T),
      dispatch,
      {
        method: "PUT",
        body: JSON.stringify({ acceptacions }),
      }
    ).finally(() => setLoading(false));
  };

  return [putAvisAcceptacio, loading] as const;
};
