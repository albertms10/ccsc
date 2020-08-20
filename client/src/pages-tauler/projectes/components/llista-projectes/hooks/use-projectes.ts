import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectes } from "store/projectes/thunks";
import { RootState } from "store/types";

export default () => {
  const dispatch = useDispatch();
  const { projectes, loading, fetched } = useSelector(
    ({ projectes }: RootState) => projectes
  );

  useEffect(() => {
    if (!fetched) dispatch(fetchProjectes());
  }, [fetched, dispatch]);

  return [projectes, loading] as const;
};
