import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchObres } from "../../../../../store/obres/thunks";

export default () => {
  const dispatch = useDispatch();
  const { obres, loading } = useSelector(({ obres }) => obres);

  useEffect(() => {
    if (!obres.fetched) dispatch(fetchObres());
  }, [obres.fetched, dispatch]);

  return [obres, loading];
};
