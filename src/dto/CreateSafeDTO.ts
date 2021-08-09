import { ApiProperty } from "@nestjs/swagger";
import { KeyExchangeDTO } from "./KeyExchangeDTO";

export class CreateSafeDTO {
    @ApiProperty({
        description: "An AES-encrypted string of the name of the safe",
    })
    public name: string;

    @ApiProperty({
        type: [KeyExchangeDTO],
        description: "An array of key exchange objects, that is used for exchanging safe encryption key"
    })
    public keyExchanges: KeyExchangeDTO[];
}