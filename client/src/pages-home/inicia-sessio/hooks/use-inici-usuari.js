import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getProfileFetch } from "../../../redux";

export default () => {
  const [fetched, setFetched] = useState(false);
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProfileFetch()).finally(() => setFetched(true));
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.hasOwnProperty("id")) {
      if (currentUser.avisos.length > 0) {
        history.push("/inicia-sessio/avisos");
      } else {
        let prevLocation;
        if (location.state) prevLocation = location.state.prevLocation;
        history.push(prevLocation ? prevLocation.pathname : "/tauler");
      }
    }
  }, [currentUser, history, location.state]);

  return [fetched, dispatch];
};
