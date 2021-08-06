import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailService {
    constructor() {
        SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async send(data: SendGrid.MailDataRequired) {
        return SendGrid.send(data);
    }
}
