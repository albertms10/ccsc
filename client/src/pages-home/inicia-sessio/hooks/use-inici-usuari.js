import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getProfileFetch } from "../../../redux";

export default () => {
  const [fetching, setFetching] = useState(false);
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setFetching(true);
    dispatch(getProfileFetch()).finally(() => setFetching(false));
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

  return [fetching, dispatch];
};
