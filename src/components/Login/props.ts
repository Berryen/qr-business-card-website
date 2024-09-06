export type LoginInfo = {
  id: number;
  attributes: {
    username: string;
    email: string;
    password: string;
    confirmed: boolean;
    blocked: boolean;
    role: string;
  };
};
