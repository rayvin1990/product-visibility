declare module "nodemailer" {
  type SendMailOptions = {
    to: string;
    from: string;
    replyTo?: string;
    subject: string;
    text: string;
  };

  type TransportOptions = {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };

  type Transporter = {
    sendMail(options: SendMailOptions): Promise<unknown>;
  };

  export function createTransport(options: TransportOptions): Transporter;
}
