export class User {
  id: string;
  nom: string;
  prenom: string;
  passwordHash: string;
  username: string;
  cin: string;
  userType: string;
  phoneNumber: string;
  email: string;
  emailConfirmed: boolean;

  constructor(
    id?: string,
    nom?: string,
    passwordHash?: string,
    prenom?: string,
    username?: string,
    cin?: string,
    userType?: string,
    phoneNumber?: string,
    email?: string,
    emailConfirmed?: boolean
  ) {
    this.id = id;
    this.nom = nom;
    this.passwordHash = passwordHash;
    this.prenom = prenom;
    this.username = username;
    this.cin = cin;
    this.userType = userType;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.emailConfirmed=emailConfirmed;
  }

}
