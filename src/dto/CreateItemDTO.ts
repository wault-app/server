import { ApiProperty } from "@nestjs/swagger";

export class CreateItemDTO {
    @ApiProperty({
        description: "The ID of the safe, that we want to put the new item into",
    })
    public safeid: string;

    @ApiProperty({
        description: "An AES-encrypted string of the stringified JSON data of the item",
    })
    public data: string;
}