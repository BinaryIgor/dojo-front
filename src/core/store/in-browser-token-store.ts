import TokenStore from "./token-store";
import Token from "../model/token";

const KEY = 'token';

export default class InBrowserTokenStore implements TokenStore {

    get(): string {
        const json = localStorage.getItem(KEY);
        return json ? JSON.parse(json).token : "";
    }

    isEmpty(): boolean {
        return this.get() == '';
    }

    save(token: Token): void {
        localStorage.setItem(KEY, JSON.stringify(token));
    }

    clear(): void {
        localStorage.removeItem(KEY);
    }
}