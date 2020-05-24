import { useEffect, useState } from "react";

export default (socis) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredSocis, setFilteredSocis] = useState(socis);

  useEffect(() => {
    const filteredSocis = socis.filter(
      ({ email, nom_complet, telefon, username }) =>
        (nom_complet && nom_complet.toLowerCase().includes(searchValue)) ||
        (username && username.includes(searchValue)) ||
        (email && email.includes(searchValue)) ||
        (telefon && telefon.toString().includes(searchValue))
    );
    setFilteredSocis(filteredSocis);
  }, [searchValue, socis]);

  return [searchValue, setSearchValue, filteredSocis];
};
