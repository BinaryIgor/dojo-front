export class TokenStoreFake {


    constructor() {
        this.token = null;
    }

    save(token) {
        this.token = token;
    }

    clear() {
        this.token = null;   
    }

    get() {
        return this.token == null ? null : this.token.token;
    }

    get empty() {
        return this.get() == null;
    }
}