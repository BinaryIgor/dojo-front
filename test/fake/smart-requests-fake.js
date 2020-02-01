//TODO add lacking methods
export class SmartRequestsFake {

    constructor() {
        this.expectedResponse = null;
        this.capturedData = null;
        this.rejectPromise = false;
    }

    postJson(url, data, reponseCallback) {
        this.capturedData = data;
        return new Promise((resolve, reject) => {
            if (this.rejectPromise) {
                reject(this.expectedResponse);
            } else {
                resolve(this.expectedResponse);
            }
        }).then(r => reponseCallback(r));
    }
}