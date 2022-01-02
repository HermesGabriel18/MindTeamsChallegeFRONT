import { Privileges } from '@auth/models';

export const adminPrivileges = [
    String(Privileges.GARAGES),
    String(Privileges.USERS),
    String(Privileges.CLIENTS),
    String(Privileges.CONTACTS),
    String(Privileges.GARAGE_REQUESTS),
    // String(Privileges.LARAVEL_LOGS),
    String(Privileges.AVAILABILITY),
    // String(Privileges.STATISTICS),
    String(Privileges.EVENTS),
    String(Privileges.SETTINGS)
];

export const managerPrivileges = [
    String(Privileges.GARAGES),
    String(Privileges.USERS),
    String(Privileges.CLIENTS),
    String(Privileges.CONTACTS),
    String(Privileges.GARAGE_REQUESTS),
    String(Privileges.AVAILABILITY),
    // String(Privileges.STATISTICS),
    String(Privileges.EVENTS),
    String(Privileges.SETTINGS)
];

export const administrativePrivileges = [
    String(Privileges.GARAGES),
    String(Privileges.USERS),
    String(Privileges.CLIENTS),
    String(Privileges.CONTACTS),
    String(Privileges.GARAGE_REQUESTS),
    String(Privileges.AVAILABILITY),
    // String(Privileges.STATISTICS),
    String(Privileges.EVENTS),
    String(Privileges.SETTINGS)
];

export const clientPrivileges = [
    String(Privileges.GARAGES),
    String(Privileges.USERS),
    String(Privileges.GARAGE_REQUESTS),
    String(Privileges.AVAILABILITY), // has access only to views (is not authorize in API to consume holidays services)
    String(Privileges.EVENTS)
];

export const garagePrivileges = [
    String(Privileges.GARAGES),
    String(Privileges.USERS),
    String(Privileges.GARAGE_REQUESTS),
    String(Privileges.AVAILABILITY), // has access only to views (is not authorize in API to consume holidays services)
    String(Privileges.EVENTS)
];
