import { Candidat } from "./Candidat.model";

export class OffreCandidat {
    id: string;
    offreId: string;
    candidatId: string;
    adminId: string;
    candidat:Candidat;
  
    constructor(
      id?: string,
      offreId?: string,
      candidatId?: string,
      adminId?: string,
      candidat?: Candidat,
    ) {
      this.id = id;
      this.offreId = offreId;
      this.candidatId = candidatId;
      this.adminId = adminId;
      this.candidat = candidat;
    }
  
  }
  