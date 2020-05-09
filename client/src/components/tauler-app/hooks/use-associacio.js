import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [associacio, setAssociacio] = useState("");

  useEffect(() => {
    fetchAPI("/api/associacio", setAssociacio, dispatch);
  }, [dispatch]);

  return [associacio];
};
