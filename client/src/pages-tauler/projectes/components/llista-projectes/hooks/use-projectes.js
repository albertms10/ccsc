import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectes } from "../../../../../redux/projectes/projectes-actions";

export default () => {
  const dispatch = useDispatch();
  const { projectes, loading } = useSelector(({ projectes }) => projectes);

  useEffect(() => {
    if (!projectes.fetched) dispatch(fetchProjectes());
  }, [projectes.fetched, dispatch]);

  return [projectes, loading];
};
