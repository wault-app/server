import * as SendGrid from '@sendgrid/mail';
export declare class MailService {
    constructor();
    send(data: SendGrid.MailDataRequired): Promise<[SendGrid.ClientResponse, {}]>;
}
