export default class PasswordUpdateInput {
    constructor(readonly oldPassword: string, readonly newPassword: string,
        readonly reapeatedNewPassword: string) { }
}