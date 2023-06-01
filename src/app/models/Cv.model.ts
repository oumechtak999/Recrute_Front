export class Cv {
    id: string;
    path: string;
    titre: string;
    candidatId: string;
    
    constructor(
      id?: string,
      path?: string,
      titre?: string,
      candidatId?: string
    ) {
      this.id = id;
      this.path = path;
      this.titre = titre;
      this.candidatId = candidatId;      
    }
  
  }
  