import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocis } from "../../../redux/socis/socis-actions";

export default () => {
  const dispatch = useDispatch();
  const { socis, loading } = useSelector(({ socis }) => socis);

  useEffect(() => {
    if (!socis.fetched) dispatch(fetchSocis());
  }, [socis.fetched, dispatch]);

  return [socis, loading];
};
