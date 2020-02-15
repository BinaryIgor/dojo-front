//TODO add lacking methods
export class SmartRequestsFake {

    constructor() {
        this.expectedResponse = null;
        this.expectedBlobResponse = null;
        this.capturedUrl = null;
        this.capturedBlobUrl = null;
        this.capturedData = null;
        this.capturedFormData = null;
        this.rejectPromise = false;
    }

    getJson(url) {
        this.capturedUrl = url;
        return this._createPromise();
    }

    getBlob(url) {
        this.capturedBlobUrl = url;
        return this._createPromise(true);
    }

    postJson(url, data) {
        this.capturedUrl = url;
        this.capturedData = data;
        return this._createPromise();
    }

    postMultipart(url, formData) {
        this.capturedUrl = url;
        this.capturedFormData = formData;
        return this._createPromise();
    }

    //TODO reject not neccessary
    _createPromise(blob = false) {
        return new Promise((resolve, reject) => {
            if (this.rejectPromise) {
                reject(this.expectedResponse);
            } else {
                resolve(blob? this.expectedBlobResponse : this.expectedResponse);
            }
        });
    }

    post(url) {
        this.capturedUrl = url;
        return this._createPromise();
    }
}