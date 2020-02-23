import TokenStore from "../store/token-store";
import UserProfileRepository from "../repository/user-profile-repository";
import {ResponsePromise} from "../types";
import UserProfile from "../model/user-profile";

export default class ProfileService {

    private readonly tokenStore: TokenStore
    private readonly userProfileRepository: UserProfileRepository

    constructor(tokenStore: TokenStore, userProfileRepository: UserProfileRepository) {
        this.tokenStore = tokenStore;
        this.userProfileRepository = userProfileRepository;
    }

    getProfile(): ResponsePromise<UserProfile> {
        return this.userProfileRepository.getCurrent();
    }

    signOut(): void {
        this.tokenStore.clear();
    }
}