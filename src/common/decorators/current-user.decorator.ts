import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom decorator to get current user easily
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        return request.user;
    }
)