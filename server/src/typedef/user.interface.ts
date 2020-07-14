export default interface User {
  id: number;
  username: string;
  nom: string;
  cognoms: string;
  es_dona: boolean;
  id_persona: number;
  es_actiu: boolean;
  avisos: string | string[];
  roles: string | number[];
  salt?: string;
  encrypted_password?: string;
}
