export enum AuthEndpoints {
  login = '/login',
  logout = '/logout',
  passwordForgot = '/password/forgot',
  passwordReset = '/password/reset',
}

export enum ClientsEndpoints {
  clients = '/clients',
  clientsWithId = '/clients/:id',
}

export enum DisabledEndpoints {
  user = '/disable/user/:id',
  client = '/disable/client/:id',
}

export enum RolesEndpoints {
  roles = '/roles',
}

export enum UsersEndpoints {
  users = '/users',
  usersWithId = '/users/:id',
  profile = '/users/me',
}
