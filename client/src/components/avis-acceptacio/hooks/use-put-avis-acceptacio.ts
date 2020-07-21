import { BooleanMap } from "common";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (idSoci: number) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const putAvisAcceptacio = (acceptacions: BooleanMap, callback: Function) => {
    setLoading(true);
    fetchAPI(
      `/socis/${idSoci}/acceptacions`,
      (accepta: BooleanMap) => {
        if (typeof callback === "function") callback(accepta);
      },
      dispatch,
      {
        method: "PUT",
        body: JSON.stringify({ acceptacions }),
      }
    ).finally(() => setLoading(false));
  };

  return [putAvisAcceptacio, loading] as const;
};
