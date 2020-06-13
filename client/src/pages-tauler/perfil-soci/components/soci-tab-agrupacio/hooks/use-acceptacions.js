import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (soci) => {
  const dispatch = useDispatch();
  const [acceptacions, setAcceptacions] = useState({});

  useEffect(() => {
    fetchAPI(
      `/api/socis/${soci.id_soci}/acceptacions`,
      setAcceptacions,
      dispatch
    );
  }, [soci.id_soci, dispatch]);

  return [acceptacions];
};
