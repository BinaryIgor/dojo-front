import { hasErrors } from "../validator.js";

export class InputResponse {

    constructor(value, inputErrors, requestErrors) {
        this._value = value;
        this._requestErrors = requestErrors;
        this._inputErrors = inputErrors;
    }

    static success() {
        return new InputResponse({}, null, null);
    }

    static successOf(value) {
        return new InputResponse(value, null, null);
    }

    static inputFailure(inputErrors) {
        return new InputResponse(null, inputErrors, []);
    }

    static requestFailure(requestErrors) {
        return new InputResponse(null, [], requestErrors);
    }

    static fromResponse(response, valueMapper = v => v) {
        if (response.success) {
            return InputResponse.successOf(valueMapper(response.value));
        }
        return InputResponse.requestFailure(response.exceptions);
    }

    asPromise() {
        return Promise.resolve(this);
    }

    get success() {
        return this._value != null;
    }

    get value() {
        if (hasErrors(this._inputErrors)) {
            throw new Error('Response have input errors');
        }
        if (this._requestErrors != null) {
            throw new Error("Response have request errors");
        }
        return this._value;
    }

    get inputErrors() {
        if (this.success) {
            throw new Error("Can't get inputErrors of successful response");
        }
        return this._inputErrors;
    }

    get requestErrors() {
        if (this.success) {
            throw new Error("Can't get request errors of successful response");
        }
        return this._requestErrors;
    }
}