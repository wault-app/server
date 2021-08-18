import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty({
        description: "The email address associated with the user"
    })
    public email: string;

    @ApiProperty({
        description: "An encrypted version of the password"
    })
    public password: string;
}