const map = new Map<string, boolean>();
map.set('1', false);
map.set('2', false);

console.log('Dummy test!');
console.log(map.keys());
for (const [k,v] of map.entries()) {
    console.log(k);
    console.log(v);
}

console.log('---');
for (const e of map) {
    console.log(e);
}