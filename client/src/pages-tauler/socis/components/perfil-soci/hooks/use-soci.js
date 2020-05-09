import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [soci, setSoci] = useState({});

  useEffect(() => {
    fetchAPI(`/api/socis/${id}`, setSoci, dispatch);
  }, [id, dispatch]);

  return [soci];
};
