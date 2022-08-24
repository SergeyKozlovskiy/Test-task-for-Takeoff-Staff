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
  id: number;
  name: { name: string; id: number };
  city: { city: string; id: number };
  street: { street: string; id: number };
  phone: { phone: string; id: number };
  email: { email: string; id: number };
  website: { website: string; id: number };
};
