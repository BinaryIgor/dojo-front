export class Response {

    constructor(value, exceptions) {
        this._value = value;
        this._exceptions = exceptions;
    }

    static successOf(value) {
        return new Response(value, null);
    }

    static success() {
        return new Response({}, null);
    }

    //TODO support single arg
    static failure(exceptions) {
        return new Response(null, exceptions);
    }

    get success() {
        return this._value != null;
    }

    get value() {
        if (!this.success) {
            throw new Error("Can't get value of unsuccessful response");
        }
        return this._value;
    }

    get exceptions() {
        if (this.success) {
            throw new Error("Can't get exceptions of succesful response");
        }
        return this._exceptions;
    }
}