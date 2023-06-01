export class Admin {
    id: string;
    nom: string;
    prenom: string;
    passwordHash: string;
    username: string;
    cin: string;
    email: string;
    constructor(
      id?: string,
      nom?: string,
      passwordHash?: string,
      prenom?: string,
      username?: string,
      cin?: string,
      email?: string
    ) {
      this.id = id;
      this.nom = nom;
      this.passwordHash = passwordHash;
      this.prenom = prenom;
      this.username = username;
      this.cin = cin;
      this.email = email;
      
    }
  
  }
  