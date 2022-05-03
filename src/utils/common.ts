export function cleanKeys<T extends Record<string, any>>(item: T): T {
    for (const key in item) {
        if (item[key] === '' || item[key] === 'undefined' || item[key] === 'null' || item[key] == null) {
            delete item[key];
        }
    }

    return item;
}
