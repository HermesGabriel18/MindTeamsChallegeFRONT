import { Role } from './roles.interface';

export interface User {
  id: number;
  class_name: string;
  role_id: number;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  email_verified_at: string;
  locale: string;
  disabled: string;
  role?: Role;
}
