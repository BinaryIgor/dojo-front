import { ResponsePromise, Empty } from "@/core/types";
import UserProfile from "@/core/model/user-profile";
import UserProfileUpdate from "@/core/model/user-profile-update";
import PasswordUpdate from "@/core/model/password-update";
import UserProfileRepository from '@/core/repository/user-profile-repository';
import { resolveResponse } from "./fakes";
import Response from "@/core/response/response";

export default class FakeUserProfileRepository implements UserProfileRepository {

    capturedProfileUpdate?: UserProfileUpdate
    capturedPasswordUpdate?: PasswordUpdate
    capturedImageUpload?: File
    expectedResponse?: Response<any>

    getCurrent(): ResponsePromise<UserProfile> {
        return resolveResponse(this.expectedResponse);
    }

    uploadImage(image: File): ResponsePromise<Empty> {
        this.capturedImageUpload = image;
        return resolveResponse(this.expectedResponse);
    }

    update(profile: UserProfileUpdate): ResponsePromise<Empty> {
        this.capturedProfileUpdate = profile;
        return resolveResponse(this.expectedResponse);
    }

    updatePassword(password: PasswordUpdate): ResponsePromise<Empty> {
        this.capturedPasswordUpdate = password;
        return resolveResponse(this.expectedResponse);
    }
}
