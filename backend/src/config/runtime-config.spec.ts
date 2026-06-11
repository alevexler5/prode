import { getCorsOrigins, getJwtSecret } from "./runtime-config";

describe("runtime-config", () => {
  it("requires JWT secret in every environment", () => {
    expect(() => getJwtSecret({ NODE_ENV: "development" })).toThrow("JWT_SECRET is required");
  });

  it("allows the development secret only in development", () => {
    expect(
      getJwtSecret({
        NODE_ENV: "development",
        JWT_SECRET: "change-me-in-development"
      })
    ).toBe("change-me-in-development");

    expect(() =>
      getJwtSecret({
        NODE_ENV: "production",
        JWT_SECRET: "change-me-in-development"
      })
    ).toThrow("JWT_SECRET must be changed outside development");
  });

  it("parses multiple CORS origins", () => {
    expect(
      getCorsOrigins({
        CORS_ORIGIN: "http://localhost:5173, https://prode.example.com "
      })
    ).toEqual(["http://localhost:5173", "https://prode.example.com"]);
  });
});
