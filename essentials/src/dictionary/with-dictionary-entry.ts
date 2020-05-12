import {Dictionary} from "./dictionary";

/**
 * Create a new dictionary as a clone of the original with the specified item added or replaced.
 * Useful when manipulating immutable objects e.g. in the redux store.
 * @param items: The source dictionary.
 * @param key: The key of the item to add or replace.
 * @param value: The value to add or replace.
 * @return: A new dictionary with the changed item.
 */
export function withDictionaryEntry<T>(items: Dictionary<T>, key: string, value: T): Dictionary<T> {
    if (items[key] == value)
        return items;

    items = Object.assign({}, items);
    items[key] = value;
    return items;
}
