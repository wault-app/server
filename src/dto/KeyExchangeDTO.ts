import { ApiProperty } from "@nestjs/swagger";

export class KeyExchangeDTO {
    @ApiProperty()
    public safeid: string;

    @ApiProperty()
    public value: string;
}