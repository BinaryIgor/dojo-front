export class AccountActivationService {

    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    activateAccount(token) {
        return this._userRepository.activateUser(token);
    }
}