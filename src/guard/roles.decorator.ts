import { SetMetadata, applyDecorators } from '@nestjs/common';

type Role = 'admin' | 'user';
export function Role(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    // UseGuards(AuthGuard, RolesGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}