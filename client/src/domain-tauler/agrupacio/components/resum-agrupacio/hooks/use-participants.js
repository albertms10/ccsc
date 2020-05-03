import { useEffect, useState } from "react";
import { fetchAPI } from "../../../../../helpers";
import { useDispatch } from "react-redux";

export default (id_agrupacio) => {
  const dispatch = useDispatch();
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);

  useEffect(() => {
    setLoadingParticipants(true);

    fetchAPI(
      `/api/agrupacions/${id_agrupacio}/participants`,
      (data) => {
        setParticipants(data);
        setLoadingParticipants(false);
      },
      dispatch
    );
  }, [id_agrupacio, dispatch]);

  return [participants, loadingParticipants];
};
