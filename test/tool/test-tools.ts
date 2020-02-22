export function messageWithObjects(message: string, ...objects: any[]): string {
    let prettified = message;
    for (const o of objects) {
        prettified = prettified.replace('?', JSON.stringify(o));
    }
    return prettified;
}