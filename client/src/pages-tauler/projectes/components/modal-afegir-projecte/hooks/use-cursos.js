import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    fetchAPI(
      "/api/agrupacio/cursos",
      (cursos) => {
        setCursos(cursos);
        setLoading(false);
      },
      dispatch
    );
  }, [dispatch]);

  return [cursos, loading];
};
