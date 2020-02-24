export default class FakeHeaders implements Headers {

    private readonly source = new Map<string, string>();
    
    //TODO implement neede methods
    append(name: string, value: string): void {
        this.source.set(name, value);
    }

    delete(name: string): void {
        this.source.delete(name);
    }

    get(name: string): string | null {
        return this.source.get(name) ?? null;
    }

    has(name: string): boolean {
        return this.source.has(name);
    }

    set(name: string, value: string): void {
        this.source.set(name, value);
    }

    forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    [Symbol.iterator](): IterableIterator<[string, string]> {
        throw new Error("Method not implemented.");
    }

    entries(): IterableIterator<[string, string]> {
        return this.source.entries();
    }

    keys(): IterableIterator<string> {
        return this.source.keys();
    }

    values(): IterableIterator<string> {
        return this.source.values();
    }
}