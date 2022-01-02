export interface Role {
  id: number;
  class_name: string;
  name: string;
  label: string;
}

export enum RoleId {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  REGULAR = 3,
}

export enum Privileges {
  USERS = 1,
}
