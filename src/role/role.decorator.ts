import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@prisma/client';

export const Role = (...args: RoleType[]) => SetMetadata('role', args);
