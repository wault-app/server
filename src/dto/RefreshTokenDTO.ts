import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDTO {
    @ApiProperty({
        description: "A refresh token, that the user recieved when authenticated. Also can be extracted from cookies.",
    })
    public refreshToken?: string;
}