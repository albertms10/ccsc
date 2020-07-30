import { Usuari } from "model";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { RootState } from "../../../store/types";
import { getProfileFetch } from "../../../store/user/thunks";

interface IniciUsuariHistory {
  prevLocation: {
    pathname: string;
  };
}

export default () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

  const location = useLocation<IniciUsuariHistory>();
  const history = useHistory<IniciUsuariHistory>();

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    dispatch(getProfileFetch());
    setFetched(true);
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.id_usuari) {
      if (currentUser.avisos.length > 0) {
        history.push("/inicia-sessio/avisos");
      } else {
        let prevLocation;
        if (location.state) prevLocation = location.state.prevLocation;
        history.push(prevLocation ? prevLocation.pathname : "/tauler");
      }
    }
  }, [currentUser, history, location.state]);

  return [fetched, dispatch] as const;
};
