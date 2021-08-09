import { ApiProperty } from "@nestjs/swagger"
import { DeviceType } from "@prisma/client";

export class StartRemoteAuthDTO {
    @ApiProperty()
    deviceName: string;

    @ApiProperty({
        enum: DeviceType,
    })
    deviceType: DeviceType;
    
    @ApiProperty() 
    rsaKey: string;
}