import { InputErrors } from "./input-errors";

export class SignInInputErrors extends InputErrors {

    constructor(readonly name: boolean, readonly email: boolean, readonly password: boolean) {
        super();
    }

    hasAny(): boolean {
        return this.hasAnyErrors(this.name, this.email, this.password);
    }
}