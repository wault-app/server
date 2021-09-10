import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateItemDTO } from 'src/dto/CreateItemDTO';
import { EditItemDTO } from 'src/dto/EditItemDTO';
import { Role } from 'src/role/role.decorator';
import { ItemGuard } from './item.guard';
import { ItemService } from './item.service';

@Controller('item')
@ApiTags("item")
@ApiBearerAuth()
export class ItemController {
    constructor(private service: ItemService) {}

    @Post()
    @Role("OWNER", "WRITER")
    @UseGuards(JwtAuthGuard, ItemGuard)
    async create(@Body() body: CreateItemDTO) {
        const { data, safeid } = body;
        
        const item = await this.service.create({
            safe: {
                connect: {
                    id: safeid,
                },
            },
            data,
        });

        return {
            message: "Item successfully added to safe!",
            item,
        };
    }

    @Put(":id")
    @Role("OWNER", "WRITER")
    @UseGuards(JwtAuthGuard, ItemGuard)
    async edit(@Param("id") id: string, @Body() body: EditItemDTO) {
        const { data } = body;
        
        const item = await this.service.update({
            where: {
                id,
            },
            data: {
                data,
            },
        });

        return {
            message: "Item successfully updated!",
            item,
        };
    }

    @Delete(":id")
    @Role("OWNER", "WRITER")
    @UseGuards(JwtAuthGuard, ItemGuard)
    async delete(@Param("id") id: string) {
        await this.service.delete({
            where: {
                id,
            },
        });

        return {
            message: "Item successfully deleted!",
        };
    }
}
