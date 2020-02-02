import { Response } from "../model/response.js";

export class UserRepository {

    constructor(smartRequests, endpoints) {
        this._requests = smartRequests;
        this._signUpEndpoint = endpoints.signUpEndpoint;
        this._signInEndpoint = endpoints.signInEndpoint;
    }

    //TODO externalize urls
    createNewUser(newUser) {
        return this._requests.postJson(this._signUpEndpoint, {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        }, r => r.success ? Response.success(r.value.id) : r);
    }

    matchUser(nameOrEmail, password) {
        return this._requests.postJson(this._signInEndpoint, {
            nameOrEmail: nameOrEmail,
            password: password
        }, r => r.success ? Response.success(r.value.token) : r);
    }
}