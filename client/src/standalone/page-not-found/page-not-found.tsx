import { Breadcrumb, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { prettyString, upperCaseFirst } from "utils/strings";
import "./page-not-found.css";

const PageNotFound: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const location = useLocation();

  return (
    <div className="page-not-found-container">
      <Typography.Title level={2}>{t("page not found")}</Typography.Title>
      <Breadcrumb separator="›" style={{ marginBottom: 16 }}>
        {location.pathname.split("/").map((path, index) => (
          <Breadcrumb.Item key={`${path}-${index}`}>
            {upperCaseFirst(prettyString(path))}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Link to="/">{t("go back home")}</Link>
    </div>
  );
};

export default PageNotFound;
