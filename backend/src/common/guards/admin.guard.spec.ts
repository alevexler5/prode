import { ExecutionContext } from "@nestjs/common";
import { DomainErrorCode } from "../domain-error-codes";
import { AdminGuard } from "./admin.guard";

describe("AdminGuard", () => {
  const guard = new AdminGuard();

  function createContext(user?: { isAdmin?: boolean }) {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ user })
      })
    } as ExecutionContext;
  }

  it("allows admin users", () => {
    expect(guard.canActivate(createContext({ isAdmin: true }))).toBe(true);
  });

  it("rejects non-admin users", () => {
    try {
      guard.canActivate(createContext({ isAdmin: false }));
      fail("Expected AdminGuard to reject non-admin users");
    } catch (error) {
      expect((error as { getResponse?: () => unknown }).getResponse?.()).toMatchObject({
        code: DomainErrorCode.ADMIN_REQUIRED
      });
    }
  });
});
