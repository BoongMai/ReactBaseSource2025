export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  DEMO = 'demo',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
