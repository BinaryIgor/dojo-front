import { Empty } from "../types";

export default class Response<T> {

    private readonly _value: T | null
    private readonly _exceptions: string[] | null

    private constructor(value: T | null, exceptions: string[] | null) {
        this._value = value;
        this._exceptions = exceptions;
    }

    static successOf<T>(value: T): Response<T> {
        return new Response<T>(value, null);
    }

    static success(): Response<Empty> {
        return new Response<Empty>({}, null);
    }

    static failure<T>(exceptions: string[]): Response<T> {
        return new Response<T>(null, exceptions);
    }

    static wrap<T, R>(response: Response<T>, mapper: (from: T) => R): Response<R> {
        if (response.success) {
            return Response.successOf(mapper(response.value));
        }
        return Response.failure(response.exceptions);
    }

    static wrapAsEmpty(response: Response<any>): Response<Empty> {
        if (response.success) {
            return Response.success();
        }
        return Response.failure(response.exceptions);
    }

    static isNullOrFailure(response: Response<any> | null): boolean {
        return response == null || !response.success;
    }

    get success(): boolean {
        return this._value != null;
    }

    get value(): T {
        if (this.success) {
            return this._value as T;
        }
        throw new Error("Can't return value of unsucessful response");
    }

    get exceptions(): string[] {
        if (this.success) {
            throw new Error("Can't return exceptions of sucessful response");
        }
        return this._exceptions as string[];
    }
}