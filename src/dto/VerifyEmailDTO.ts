import { ApiProperty } from "@nestjs/swagger";

export class VerifyEmailDTO {
    @ApiProperty({
        description: "The identifier of the email verification session"
    })
    public id: string;

    @ApiProperty({
        description: "A secret code to verify if the email is really openned by the email"
    })
    public secret: string;
};