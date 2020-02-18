import { TokenStore } from "./token-store";
import { Token } from "../model/token";

const KEY = 'token';

export class InBrowserTokenStore implements TokenStore {

    get(): string | null {
        const token: Token = JSON.parse(localStorage.getItem(KEY) || "");
        return token == null ? null : token.token;
    }

    isEmpty(): boolean {
        return this.get() == null;
    }

    save(token: Token): void {
        localStorage.setItem(KEY, JSON.stringify(token));
    }

    clear(): void {
        localStorage.removeItem(KEY);
    }
}