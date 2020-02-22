import { ResponsePromise, Empty } from "../types";
import UserProfile from "../model/user-profile";
import UserProfileUpdate from "../model/user-profile-update";
import PasswordUpdate from "../model/password-update";

export default interface UserProfileRepository {

    getCurrent(): ResponsePromise<UserProfile>

    uploadImage(image: File): ResponsePromise<Empty>

    update(profile: UserProfileUpdate): ResponsePromise<Empty>

    updatePassword(password: PasswordUpdate): ResponsePromise<Empty>
}