import {withUpdatedValues} from "../src/object/with-updated-values";
import {normalize} from "../src/object/normalize";
import {ObjectCache} from "../src/object/object-cache";

describe('withUpdatedValues', () => {
    it('should update immutable objects correctly', () => {
        const source = {
            a: 1,
            b: 2,
            c: 3
        }
        const target = withUpdatedValues(source, {
            b: 4,
        });

        expect(target === source).toBe(false);
        expect(target).toStrictEqual({a: 1, b: 4, c: 3})
    });
});

describe('normalize', () => {
    it('should normalize objects', () => {
        const source = {
            a: 1,
            c: 3,
            b: {
                z: 5,
                x: "test",
                y: [3, 2, 1]
            }
        }
        expect(JSON.stringify(normalize(source), null, 0)).toBe('{"a":1,"b":{"x":"test","y":[3,2,1],"z":5},"c":3}');
    });
    it('should normalize objects with undefined values', () => {
        const source = {
            a: 1,
            c: 3,
            b: {
                z: undefined,
                x: "test",
                y: [3, 2, 1]
            }
        }
        expect(JSON.stringify(normalize(source), null, 0)).toBe('{"a":1,"b":{"x":"test","y":[3,2,1]},"c":3}');
    });
    it('should normalize objects with null values', () => {
        const source = {
            a: 1,
            c: 3,
            b: {
                z: null,
                x: "test",
                y: [3, 2, 1]
            }
        }
        expect(JSON.stringify(normalize(source), null, 0)).toBe('{"a":1,"b":{"x":"test","y":[3,2,1],"z":null},"c":3}');
    });
});

describe('ObjectCache', () => {
    it('should return the same object for the same parameters', () => {
        let index = 1;
        const target = new ObjectCache((params: { key: string, value: string }) => params.key + ':' + params.value + ':' + index++);

        expect(target.get({key: 'a', value: 'b'})).toBe('a:b:1');
        expect(target.get({key: 'a', value: 'c'})).toBe('a:c:2');
        expect(target.get({key: 'a', value: 'b'})).toBe('a:b:1');
        expect(target.get({key: 'a', value: 'c'})).toBe('a:c:2');
        expect(target.get({value: 'b', key: 'a'})).toBe('a:b:1');
        expect(target.get({value: 'c', key: 'a'})).toBe('a:c:2');
    });
});
