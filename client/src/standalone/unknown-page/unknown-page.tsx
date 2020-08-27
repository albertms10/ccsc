import { Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./unknown-page.css";

const UnknownPage: React.FC = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="unknown-page-container">
      <Typography.Title level={2}>{t("unknown page")}</Typography.Title>
      <Link to="/">{t("go back home")}</Link>
    </div>
  );
};

export default UnknownPage;
