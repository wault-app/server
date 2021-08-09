import { ApiProperty } from "@nestjs/swagger";

export class EditItemDTO {
    @ApiProperty({
        description: "An AES-encrypted string of the stringified JSON data of the item",
    })
    public data: string;
}