import {compare} from "./compare";

/**
 * Normalizes an object by arranging it's properties in alphabetic order, so e.g. serialization always returns the same string.
 * @param item
 */
export function normalize<T>(item: T): T {
    const itemType = typeof item;
    if (itemType === 'object' && !Array.isArray(item)) {
        return Object.entries(item)
            .sort((a, b) => compare(a[0], b[0]))
            .reduce((acc, entry) => {
                const [key, value] = entry;
                // @ts-ignore
                acc[key] = normalize(value);
                return acc;
            }, <T>{});
    }
    return item;
}
