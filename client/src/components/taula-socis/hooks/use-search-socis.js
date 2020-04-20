import { useEffect, useState } from "react";

export default (socis) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredSocis, setFilteredSocis] = useState(socis);

  useEffect(() => {
    const filteredSocis = socis.filter((soci) => {
      return (
        soci.nom_complet.toLowerCase().includes(searchValue) ||
        soci.username.includes(searchValue) ||
        soci.email.includes(searchValue) ||
        (soci.telefon ? soci.telefon.includes(searchValue) : "")
      );
    });
    setFilteredSocis(filteredSocis);
  }, [searchValue, socis]);

  return [searchValue, setSearchValue, filteredSocis];
};
