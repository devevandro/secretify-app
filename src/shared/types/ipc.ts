export interface Password {
  type: string;
  name: string;
  url: string;
  plaintext: string;
  password: string;
  lastAccess: string;
}

export interface FetchAllPasswordsReponse {
  data: Password[];
}
