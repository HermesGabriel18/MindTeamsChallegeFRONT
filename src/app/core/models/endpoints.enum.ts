export enum AssignmentsEndpoints {
  assignments = '/assignments',
  assignmentsWithId = '/assignments/:id',
}

export enum AuthEndpoints {
  login = '/login',
  logout = '/logout',
}

export enum ClientsEndpoints {
  clients = '/clients',
  clientsWithId = '/clients/:id',
}

export enum DisabledEndpoints {
  user = '/disable/user/:id',
  client = '/disable/client/:id',
  project = '/disable/project/:id',
}

export enum ProjectsEndpoints {
  projects = '/projects',
  projectsWithId = '/projects/:id',
}

export enum RolesEndpoints {
  roles = '/roles',
}

export enum TransactionsEndpoints {
  transactions = '/transactions',
  transactionsWithId = '/transactions/:id',
}

export enum UsersEndpoints {
  users = '/users',
  usersWithId = '/users/:id',
  profile = '/users/me',
}
