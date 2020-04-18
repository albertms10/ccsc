import React from "react";
import { Button, Space } from "antd";
import { logoutUserClean, signinUserFetch } from "../../redux";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  console.log("Current user", currentUser);

  return (
    <Space>
      <Button
        onClick={() =>
          dispatch(
            signinUserFetch({ username: "albertm", password: "10-03-2020" })
          )
        }
      >
        Sign in
      </Button>
      <Button onClick={() => dispatch(logoutUserClean())}>Log out</Button>
    </Space>
  );
};
