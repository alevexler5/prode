import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type RequestUser = {
  id: string;
  email: string;
  isAdmin: boolean;
};

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext): RequestUser => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
