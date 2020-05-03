import { useEffect, useState } from "react";
import { fetchAPI } from "../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [nomAssociacio, setNomAssociacio] = useState("");

  useEffect(() => {
    fetchAPI(
      "/api/associacio",
      (data) => {
        if (data[0]) setNomAssociacio(data[0].nom);
      },
      dispatch
    );
  }, [dispatch]);

  return [nomAssociacio];
};
