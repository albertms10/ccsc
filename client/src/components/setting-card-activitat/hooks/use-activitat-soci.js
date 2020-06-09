import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (soci) => {
  const dispatch = useDispatch();
  const [activitat, setActivitat] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchActivitat = () => {
    setLoading(true);
    fetchAPI(
      `/api/socis/${soci.id_soci}/activitat`,
      (activitat) => {
        setActivitat(activitat);
        setLoading(false);
        console.log(activitat);
      },
      dispatch
    );
  };

  useEffect(fetchActivitat, [soci.id_soci, dispatch]);

  return [activitat, loading, fetchActivitat];
};
