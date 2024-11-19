export default interface User {
    id: number;
    name: {
      title: string;
      first: string;
      last: string;
    };
    dob: {
      age: number;
    }
    gender: string;
    username: string;
    email: string;
    phone: string;
    picture: {
      large: string;
    };
    location: {
      city: string;
      country: string;
    }
  }
  