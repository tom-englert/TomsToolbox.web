import {normalize} from "./normalize";

/**
 * A cache for arbitrary objects that returns the same object for the same parameters
 */
export class ObjectCache<T, P> {
    private _cache: { [key: string]: T } = {};

    constructor(private _generator: (params: P) => T) {
    }

    get(params: P): T {
        const key = JSON.stringify(normalize(params));
        let value = this._cache[key];

        if (!value) {
            value = this._generator(params);
            this._cache[key] = value;
        }
        return value;
    }
}

