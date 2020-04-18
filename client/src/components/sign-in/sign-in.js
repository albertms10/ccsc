import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileFetch, logoutUser, signinUserFetch } from "../../redux";
import { Button, Space } from "antd";

export default () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileFetch());
  }, [dispatch]);

  return (
    <Space>
      {currentUser.hasOwnProperty("id")
        ? currentUser.username
        : "Please sign in"}
      <Button
        onClick={() =>
          dispatch(
            signinUserFetch({ username: "albertm", password: "10-03-2020" })
          )
        }
        disabled={!!currentUser.hasOwnProperty("id")}
      >
        Sign in
      </Button>
      <Button
        onClick={() => dispatch(logoutUser())}
        disabled={!currentUser.hasOwnProperty("id")}
      >
        Log out
      </Button>
    </Space>
  );
};
