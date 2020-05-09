import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [countAssajos, setCountAssajos] = useState(0);

  useEffect(() => {
    fetchAPI("/api/assajos/count", setCountAssajos, dispatch);
  }, [dispatch]);

  return [countAssajos];
};
