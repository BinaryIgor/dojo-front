import { Response } from "../model/response.js";

export class UserRepository {

    constructor(smartRequests) {
        this._requests = smartRequests;
    }

    createNewUser(newUser, responseCallback) {
        return this._requests.postJson('posts', {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        }, r => {
            let response;
            if (r.success) {
                response = Response.success(r.value.id);
            } else {
                response = r;
            }
            responseCallback(response);
        });
    }
}