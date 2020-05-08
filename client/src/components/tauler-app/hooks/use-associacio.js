import { useEffect, useState } from "react";
import { fetchAPI } from "../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [associacio, setAssociacio] = useState("");

  useEffect(() => {
    fetchAPI("/api/associacio", setAssociacio, dispatch);
  }, [dispatch]);

  return [associacio];
};
