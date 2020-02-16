import { Response } from "../model/response.js";

export class UserProfileRepository {

    constructor(smartRequests, endpoints, imagesEndpointPrefix) {
        this._requests = smartRequests;
        this._currentUserProfileEndpoint = endpoints.currentUserProfile;
        this._currentUserProfileImageUploadEndpoint = endpoints.currentUserProfileImageUpload;
        this._imagesEndpointPrefix = imagesEndpointPrefix;
    }

    findCurrentUserProfile() {
        return this._requests.getJson(this._currentUserProfileEndpoint)
            .then(ur => {
                if (ur.success) {
                    let user = ur.value;
                    return this._requests.getBlob(`${this._imagesEndpointPrefix}/${user.imagePath}`)
                        .then(ir => {
                            let response;
                            if (ir.success) {
                                user.imagePath = ir.value;
                                response = Response.successOf(user);
                            } else {
                                response = ir;
                            }
                            return response;
                        });
                } else {
                    return ur;
                }
            });
    }

    uploadUserProfileImage(image) {
        let form = new FormData();
        form.append('image', image, image.name);
        return this._requests.postMultipart(this._currentUserProfileImageUploadEndpoint, form);
    }

    updateUserProfile(userProfileUpdate) {
        return this._requests.putJson(this._currentUserProfileEndpoint, userProfileUpdate);
    }
}