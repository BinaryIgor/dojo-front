import InputErrors from "./input-errors";

export default class NewUserInputErrors extends InputErrors {

    constructor(readonly name: boolean, readonly email: boolean, readonly password: boolean,
        readonly repeatedPassword: boolean) {
        super();
    }

    hasAny(): boolean {
        return this.hasAnyErrors(this.name, this.email, this.password, this.repeatedPassword);
    }
}