import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetchAPI("/api/assajos/historial", setHistorial, dispatch);
  }, [dispatch]);

  return [historial];
};
