import {Token} from "../model/token";

export interface TokenStore {
    
    save(token: Token): void;

    clear(): void;

    get(): string | null;

    isEmpty(): boolean;

}