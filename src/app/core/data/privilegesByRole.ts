import { Privileges } from '@auth/models';

export const superAdminPrivileges = [String(Privileges.USERS)];

export const adminPrivileges = [String(Privileges.USERS)];

export const regularPrivileges = [];
