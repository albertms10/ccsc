import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocis } from "store/socis/thunks";
import { RootState } from "store/types";

export default () => {
  const dispatch = useDispatch();
  const { socis, loading, fetched } = useSelector(
    ({ socis }: RootState) => socis
  );

  useEffect(() => {
    if (!fetched) dispatch(fetchSocis());
  }, [fetched, dispatch]);

  return [socis, loading] as const;
};
