export class UserRepositoryFake {

    constructor() {
        this.capturedNewUser = null;
        this.expectedResponse = null;
    }

    createNewUser(newUser) {
        this.capturedNewUser = newUser;
        return Promise.resolve(this.expectedResponse);
    }
}