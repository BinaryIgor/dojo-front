import InputErrors from "./input-errors";

export default class PasswordUpdateInputErrors extends InputErrors {

    constructor(readonly oldPassword: boolean, readonly newPassword: boolean,
        readonly repeatedNewPassword: boolean) {
        super();
    }

    hasAny(): boolean {
        return this.hasAnyErrors(this.oldPassword, this.newPassword, this.repeatedNewPassword);
    }
}