
export class Email {
    toEmail: string;
    subject : string;
    body : string;
  path: string;


    constructor(
        toEmail?: string,
        subject?: string,
        body?: string,
        path?: string
    ) {
      this.toEmail = toEmail;
      this.subject = subject;
      this.body = body;
      this.path = path;

    }

  }
