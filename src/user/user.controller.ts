import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SessionTokenGuard } from 'src/session-token/session-token.guard';
import { User } from './user.decorator';
import { UserService } from './user.service';

@Controller('user')
@ApiTags("user")
@ApiBearerAuth()
export class UserController {
    constructor(private service: UserService) { }

    @Get()
    @UseGuards(SessionTokenGuard)
    async get(@User() user: User) {
        return await this.service.getUser(user);
    }
}
