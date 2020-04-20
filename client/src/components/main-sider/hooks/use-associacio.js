import { useEffect, useState } from "react";

export default () => {
  const [associacio, setAssociacio] = useState("");

  useEffect(() => {
    fetch("/api/associacio")
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) setAssociacio(data[0].nom);
      });
  });

  return associacio;
};
