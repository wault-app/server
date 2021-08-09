import { ApiProperty } from "@nestjs/swagger";

export class EditSafeDTO {
    @ApiProperty()
    public name: string;
}