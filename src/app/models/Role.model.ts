export class Role {
  id: string;
  description: string;
  serviceId: string;
  elementId: string;

  constructor(
    id?: string,
    description?: string,
    serviceId?: string,
    elementId?: string,
  ) {
    this.id = id;
    this.description = description;
    this.serviceId = serviceId;
    this.elementId = elementId;
  }

}
