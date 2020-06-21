import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviments } from "../../../redux/moviments/moviments-actions";

export default () => {
  const dispatch = useDispatch();
  const { obres, loading } = useSelector(({ obres }) => obres);

  useEffect(() => {
    if (!obres.fetched) dispatch(fetchMoviments());
  }, [obres.fetched, dispatch]);

  return [obres, loading];
};
