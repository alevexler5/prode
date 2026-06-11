import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RequestUser } from "../decorators/current-user.decorator";
import { DomainErrorCode } from "../domain-error-codes";
import { DomainException } from "../domain.exception";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: RequestUser }>();

    if (!request.user?.isAdmin) {
      throw new DomainException(DomainErrorCode.ADMIN_REQUIRED, "Admin permissions are required");
    }

    return true;
  }
}
