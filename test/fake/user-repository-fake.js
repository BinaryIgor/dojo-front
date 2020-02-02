export class UserRepositoryFake {

    constructor() {
        this.capturedNewUser = null;
        this.capturedUser = null;
        this.expectedResponse = null;
    }

    createNewUser(newUser) {
        this.capturedNewUser = newUser;
        return Promise.resolve(this.expectedResponse);
    }

    matchUser(nameOrEmail, password) {
        this.capturedUser = {
            nameOrEmail: nameOrEmail,
            password: password
        };
        return Promise.resolve(this.expectedResponse);
    }
}