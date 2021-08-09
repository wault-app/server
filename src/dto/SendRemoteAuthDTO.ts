import { ApiProperty } from "@nestjs/swagger";
import { KeyExchangeDTO } from "./KeyExchangeDTO";

export class SendRemoteAuthDTO {
    @ApiProperty()
    public id: string;

    @ApiProperty({
        type: [KeyExchangeDTO],
        description: "An array of key exchange objects, that is used for exchanging safe encryption key"
    })
    public keyExchanges: KeyExchangeDTO[];
}