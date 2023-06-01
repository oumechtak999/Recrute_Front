export class Element {
  id: string;
  nom : string;
  description : string;
  titre: string;
  date : Date;
  path : string;
  pereId : string;
  peres : Element[];
  type : string;
  img : string;
  createurId : string;
  isDeleted : boolean;

  constructor(
    id?: string,
    nom?: string,
    description?: string,
    titre?: string,
    date?: Date,
    path?: string,
    pereId?: string,
    peres?: Element[],
    type?: string,
    img?: string,
    createurId?: string,
    isDeleted? : boolean
  ) {
    this.id = id;
    this.nom = nom;
    this.titre = titre;
    this.description = description;
    this.date = date;
    this.path = path;
    this.pereId = pereId;
    this.peres = peres;
    this.type = type;
    this.img = img;
    this.createurId = createurId;
    this.isDeleted = isDeleted;
  }

}
