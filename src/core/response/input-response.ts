import  InputErrors  from "../error/input-errors";
import { Empty } from "../types";
import  Response  from "./response";

export default class InputResponse<V, IE extends InputErrors> {

    private readonly _value: V | null
    private readonly _inputErrors: IE | null
    private readonly _requestErrors: string[] | null

    private constructor(value: V | null, inputErrors: IE | null, requestErrors: string[] | null) {
        this._value = value;
        this._inputErrors = inputErrors;
        this._requestErrors = requestErrors;
    }

    static successOf<V, IE extends InputErrors>(value: V): InputResponse<V, IE> {
        return new InputResponse<V, IE>(value, null, null);
    }

    static success<IE extends InputErrors>(): InputResponse<Empty, IE> {
        return new InputResponse<Empty, IE>({}, null, null);
    }

    static failure<V, IE extends InputErrors>(inputErrors: IE, requestErrors: string[] = []): InputResponse<V, IE> {
        return new InputResponse<V, IE>(null, inputErrors, requestErrors);
    }

    static fromResponseMapping<T, V, IE extends InputErrors>(response: Response<T>, valueMapper: (arg: T) => V,
        inputErrors: IE): InputResponse<V, IE> {
        if (response.success) {
            return InputResponse.successOf(valueMapper(response.value));
        }
        return InputResponse.failure(inputErrors, response.exceptions);
    }

    static fromResponse<V, IE extends InputErrors>(response: Response<V>, inputErrors: IE): InputResponse<V, IE> {
        if (response.success) {
            return InputResponse.successOf(response.value);
        }
        return InputResponse.failure(inputErrors, response.exceptions);
    }

    asPromise(): Promise<InputResponse<V, IE>> {
        return Promise.resolve(this);
    }

    get success(): boolean {
        return this._value != null;
    }

    get value(): V {
        if (this.success) {
            return this._value as V;
        }
        throw new Error('Can not return value of failed response');
    }

    get inputErrors(): IE {
        if (this.success) {
            throw new Error('Can not return input errors of successful response');
        }
        return this._inputErrors as IE;
    }

    get requestErrors(): string[] {
        if (this.success) {
            throw new Error('Can not return request errors of successful response');
        }
        return this._requestErrors as string[];
    }
}