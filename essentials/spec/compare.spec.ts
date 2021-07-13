import {isContentEqual, isEqual, isSequenceEqual, isStrictEqual} from "../src";

describe('isContentEqual', () => {
    it('should detect similar objects', () => {
        const left = {a: 2, b: "test", c: {d: [1, 2, 3]}};
        const right = {c: {d: [1, 2, 3]}, b: "test", a: "2"};

        expect(isContentEqual(left, right)).toBeTruthy();
    });
    it('should detect different arrays', () => {
        const left = {a: 2, b: "test", c: {d: [1, 2, 3]}};
        const right = {c: {d: [1, 2, 4]}, b: "test", a: "2"};

        expect(isContentEqual(left, right)).toBeFalsy();
    });
    it('should detect different strings', () => {
        const left = {a: 2, b: "test", c: {d: [1, 2, 3]}};
        const right = {c: {d: [1, 2, 3]}, b: "test1", a: "2"};

        expect(isContentEqual(left, right)).toBeFalsy();
    });
    it('should treat similar values as equal', () => {
        const left = [1, 2, "3"];
        const right = [1, 2, 3];

        expect(isContentEqual(left, right)).toBeTruthy();
    });
    it('should detect different objects', () => {
        const left = {a: 2, b: "test"};
        const right = {c: {d: [1, 2, 3]}, b: "test", a: "2"};

        expect(isContentEqual(left, right)).toBeFalsy();
    });
    it('should treat null as not equal to something', () => {
        const left = {c: {d: [1, 2, null]}, b: "test", a: "2"};
        const right = {c: {d: [1, 2, 3]}, b: "test", a: "2"};

        expect(isContentEqual(left, right)).toBeFalsy();
    });
    it('should treat null and undefined as equal', () => {
        const left = {c: {d: [1, 2, null]}, b: "test", a: "2"};
        const right = {c: {d: [1, 2, undefined]}, b: "test", a: "2"};

        expect(isContentEqual(left, right)).toBeTruthy();
    });
    it('should treat similar arrays as equal', () => {
        const left = [{date: new Date('2021-01-01')}, {date: new Date('2021-01-02')}, {date: new Date('2021-01-03')}];
        const right = [{date: new Date('2021-01-01')}, {date: new Date('2021-01-02')}, {date: new Date('2021-01-03')}];

        expect(isContentEqual(left, right)).toBeTruthy();
    });
    it('should treat different arrays as different', () => {
        const left = [{date: new Date('2021-01-01')}, {date: new Date('2021-01-02')}, {date: new Date('2021-01-03')}];
        const right = [{date: new Date('2021-01-04')}, {date: new Date('2021-01-05')}, {date: new Date('2021-01-06')}];

        expect(isContentEqual(left, right)).toBeFalsy();
    });
    it('should treat empty objects as equal', () => {
        expect(isContentEqual({}, {})).toBeTruthy();
    });
    it('should treat different objects as different', () => {
        expect(isContentEqual({}, new Date())).toBeFalsy();
    });
});

describe('isSequenceEqual', () => {
    it('should detect similar arrays', () => {
        const left = [1, 2, "3"];
        const right = [1, 2, 3];

        expect(isSequenceEqual(left, right)).toBeTruthy();
    });
    it('should detect different arrays', () => {
        const left = [1, 2, "3"];
        const right = [1, 2, 4];

        expect(isSequenceEqual(left, right)).toBeFalsy();
    });
    it('should detect different array sizes', () => {
        const left = [1, 2];
        const right = [1, 2, 4];

        expect(isSequenceEqual(left, right)).toBeFalsy();
    });
    it('should use the comparison method', () => {
        const left = [1, 2, "3"];
        const right = [1, 2, 3];

        expect(isSequenceEqual(left, right)).toBeTruthy();
        expect(isSequenceEqual(left, right, isEqual)).toBeTruthy();
        expect(isSequenceEqual(left, right, isStrictEqual)).toBeFalsy();
    });
});
