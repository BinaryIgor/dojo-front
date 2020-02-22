import { expect } from 'chai';
import { Response } from "@/core/response/response";
import { FakeUserRepository } from "../fake/fake-user-repository";
import { SignUpService } from "@/core/service/sign-up-service";
import { NewUserInput } from "@/core/model/input/new-user-input";
import { NewUserInputErrors } from "@/core/error/new-user-input-errors";
import { messageWithObjects } from "../tool/test-tools";
import {toNewUser} from "@/core/mapper/input-mapper";
import { NewUser } from '@/core/model/new-user';
import * as expectations from "../expectation/input-response-expectations";

const fakeUserRepository = new FakeUserRepository();
const service = new SignUpService(fakeUserRepository);

describe('SignUpService tests', () => {
    for (const [input, errors] of provideInputsWithExpectedErrors()) {
        it(messageWithObjects('Sets ? errors with ? input', errors, input), () =>
            service.signUp(input).then(r => expectations.expectInputErrors(r, errors))
        );
    }

    it ('Signs up user', () => {
        const input = new NewUserInput('ala', 'ala@gmail.com', 'Minimal12', 'Minimal12');
        fakeUserRepository.expectedResponse = Response.successOf(1);
        const newUser = toNewUser(input);

        return service.signUp(input).then(r => {
            expectations.expectSuccess(r, 1);
            expect(fakeUserRepository.capturedNewUser).to.deep.equal(newUser);
        });
    });

    it('Propagates request errors', () => {
        const input = new NewUserInput('Gapek', 'gapek@tlen.pl', 'Meczyk12', 'Meczyk12');
        const exceptions = ["INTERNAL_ERROR"];
        fakeUserRepository.expectedResponse = Response.failure(exceptions);

        return service.signUp(input).then(r =>expectations.expectRequestErrors(r, exceptions));
    });
});

function provideInputsWithExpectedErrors(): [NewUserInput, NewUserInputErrors][] {
    const first: [NewUserInput, NewUserInputErrors] = [
        new NewUserInput('al', 'aadad', '13445', 'adada'),
        new NewUserInputErrors(true, true, true, false)
    ];
    const second: [NewUserInput, NewUserInputErrors] = [
        new NewUserInput('Gapek', 'gapek@gmail.com', 'hardOne1', 'hardOne123'),
        new NewUserInputErrors(false, false, false, true)
    ];
    const third: [NewUserInput, NewUserInputErrors] = [
        new NewUserInput('Ala', 'aad@', 'Superb9[pass', 'adada'),
        new NewUserInputErrors(false, true, false, true)
    ];
    const fourth: [NewUserInput, NewUserInputErrors] = [
        new NewUserInput('A', '@gmail.com', 'Good12Password', 'Good12Password'),
        new NewUserInputErrors(true, true, false, false)
    ]
    return [first, second, third, fourth];
}