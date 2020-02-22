class UserLogo {
    constructor(readonly logo: string) {

    }
}

class UserName {
    constructor(readonly name: string) {

    }
}

function map<S, T>(source: S, keysMapping = new Map<string, string>()): T {
    const t: any = {};
    for (const k in source) {
        const kMapping = keysMapping.get(k);
        if (kMapping) {
            t[kMapping] = source[k];
        } else {
            t[k] = source[k];
        }
    }
    return t as T;
}

const userLogo = new UserLogo('Igor');
const userName = map(userLogo, new Map<string, string>([['logo', 'name']]));
console.log('Mapped: ', userName);