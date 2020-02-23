export default class UserProfileUpdateInput {
    constructor(public newName: string, readonly name: string, public newEmail: string,
        readonly email: string) {}
}