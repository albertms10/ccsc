import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviments } from "store/moviments/thunks";
import { RootState } from "store/types";

export default () => {
  const dispatch = useDispatch();
  const { moviments, loading, fetched } = useSelector(
    ({ moviments }: RootState) => moviments
  );

  useEffect(() => {
    if (!fetched) dispatch(fetchMoviments());
  }, [fetched, dispatch]);

  return [moviments, loading] as const;
};
