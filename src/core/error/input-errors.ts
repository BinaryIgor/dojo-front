export abstract class InputErrors {
    abstract hasAny(): boolean

    protected hasAnyErrors(...errors: boolean[]): boolean {
        for (const e of errors) {
            if (e) {
                return true;
            }
        }
        return false;
    }
}