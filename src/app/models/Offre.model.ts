export class Offre {
    id: string;
    titre: string;
    sousTitre: string;
    description: string;
    date: Date;
   
    anneesExperience: number;
    entreprise: string;
    ville: string;
    typeContrat: string;
    constructor(
      id?: string,
      titre?: string,
      sousTitre?: string,
      description?: string,
      date?: Date,
      anneesExperience?: number,
      entreprise?: string,
      ville?: string,
      typeContrat?: string
    ) {
      this.id = id;
      this.titre = titre;
      this.sousTitre = sousTitre;
      this.description = description;
      this.date = date;
      this.anneesExperience = anneesExperience;
      this.entreprise = entreprise;
      this.ville = ville;
      this.typeContrat = typeContrat;
    }
  
  }
  