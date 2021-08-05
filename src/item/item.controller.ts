import { Controller, Param, Post, Put } from '@nestjs/common';

@Controller('item')
export class ItemController {
    @Post()
    public static async create() {

    }

    @Put(":id")
    public static async edit(@Param() parameters) {
        const { id } = parameters;

    }
}
