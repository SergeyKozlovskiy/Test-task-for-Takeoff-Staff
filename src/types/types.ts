export type Contact = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type User = {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
};
export type DataTable = {
  key: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
};
