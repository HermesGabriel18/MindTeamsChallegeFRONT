import { Privileges } from '@auth/models';

export const superAdminPrivileges = [
  String(Privileges.DASHBOARD),
  String(Privileges.USERS),
  String(Privileges.CLIENTS),
];

export const adminPrivileges = [
  String(Privileges.DASHBOARD),
  String(Privileges.USERS),
  String(Privileges.CLIENTS),
];

export const regularPrivileges = [String(Privileges.DASHBOARD)];
