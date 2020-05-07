"use strict";
// src/sum.spec.ts
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
describe("sum", function () {
    it("sums two numbers", function () {
        expect(index_1.sum(1, 2)).toEqual(3);
    });
});
