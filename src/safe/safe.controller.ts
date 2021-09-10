import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateSafeDTO } from 'src/dto/CreateSafeDTO';
import { EditSafeDTO } from 'src/dto/EditSafeDTO';
import { Role } from 'src/role/role.decorator';
import { User } from 'src/user/user.decorator';
import { SafeGuard } from './safe.guard';
import { SafeService } from './safe.service';

@Controller('safe')
@ApiTags("safe")
@ApiBearerAuth()
export class SafeController {
    constructor(private keycard: SafeService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(@User() user: User) {
        return {
            keycards: await this.keycard.getAll({
                user: {
                    id: user.id,
                },
            }),
        };
    }

    @Post()
    @UseGuards(JwtAuthGuard, SafeGuard)
    @ApiBody({
        type: CreateSafeDTO,
    })
    async create(
        @Body("name") name: string,
        @Body("description") description: string,
        @Body("secret") secret: string,
        @User() user: User
    ) {
        // create a new keycard object inside the database
        const keycard = await this.keycard.create({
            safe: {
                create: {
                    name,
                    description,
                },
            },
            secret,
            role: "OWNER",
            user: {
                connect: {
                    id: user.id,
                },
            },
        });

        return {
            message: "Safe successfully created!",
            keycard,
        };
    }

    @Put(":id")
    @Role("OWNER", "WRITER")
    @UseGuards(JwtAuthGuard, SafeGuard)
    @ApiBody({
        type: EditSafeDTO,
    })
    async edit(@Param("id") id: string, @User() user: User, @Body("name") name: string) {
        const keycard = await this.keycard.edit({
            where: {
                safeId_userId: {
                    safeId: id,
                    userId: user.id,
                },
            },
            data: {
                safe: {
                    update: {
                        name,
                    },
                },
            },
        });

        return {
            message: "Safe was successfully edited!",
            keycard,
        };
    }

    @Delete(":id")
    @Role("OWNER")
    @UseGuards(JwtAuthGuard, SafeGuard)
    async delete(@Param("id") id: string) {
        // TODO: implement delete
    }
}
