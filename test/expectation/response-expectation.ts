import { expect } from 'chai';
import { Response } from "@/core/response/response";

export function expectFailure(response: Response<any>, exceptions: string[]): void {
    expect(response.success).to.equal(false);
    expect(response.exceptions).to.deep.equal(exceptions);
}

export function expectSuccess<T>(response: Response<any>, expected: T): void {
    expect(response.success).to.equal(true);
    expect(response.value).to.deep.equal(expected);
}

export function expectSuccessEmptyValue<T>(response: Response<any>): void {
    expect(response.success).to.equal(true);
    expect(response.value).to.deep.equal({});
}