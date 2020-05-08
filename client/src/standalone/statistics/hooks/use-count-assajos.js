import { useEffect, useState } from "react";
import { fetchAPI } from "../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [countAssajos, setCountAssajos] = useState(0);

  useEffect(() => {
    fetchAPI("/api/assajos/count", setCountAssajos, dispatch);
  }, [dispatch]);

  return [countAssajos];
};
