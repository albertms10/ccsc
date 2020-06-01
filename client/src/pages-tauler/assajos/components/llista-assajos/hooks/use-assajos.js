import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssajos } from "../../../../../redux/assajos/assajos-actions";

export default () => {
  const dispatch = useDispatch();
  const { assajos, loading } = useSelector(({ assajos }) => assajos);

  useEffect(() => {
    if (!assajos.fetched) dispatch(fetchAssajos());
  }, [assajos.fetched, dispatch]);

  return [assajos, loading];
}