import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private service: UserService) {}
    
    @Get()
    @UseGuards(AuthGuard)
    async get(@User() user: User) {
        return this.service.getUser(user);
    }
}
