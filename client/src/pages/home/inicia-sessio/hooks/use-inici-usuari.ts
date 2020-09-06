import { Usuari } from "model";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { RootState } from "store/types";
import { getProfileFetch } from "store/user/thunks";
import { linkText } from "utils";

interface IniciUsuariHistory {
  prevLocation: {
    pathname: string;
  };
}

export default () => {
  const { t } = useTranslation("sign-in");

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
        history.push(`/${linkText(t("sign in"))}/${linkText(t("notices"))}`);
      } else {
        let prevLocation;
        if (location.state) prevLocation = location.state.prevLocation;
        history.push(
          prevLocation?.pathname ?? `/${linkText(t("dashboard:dashboard"))}`
        );
      }
    }
  }, [currentUser, history, location.state, t]);

  return [fetched] as const;
};
