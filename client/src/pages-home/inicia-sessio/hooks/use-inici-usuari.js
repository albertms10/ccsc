import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getProfileFetch } from "../../../redux";

export default () => {
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    dispatch(getProfileFetch()).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.hasOwnProperty("id")) {
      if (currentUser.accepta_proteccio_dades) {
        let prevLocation;
        if (location.state) prevLocation = location.state.prevLocation;

        history.push(prevLocation ? prevLocation.pathname : "/tauler");
      } else {
        history.push("/inicia-sessio/proteccio-dades");
      }
    }
  });

  return [loading, dispatch];
};
