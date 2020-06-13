import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (id_formacio) => {
  const dispatch = useDispatch();
  const [esdeveniments, setEsdeveniments] = useState([]);

  useEffect(() => {
    fetchAPI(
      `/api/formacions/${id_formacio}/esdeveniments`,
      setEsdeveniments,
      dispatch
    );
  }, [id_formacio, dispatch]);

  return [esdeveniments];
};
