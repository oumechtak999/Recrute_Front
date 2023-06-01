
export class AuditableEntity {
    id : string;
    created: Date;
    createdBy : string;
    lastModified : Date;
    lastModifiedBy: string;
    isDeleted : boolean ;
    other: string;
    constructor(id?:string ,created?: Date,createdBy?: string,lastModified?: Date,lastModifiedBy?: string,isDeleted?: boolean,other?: string) 
    {
      
        this.id =id;
        this.created=created;
        this.createdBy=createdBy;
        this.lastModified=lastModified;
        this.lastModifiedBy=lastModifiedBy;
        this.isDeleted=isDeleted;
        this.other=other;
    }
}
