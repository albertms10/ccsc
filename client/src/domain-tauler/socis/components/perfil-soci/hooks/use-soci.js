import { useEffect, useState } from "react";
import { fetchAPI } from "../../../../../helpers";
import { useDispatch } from "react-redux";

export default (id) => {
  const dispatch = useDispatch();
  const [soci, setSoci] = useState({});

  useEffect(() => {
    fetchAPI(`/api/socis/${id}`, (data) => setSoci(data[0]), dispatch);
  }, [id, dispatch]);

  return [soci];
};
