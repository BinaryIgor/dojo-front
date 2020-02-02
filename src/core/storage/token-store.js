const KEY = 'token';

export const tokenStore = {
    save(token) {
        localStorage.setItem(KEY, token);
    },
    clear() {
        localStorage.removeItem(KEY);
    },
    get() {
        return localStorage.getItem(KEY);
    },
    get empty() {
        return this.get() == null;
    }
}