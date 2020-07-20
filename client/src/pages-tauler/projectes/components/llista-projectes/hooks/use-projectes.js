import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectes } from "../../../../../store/projectes/thunks";

export default () => {
  const dispatch = useDispatch();
  const { projectes, loading } = useSelector(({ projectes }) => projectes);

  useEffect(() => {
    if (!projectes.fetched) dispatch(fetchProjectes());
  }, [projectes.fetched, dispatch]);

  return [projectes, loading];
};
