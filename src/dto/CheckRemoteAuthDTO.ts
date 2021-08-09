import { ApiProperty } from "@nestjs/swagger";

export class CheckRemoteAuthDTO {
    @ApiProperty() 
    public id: string;

    @ApiProperty()
    public secret: string;

    @ApiProperty({
        default: false,
    })
    public web?: boolean;
}