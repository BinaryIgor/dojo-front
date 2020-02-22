import { expect } from 'chai';
import InputResponse from "@/core/response/input-response";
import InputErrors from "@/core/error/input-errors";

export function expectRequestErrors(response: InputResponse<any, any>, exceptions: string[]): void {
    expect(response.success).to.equal(false);
    expect(response.inputErrors.hasAny()).to.equal(false);
    expect(response.requestErrors).to.deep.equal(exceptions);
}

export function expectSuccess<T>(response: InputResponse<T, any>, expected: T): void {
    expect(response.success).to.equal(true);
    expect(response.value).to.deep.equal(expected);
}

export function expectInputErrors<T extends InputErrors>(response: InputResponse<any, T>, expected: T): void {
    expect(response.success).to.equal(false);
    expect(response.inputErrors).to.deep.equal(expected);
}