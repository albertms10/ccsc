import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const changeFormacioAssaig = (formacio) => {
    setLoading(true);
    return formacio.checked
      ? fetchAPI(
          `/assajos/${id}/formacions`,
          () => setLoading(false),
          dispatch,
          { method: "POST", body: JSON.stringify(formacio) }
        )
      : fetchAPI(
          `/assajos/${id}/formacions/${formacio.id_formacio}`,
          () => setLoading(false),
          dispatch,
          { method: "DELETE" }
        );
  };

  return [loading, changeFormacioAssaig];
};
