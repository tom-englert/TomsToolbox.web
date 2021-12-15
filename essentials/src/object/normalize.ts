import {compare} from "./compare";

/**
 * Normalizes an object by arranging it's properties in alphabetic order, so e.g. serialization always returns the same string.
 * @param item The object to normalize
 * @return The normalized object
 */
export function normalize<T>(item: T): T {
    const itemType = typeof item;
    if (itemType === 'object' && !Array.isArray(item) && item !== null) {
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
