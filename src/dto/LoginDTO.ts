import { ApiProperty } from "@nestjs/swagger";
import { DeviceType } from "@prisma/client";

export class LoginDTO {
    @ApiProperty({
        description: "The email address associated with the user"
    })
    public email: string;

    @ApiProperty({
        description: "An encrypted version of the password"
    })
    public password: string;

    @ApiProperty({
        description: "The name of the device, the user uses"
    })
    public deviceName?: string;

    @ApiProperty({
        description: "The type of device, that the authenticated process used to start"
    })
    public deviceType?: DeviceType;
}