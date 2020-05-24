import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

/**
 * @param {number} idSoci
 * @returns {[Function, boolean]}
 */
export default (idSoci) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const putAvisAcceptacio = (acceptacions, callback) => {
    setLoading(true);
    fetchAPI(
      `/api/socis/${idSoci}/acceptacions`,
      (accepta) => {
        if (typeof callback === "function") callback(accepta);
      },
      dispatch,
      {
        method: "PUT",
        body: JSON.stringify(acceptacions),
      }
    ).finally(() => setLoading(false));
  };

  return [putAvisAcceptacio, loading];
};
