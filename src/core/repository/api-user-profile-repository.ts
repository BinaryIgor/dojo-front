import UserProfileRepository from "./user-profile-repository"
import UserProfile from "../model/user-profile";
import UserProfileUpdate from "../model/user-profile-update";
import PasswordUpdate from "../model/password-update";
import { ResponsePromise, Empty } from "../types";
import SmartRequests from "../request/smart-requests";
import Response from "../response/response";

export default class ApiUserProfileRepository implements UserProfileRepository {

    private readonly requests: SmartRequests
    private readonly userProfileEndpoint: string
    private readonly userProfileImageUploadEndpoint: string
    private readonly passwordUpdateEndpoint: string
    private readonly imagesEndpointPrefix: string

    constructor(requests: SmartRequests, userProfileEndpoint: string, userProfileImageUploadEndpoint: string,
        passwordUpdateEndpoint: string, imagesEndpointPrefix: string) {
        this.requests = requests;
        this.userProfileEndpoint = userProfileEndpoint;
        this.userProfileImageUploadEndpoint = userProfileImageUploadEndpoint;
        this.passwordUpdateEndpoint = passwordUpdateEndpoint;
        this.imagesEndpointPrefix = imagesEndpointPrefix;
    }

    getCurrent(): ResponsePromise<UserProfile> {
        return this.requests.getJson<UserProfile>(this.userProfileEndpoint).then(ur => {
            if (ur.success) {
                const user = ur.value;
                return this.requests.getBlob(`${this.imagesEndpointPrefix}/${user.imagePath}`)
                    .then(ir => this.userWithImagePathOrFailure(user, ir));
            } else {
                return ur;
            }
        });
    }

    private userWithImagePathOrFailure(user: UserProfile, response: Response<string>): Response<UserProfile> {
        if (response.success) {
            user.imagePath = response.value;
            return Response.successOf(user);
        }
        return Response.failure(response.exceptions);
    }

    uploadImage(image: File): ResponsePromise<Empty> {
        const form = new FormData();
        form.append('image', image, image.name);
        return this.requests.postMultipart(this.userProfileImageUploadEndpoint, form);
    }

    update(profile: UserProfileUpdate): ResponsePromise<Empty> {
        return this.requests.putJson(this.userProfileEndpoint, profile);
    }

    updatePassword(password: PasswordUpdate): ResponsePromise<Empty> {
        return this.requests.putJson(this.passwordUpdateEndpoint, password);
    }
}