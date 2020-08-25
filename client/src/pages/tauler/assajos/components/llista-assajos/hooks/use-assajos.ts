import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssajos } from "store/assajos/thunks";
import { RootState } from "store/types";

export default () => {
  const dispatch = useDispatch();
  const { assajos, loading, fetched } = useSelector(
    ({ assajos }: RootState) => assajos
  );

  useEffect(() => {
    if (!fetched) dispatch(fetchAssajos());
  }, [fetched, dispatch]);

  return [assajos, loading] as const;
};
