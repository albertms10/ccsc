import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviments } from "../../../redux/moviments/moviments-actions";

export default () => {
  const dispatch = useDispatch();
  const { moviments, loading } = useSelector(({ moviments }) => moviments);

  useEffect(() => {
    if (!moviments.fetched) dispatch(fetchMoviments());
  }, [moviments.fetched, dispatch]);

  return [moviments, loading];
};
