export class UserRole {
  id: string;
  userId: string;
  roleId: string;
  constructor(
    id?: string,
    userId?: string,
    roleId?: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.roleId = roleId;
  }

}
