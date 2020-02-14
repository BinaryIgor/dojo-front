const KEY = 'token';

export const tokenStore = {
    save(token) {
        localStorage.setItem(KEY, JSON.stringify(token));
    },
    clear() {
        localStorage.removeItem(KEY);
    },
    get() {
        let token = JSON.parse(localStorage.getItem(KEY));
        console.log("TokenStore, token:", token);
        return token == null ? null : token.token;
    },
    get empty() {
        return this.get() == null;
    }
}