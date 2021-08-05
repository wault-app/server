import { Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('keycard')
export class KeycardController {
    @Get()
    public static async getAll() {

    }

    @Post()
    public static async create() {

    }

    @Put(":id")
    public static async edit(@Param() parameters) {
        const { id } = parameters;
    }
}
