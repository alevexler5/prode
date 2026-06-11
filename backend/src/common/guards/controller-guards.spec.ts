import { GUARDS_METADATA } from "@nestjs/common/constants";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { GroupPredictionsController } from "../../group-predictions/group-predictions.controller";
import { MatchesController } from "../../matches/matches.controller";
import { PredictionsController } from "../../predictions/predictions.controller";
import { AdminGuard } from "./admin.guard";

function getMethodGuards(controller: object, methodName: string) {
  return Reflect.getMetadata(GUARDS_METADATA, controller[methodName]) as Array<new () => unknown>;
}

describe("controller guard wiring", () => {
  it("protects prediction writes with JWT auth", () => {
    const controllerGuards = Reflect.getMetadata(GUARDS_METADATA, PredictionsController) as Array<new () => unknown>;

    expect(controllerGuards).toContain(JwtAuthGuard);
  });

  it("requires admin permissions for match result loading", () => {
    const guards = getMethodGuards(MatchesController.prototype, "updateResult");

    expect(guards).toEqual(expect.arrayContaining([JwtAuthGuard, AdminGuard]));
  });

  it("requires admin permissions for standings recalculation", () => {
    const guards = getMethodGuards(GroupPredictionsController.prototype, "calculate");

    expect(guards).toEqual(expect.arrayContaining([JwtAuthGuard, AdminGuard]));
  });
});
