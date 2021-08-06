import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { KeyExchangeService } from 'src/key-exchange/key-exchange.service';
import { Role } from 'src/role/role.decorator';
import { SessionTokenGuard } from 'src/session-token/session-token.guard';
import { User } from 'src/user/user.decorator';
import { SafeGuard } from './safe.guard';
import { SafeService } from './safe.service';

@Controller('safe')
export class SafeController {
    constructor(private keycard: SafeService, private keyExchange: KeyExchangeService) { }

    @Get()
    @UseGuards(SessionTokenGuard)
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
    @UseGuards(SessionTokenGuard, SafeGuard)
    async create(@Body("name") name: string, @Body("keyExchanges") keyExchanges, @User() user: User) {
        // create a new keycard object inside the database
        const keycard = await this.keycard.create({
            safe: {
                create: {
                    name,
                },
            },
            role: "OWNER",
            user: {
                connect: {
                    id: user.id,
                },
            },
        });

        // create all key exchange object for the database
        await Promise.all(
            keyExchanges.map(
                async (key) => {
                    await this.keyExchange.create({
                        device: {
                            connect: {
                                id: key.deviceid,
                            },
                        },
                        value: key.value,
                        safe: {
                            connect: {
                                id: keycard.safe.id,
                            },
                        },
                    });
                }
            )
        )

        return {
            message: "Safe successfully created!",
            keycard,
        };
    }

    @Put(":id")
    @Role("OWNER", "WRITER")
    @UseGuards(SessionTokenGuard, SafeGuard)
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
    @UseGuards(SessionTokenGuard, SafeGuard)
    async delete(@Param("id") id: string) {
        // TODO: implement delete
    }
}
