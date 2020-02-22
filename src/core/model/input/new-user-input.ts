export default class NewUserInput {
    constructor(readonly name: string, readonly email: string, readonly password: string,
        readonly repeatedPassword: string) { }
}