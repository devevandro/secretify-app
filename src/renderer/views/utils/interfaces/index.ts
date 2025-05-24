export interface Item {
  id: string;
  type: string;
  plaintext: {
    description: string;
    name: string;
    password?: string;
    url: string;
  };
  lastAccess: string;
}
