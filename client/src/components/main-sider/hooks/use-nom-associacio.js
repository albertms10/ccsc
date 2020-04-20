import { useEffect, useState } from "react";

export default () => {
  const [nomAssociacio, setNomAssociacio] = useState("");

  useEffect(() => {
    fetch("/api/associacio")
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) setNomAssociacio(data[0].nom);
      });
  });

  return [nomAssociacio];
};
