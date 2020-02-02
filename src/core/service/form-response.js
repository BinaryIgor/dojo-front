import { hasErrors } from "../validator.js";

export class FormResponse {

    constructor(formErrors, requestErrors) {
        this.formErrors = formErrors;
        this.requestErrors = requestErrors;
    }

    get success() {
        return !hasErrors(this.formErrors) && this.requestErrors.length == 0;
    }

    static asPromise(formErrors) {
        return Promise.resolve(new FormResponse(formErrors, []));
    }

    static fromResponse(formErrors, response) {
        let exceptions = response.success ? [] : response.exceptions;
        return new FormResponse(formErrors, exceptions);
    }
}