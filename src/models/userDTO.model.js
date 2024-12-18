export class UserDTO {
  constructor(username, email, role, ruc, socialReason) {
    this.username = username;
    this.email = email;
    this.role = role;
    this.ruc = ruc;
    this.socialReason = socialReason
  }
}