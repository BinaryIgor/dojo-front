export function printObject(object) {
    return JSON.stringify(object);
}

export function subObject(keys, object) {
    let newObject = {};
    setObjectFromObject(keys, newObject, object);
    return newObject;
}

export function setObjectFromObject(keys, target, source) {
    for (let k of keys) {
        target[k] = source[k];
    }
}