import { ApiProperty } from "@nestjs/swagger";

export class RSAKeyPairDTO {
    @ApiProperty({
        description: "A non-encrypted version of your public RSA key"
    })
    public: string;

    @ApiProperty({
        description: "An AES-256 encrypted version of your private RSA key"
    })
    private: string;
} 