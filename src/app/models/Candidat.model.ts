export class Candidat {
    id: string;
    nom: string;
    prenom: string;
    telephone: string;
    niveauEtude: string;
    cIN: string;
    email: string;
    dernierEmployeur: string;
    anneesExperience: number;
    constructor(
      id?: string,
      nom?: string,
      telephone?: string,
      prenom?: string,
      niveauEtude?: string,
      cIN?: string,
      email?: string,
      dernierEmployeur?: string,
      anneesExperience?: number
    ) {
      this.id = id;
      this.nom = nom;
      this.telephone = telephone;
      this.prenom = prenom;
      this.niveauEtude = niveauEtude;
      this.cIN = cIN;
      this.email = email;
      this.dernierEmployeur = dernierEmployeur;
      this.anneesExperience = anneesExperience;
    }
  
  }
  