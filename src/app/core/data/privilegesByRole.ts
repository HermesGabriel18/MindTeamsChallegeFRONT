import { Privileges } from '@auth/models';

export const superAdminPrivileges = [
  String(Privileges.DASHBOARD),
  String(Privileges.USERS),
  String(Privileges.CLIENTS),
  String(Privileges.PROJECTS),
  String(Privileges.TRANSACTIONS),
];

export const adminPrivileges = [
  String(Privileges.DASHBOARD),
  String(Privileges.USERS),
  String(Privileges.CLIENTS),
  String(Privileges.PROJECTS),
  String(Privileges.TRANSACTIONS),
];

export const regularPrivileges = [String(Privileges.DASHBOARD)];
