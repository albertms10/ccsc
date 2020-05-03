import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getProfileFetch } from "../../../redux";

export default () => {
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    dispatch(getProfileFetch()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.hasOwnProperty("id")) {
      const prevLocation = location.state.prevLocation;
      history.push(prevLocation ? prevLocation.pathname : "/tauler");
    }
  });

  return [loading, dispatch];
};
