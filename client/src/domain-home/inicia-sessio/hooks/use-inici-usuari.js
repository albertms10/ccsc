import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProfileFetch } from "../../../redux";

export default () => {
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    dispatch(getProfileFetch()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.hasOwnProperty("id"))
      history.push("/tauler");
  });

  return [loading, dispatch];
};
