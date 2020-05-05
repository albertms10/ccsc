import { useEffect, useState } from "react";
import { fetchAPI } from "../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetchAPI("/api/assajos/historial", setHistorial, dispatch);
  }, [dispatch]);

  return [historial];
};
