import { useEffect, useState } from "react";

/**
 * @param {number} idAvis
 * @returns {[Object, boolean]}
 */
export default (idAvis) => {
  const [textAvisAcceptacio, setTextAvisAcceptacio] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/associacio/avisos/${idAvis}`)
      .then((res) => res.json())
      .then((data) => {
        setTextAvisAcceptacio(data);
        setLoading(false);
      });
  }, [idAvis]);

  return [textAvisAcceptacio, loading];
};
