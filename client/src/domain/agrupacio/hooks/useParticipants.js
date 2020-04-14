import { useEffect, useState } from "react";

export default (id_agrupacio) => {
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);

  useEffect(() => {
    setLoadingParticipants(true);

    fetch(`/api/agrupacions/${id_agrupacio}/participants`)
      .then((res) => res.json())
      .then((data) => {
        setParticipants(data);
        setLoadingParticipants(false);
      });
  }, [id_agrupacio]);

  return [participants, loadingParticipants];
};
