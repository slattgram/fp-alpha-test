interface TClient {
  id: number;
  name: string;
  username: string;
  website: string;
  email: string;
  phone: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };

  creation_date?: Date;
}

interface TPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type { TClient, TPost };
