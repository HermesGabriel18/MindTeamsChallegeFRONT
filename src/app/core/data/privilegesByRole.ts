import { Privileges } from '@auth/models';

export const superAdminPrivileges = [
  String(Privileges.DASHBOARD),
  String(Privileges.USERS),
];

export const adminPrivileges = [
  String(Privileges.DASHBOARD),
  String(Privileges.USERS),
];

export const regularPrivileges = [String(Privileges.DASHBOARD)];
