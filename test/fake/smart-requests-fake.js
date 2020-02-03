//TODO add lacking methods
export class SmartRequestsFake {

    constructor() {
        this.expectedResponse = null;
        this.capturedUrl = null;
        this.capturedData = null;
        this.rejectPromise = false;
    }

    postJson(url, data) {
        this.capturedUrl = url;
        this.capturedData = data;
        return this._createPromise();
    }

    _createPromise() {
        return new Promise((resolve, reject) => {
            if (this.rejectPromise) {
                reject(this.expectedResponse);
            } else {
                resolve(this.expectedResponse);
            }
        });
    }

    post(url) {
        this.capturedUrl = url;
        return this._createPromise();
    }
}