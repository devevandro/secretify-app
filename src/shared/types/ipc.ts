export interface Password {
  id: string;
  type: string;
  plaintext: {
    description: string;
    name: string;
    password: string;
    url: string;
  };
  lastAccess: string;
}

export interface FavoritesSites {
  id: string;
  type: string;
  plaintext: {
    description: string;
    name: string;
    url: string;
  };
  lastAccess: string;
}

export interface Favorites {
  id: string;
  type: string;
  plaintext: {
    description: string;
    name: string;
    url: string;
  };
  lastAccess: string;
}

export interface FetchAllPasswordsReponse {
  data: Password[];
}

export interface FetchAllFavoritesReponse {
  data: Favorites[];
}

export interface FetchAllFavoritesSitesReponse {
  data: FavoritesSites[];
}
