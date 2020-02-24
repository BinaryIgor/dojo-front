import InputErrors from "./input-errors";

export default class UserProfileUpdateInputErrors extends InputErrors {

    constructor(readonly newName: boolean, readonly newEmail: boolean) {
        super();
    }

    hasAny(): boolean {
        return this.hasAnyErrors(this.newName, this.newEmail);
    }
}