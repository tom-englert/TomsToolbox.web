import {Dictionary} from "./dictionary";

/**
 * Maps a flat list to a dictionary.
 * @param items The items to map.
 * @param getKey The callback to retrieve the key from an item.
 */
export function toDictionary<T>(items: T[], getKey: (item: T) => string): Dictionary<T> {
    if (!items || !getKey)
        return {};

    return items.reduce((acc: Dictionary<T>, value) => {
        acc[getKey(value)] = value;
        return acc;
    }, {});
}
