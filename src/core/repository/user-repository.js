import { Response } from "../model/response.js";

export class UserRepository {

    constructor(smartRequests, endpoints) {
        this._requests = smartRequests;
        this._signUpEndpoint = endpoints.signUp;
        this._signInEndpoint = endpoints.signIn;
        this._activateAccountEndpoint = endpoints.activateAccount;
    }

    //TODO externalize urls
    createNewUser(newUser) {
        return this._requests.postJson(this._signUpEndpoint, {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        }).then(r => r.success ? Response.successOf(r.value.id) : r);
    }

    matchUser(nameOrEmail, password) {
        return this._requests.postJson(this._signInEndpoint, {
            nameOrEmail: nameOrEmail,
            password: password
        }).then(r => r.success ? Response.successOf(r.value) : r);
    }

    activateUser(token) {
        return this._requests.post(`${this._activateAccountEndpoint}/${token}`)
            .then(r => r.success ? Response.success() : r);
    }
}