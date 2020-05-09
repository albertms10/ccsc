import { useState } from "react";

export default () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const checkEmail = (email) => {
    setLoading(true);
    fetch("/api/auth/email-espera", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowAlert(!data);
        setLoading(false);
      });
  };

  return [checkEmail, loading, showAlert];
};
