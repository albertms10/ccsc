import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchObres } from "../../../../../store/obres/thunks";
import { RootState } from "../../../../../store/types";

export default () => {
  const dispatch = useDispatch();

  const { obres, loading, fetched } = useSelector(
    ({ obres }: RootState) => obres
  );

  useEffect(() => {
    if (!fetched) dispatch(fetchObres());
  }, [fetched, dispatch]);

  return [obres, loading] as const;
};
