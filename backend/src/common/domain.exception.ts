import { BadRequestException } from "@nestjs/common";
import { DomainErrorCode } from "./domain-error-codes";

export class DomainException extends BadRequestException {
  constructor(code: DomainErrorCode, message: string) {
    super({ code, message });
  }
}
