import { Response } from "../model/response.js";

export class UserRepository {

    constructor(smartRequests) {
        this._requests = smartRequests;
    }

    //TODO externalize urls
    createNewUser(newUser) {
        return this._requests.postJson('auth/sign-up', {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        }, r => r.success ? Response.success(r.value.id) : r);
    }

    matchUser(nameOrEmail, password) {
        return this._requests.postJson('auth/sign-in', {
            nameOrEmail: nameOrEmail,
            password: password
        }, r => r.success ? Response.success(r.value.token) : r);
    }

}