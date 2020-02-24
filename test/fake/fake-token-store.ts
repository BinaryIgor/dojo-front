import TokenStore from "../../src/core/store/token-store";
import Token from "../../src/core/model/token";

export default class FakeTokenStore implements TokenStore {

    private token: Token | null = null;

    save(token: Token): void {
        this.token = token;
    }

    clear(): void {
        this.token = null;
    }

    get(): string {
        if (this.token == null) {
            throw new Error("Can't return null token!");
        }
        return this.token.token;
    }

    isEmpty(): boolean {
        return this.token != null;
    }
}