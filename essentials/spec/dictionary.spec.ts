import {flattenValues, toDictionary, withDictionaryEntry} from "../src";

const items = [{
    id: 'id1',
    name: 'first'
}, {
    id: 'id2',
    name: 'second'
}, {
    id: 'id3',
    name: 'third'
}];

const duplicate = {
    id: 'id2',
    name: 'another second'
}

describe('Dictionary', () => {
    it('Returns empty when params are undefined', () => {
        const items: string[] = <string[]><any>undefined;
        const target = toDictionary(items, i => i);
        expect(JSON.stringify(target)).toBe('{}');
    });

    it('Converts to dictionary', () => {
        const target = toDictionary(items, item => item.id);

        expect(target['id1'].name).toBe('first');
        expect(target['id2'].name).toBe('second');
        expect(target['id3'].name).toBe('third');
        expect(target['id4']).toBeUndefined();
    });

    it('Ignores duplicates', () => {
        const target = toDictionary(items.concat([duplicate]), item => item.id);

        expect(target['id1'].name).toBe('first');
        expect(target['id2'].name).toBe('another second');
        expect(target['id3'].name).toBe('third');
        expect(target['id4']).toBeUndefined();
    });

    it('Updates immutable', () => {
        const source = toDictionary(items, item => item.id);
        const target = withDictionaryEntry(source, 'id2', duplicate);

        expect(source === target).toBe(false);
        expect(source['id2'].name).toBe('second');
        expect(target['id2'].name).toBe('another second');
    });

    it('Returns the same object when input did not change', () => {
        const source = toDictionary(items, item => item.id);
        const target = withDictionaryEntry(source, 'id2', source['id2']);

        expect(source === target).toBe(true);
    });

    it('Flattens dictionary of arrays', () => {
        const source = {
            items1: [1, 2, 3],
            items2: [2, 3, 4],
            items3: [3, 4, 5]
        }

        const target = flattenValues(source);

        expect(target).toStrictEqual([1, 2, 3, 2, 3, 4, 3, 4, 5]);
    });
});
