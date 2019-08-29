export class UserPermission {
  username: string;
  requiredPermissionType: string;

  constructor(username: string, requiredPermissionType: string) {
    this.username = username;
    this.requiredPermissionType = requiredPermissionType;
  }

  get user(): string {
    return this.username;
  }

  set user(value: string) {
    this.username = value;
  }

  get requiredPermission(): string {
    return this.requiredPermissionType;
  }

  set requiredPermission(value: string) {
    this.requiredPermissionType = value;
  }
}
