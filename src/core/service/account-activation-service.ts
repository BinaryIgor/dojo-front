import UserRepository from '../repository/user-repository';
import { ResponsePromise, Empty } from "../types";

export default class AccountActivationService {

    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    activateAccount(token: string): ResponsePromise<Empty> {
        return this.userRepository.activateUser(token);
    }
}