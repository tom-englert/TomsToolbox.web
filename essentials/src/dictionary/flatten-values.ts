import {Dictionary} from "./dictionary";

/**
 * Flattens the items of a dictionary of arrays into a single array.
 * @param items The dictionary to flatten.
 */
export function flattenValues<T>(items: Dictionary<T[]>): T[] {
    const empty: T[] = [];
    return Object.entries(items)
        .reduce((acc, entry) => {
            const [, second] = entry;
            return acc.concat(second);
        }, empty);
}
