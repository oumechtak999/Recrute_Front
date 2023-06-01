export class Offre {
    id: string;
    offreId: string;
    candidatId: string;
    adminId: string;
  
    constructor(
      id?: string,
      offreId?: string,
      candidatId?: string,
      adminId?: string,

    ) {
      this.id = id;
      this.offreId = offreId;
      this.candidatId = candidatId;
      this.adminId = adminId;
    
    }
  
  }
  