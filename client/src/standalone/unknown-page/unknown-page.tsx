import { Breadcrumb, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { prettyString, upperCaseFirst } from "utils";
import "./unknown-page.css";

const UnknownPage: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const location = useLocation();

  return (
    <div className="unknown-page-container">
      <Typography.Title level={2}>{t("unknown page")}</Typography.Title>
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

export default UnknownPage;
