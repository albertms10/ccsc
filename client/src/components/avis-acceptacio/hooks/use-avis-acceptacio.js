import { useEffect, useState } from "react";

export default (nameAvis) => {
  const [textAvisAcceptacio, setTextAvisAcceptacio] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/associacio/avisos/${nameAvis}`)
      .then((res) => res.json())
      .then((data) => {
        setTextAvisAcceptacio(data);
        setLoading(false);
      });
  }, [nameAvis]);

  return [textAvisAcceptacio, loading];
};
