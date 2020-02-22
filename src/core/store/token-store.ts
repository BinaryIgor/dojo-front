import Token from "../model/token";

export default interface TokenStore {
    
    save(token: Token): void;

    clear(): void;

    get(): string;

    isEmpty(): boolean;

}