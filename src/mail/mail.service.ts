import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailService {
    constructor() {
        const apiKey = process.env.SENDGRID_API_KEY;
        if(!apiKey) throw new Error("No SENDGRID_API_KEY is set");

        SendGrid.setApiKey(apiKey);
    }

    async send(data: SendGrid.MailDataRequired) {
        return SendGrid.send(data);
    }
}
