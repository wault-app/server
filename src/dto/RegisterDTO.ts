import { ApiProperty } from "@nestjs/swagger";
import { DeviceType } from "@prisma/client";
import { RSAKeyPairDTO } from "./RSAKeyPairDTO";

export class RegisterDTO {
    @ApiProperty({
        description: "An AES-encrypted string of the name of the safe",
    })
    public username: string;

    @ApiProperty({
        description: "An array of key exchange objects, that is used for exchanging safe encryption key"
    })
    public email: string;

    @ApiProperty({
        description: "An encrypted version of your password",
    })
    public password: string;

    @ApiProperty({
        description: "An informative name of your device"
    })
    public deviceName: string;

    @ApiProperty({
        description: "Type of your device"    
    })
    public deviceType: DeviceType;

    @ApiProperty({
        description: "RSA encryption keys"
    })
    public rsa: RSAKeyPairDTO;
}