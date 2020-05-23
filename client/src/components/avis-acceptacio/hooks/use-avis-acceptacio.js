import { useEffect, useState } from "react";

export default (idAvis) => {
  const [textAvisAcceptacio, setTextAvisAcceptacio] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/associacio/avisos/${idAvis}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTextAvisAcceptacio(data);
        setLoading(false);
      });
  }, [idAvis]);

  return [textAvisAcceptacio, loading];
};
