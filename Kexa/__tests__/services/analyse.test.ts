import { ConditionEnum } from "../../enum/condition.enum";
import { RulesConditions } from "../../models/settingFile/conditions.models";
import { checkAll, checkCount, checkEndsWith, checkEqual, checkEqualDate, checkEqualThanDate, checkGreaterThan, checkGreaterThanDate, checkInclude, checkIncludeNS, checkInterval, checkIntervalDate, checkLessThan, checkLessThanDate, checkOne, checkRegex, checkSome, checkStartsWith, gatheringRules, generateDate } from "../../services/analyse.service";

const { expect } = require('chai');

describe('analyse service', () => {
    describe('Gathering rules', () => {
        it('should return one rule', async () => {
            const result = await gatheringRules("./Kexa/__tests__/rules/test1");
            expect(result.length).to.equal(1);
        });

        it('should return a multiple rules', async () => {
            const result = await gatheringRules("./Kexa/__tests__/rules/test2", true);
            expect(result.length).to.be.above(1);
        });

        it('should return 0 rules', async () => {
            const result = await gatheringRules("./Kexa/__tests__/rules/test3");
            expect(result.length).to.equal(0);
        });
    });

    describe("resultScan function", () => {
        
        describe("Equal Date", () => {
            it("should return true", () => {
                const result = checkEqualDate({property: "date", condition: ConditionEnum.DATE_EQUAL, value: "01-01-2021", date: "DD-MM-YYYY"}, "01-01-2021");
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkEqualDate({property: "date", condition: ConditionEnum.DATE_EQUAL, value: "02-01-2021", date: "DD-MM-YYYY"}, "01-01-2021");
                expect(result).to.equal(false);
            });
        });

        describe("Interval Date", () => {
            it("should return true", () => {
                const result = checkIntervalDate({property: "date", condition: ConditionEnum.DATE_INTERVAL, value: "01-01-2021 02-01-2021", date: "DD-MM-YYYY"}, "01-01-2021");
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkIntervalDate({property: "date", condition: ConditionEnum.DATE_INTERVAL, value: "01-01-2021 02-01-2021", date: "DD-MM-YYYY"}, "03-01-2021");
                expect(result).to.equal(false);
            });
        });

        describe("Interval", () => {
            it("should return true", () => {
                const result = checkInterval({property: "date", condition: ConditionEnum.INTERVAL, value: "1 3"}, 1);
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkInterval({property: "date", condition: ConditionEnum.INTERVAL, value: "1 3"}, 4);
                expect(result).to.equal(false);
            });
        });

        describe("Greater than date", () => {
            it("should return true", () => {
                const result = checkGreaterThanDate({property: "date", condition: ConditionEnum.DATE_SUP, value: "0 0 0 1", date: "DD-MM-YYYY"}, generateDate("0 0 0 0 1 0", false).format("DD-MM-YYYY"));
                expect(result).to.equal(true);
            });
            
            it("should return false", () => {
                const result = checkGreaterThanDate({property: "date", condition: ConditionEnum.DATE_SUP, value: "0 0 0 1", date: "DD-MM-YYYY"}, generateDate("0 0 0 0 1 0").format("DD-MM-YYYY"));
                expect(result).to.equal(false);
            });
        });

        describe("Less than date", () => {
            it("should return true", () => {
                const result = checkLessThanDate({property: "date", condition: ConditionEnum.DATE_INF, value: "0 0 0 1", date: "DD-MM-YYYY"}, generateDate("0 0 0 0 1 0").format("DD-MM-YYYY"));
                expect(result).to.equal(true);
            });
            
            it("should return false", () => {
                const result = checkLessThanDate({property: "date", condition: ConditionEnum.DATE_INF, value: "0 0 0 1", date: "DD-MM-YYYY"}, generateDate("0 0 0 1 0 0", false).format("DD-MM-YYYY"));
                expect(result).to.equal(false);
            });

        });

        describe("Equal than date", () => {
            it("should return true", () => {
                //NOT WORKING
                const result = checkEqualThanDate({property: "date", condition: ConditionEnum.DATE_INF_OR_EQUAL, value: "0 0 0 1", date: "DD-MM-YYYY"}, generateDate("0 0 0 1 0 0", false).format("DD-MM-YYYY"), false);
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkEqualThanDate({property: "date", condition: ConditionEnum.DATE_INF_OR_EQUAL, value: "0 0 0 1", date: "DD-MM-YYYY"}, generateDate("0 0 0 0 0 0").format("DD-MM-YYYY"), false);
                expect(result).to.equal(false);
            });
        });

        describe("Equal", () => {
            it("should return true", () => {
                const result = checkEqual({property: "date", condition: ConditionEnum.EQUAL, value: 1}, 1);
                expect(result).to.equal(true);
            })

            it("should return false", () => {
                const result = checkEqual({property: "date", condition: ConditionEnum.EQUAL, value: 1}, 2);
                expect(result).to.equal(false);
            });
        });

        describe("Sup", () => {
            it("should return true", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 1}, 2);
                expect(result).to.equal(true);
            })

            it("should return false", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 1}, 1);
                expect(result).to.equal(false);
            });
        });

        describe("Inf", () => {
            it("should return true", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 1}, 0);
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 1}, 1);
                expect(result).to.equal(false);
            });
        });

        describe("Include", () => {
            it("should return true", () => {
                const result = checkInclude({property: "date", condition: ConditionEnum.INCLUDE, value: "2"}, "1 2 3");
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkInclude({property: "date", condition: ConditionEnum.INCLUDE, value: "4"}, "1 2 3");
                expect(result).to.equal(false);
            });
            
            it("should return false", () => {
                const result = checkInclude({property: "date", condition: ConditionEnum.STARTS_WITH, value: "A"}, "abc");
                expect(result).to.equal(false);
            });
        });

        describe("Starts with", () => {
            it("should return true", () => {
                const result = checkStartsWith({property: "date", condition: ConditionEnum.STARTS_WITH, value: "1"}, "1 2 3");
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkStartsWith({property: "date", condition: ConditionEnum.STARTS_WITH, value: "4"}, "1 2 3");
                expect(result).to.equal(false);
            });
        });

        describe("Ends with", () => {
            it("should return true", () => {
                const result = checkEndsWith({property: "date", condition: ConditionEnum.ENDS_WITH, value: "3"}, "1 2 3");
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkEndsWith({property: "date", condition: ConditionEnum.ENDS_WITH, value: "4"}, "1 2 3");
                expect(result).to.equal(false);
            });
        });

        describe("Include not sensitive", () => {
            it("should return true", () => {
                const result = checkIncludeNS({property: "date", condition: ConditionEnum.INCLUDE_NOT_SENSITIVE, value: "2"}, "1 2 3");
                expect(result).to.equal(true);
            });

            it("should return true", () => {
                const result = checkIncludeNS({property: "date", condition: ConditionEnum.INCLUDE_NOT_SENSITIVE, value: "A"}, "abc");
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkIncludeNS({property: "date", condition: ConditionEnum.INCLUDE_NOT_SENSITIVE, value: "4"}, "1 2 3");
                expect(result).to.equal(false);
            });
        });

        describe("Regex", () => {
            it("should return true", () => {
                const result = checkRegex({property: "date", condition: ConditionEnum.REGEX, value: "^[a-z]+$"}, "abc");
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkRegex({property: "date", condition: ConditionEnum.REGEX, value: "/[0-9]/gm"}, "abc");
                expect(result).to.equal(false);
            });
        });

        describe("count", () => {
            it("should return true", () => {
                const result = checkCount({property: "date", condition: ConditionEnum.COUNT, value: 3}, [1, 2, 3]);
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkCount({property: "date", condition: ConditionEnum.COUNT, value: 3}, [1, 2]);
                expect(result).to.equal(false);
            });
        });

        describe("count sup", () => {
            it("should return true", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.COUNT_SUP, value: 3}, [1, 2, 3, 4].length);
                expect(result).to.equal(true);
            });

            it("should return true", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.COUNT_SUP, value: 3}, [1, 2, 3].length);
                expect(result).to.equal(false);
            });

            it("should return false", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.COUNT_SUP, value: 3}, [1, 2].length);
                expect(result).to.equal(false);
            });
        });

        describe("count inf", () => {
            it("should return true", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.COUNT_INF, value: 3}, [1, 2].length);
                expect(result).to.equal(true);
            });

            it("should return true", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.COUNT_INF, value: 3}, [1, 2, 3].length);
                expect(result).to.equal(false);
            });

            it("should return false", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.COUNT_INF, value: 3}, [1, 2, 3, 4].length);
                expect(result).to.equal(false);
            });
        });

        describe("all", () => {
            it("should return true", () => {
                const result = checkAll({
                    property: "date",
                    condition: ConditionEnum.ALL,
                    value: [{
                        property: "a",
                        condition: ConditionEnum.EQUAL,
                        value: 1
                    }] as RulesConditions[]
                }, [{"a": 1}, {"a":1}, {"a":1}]);
                expect(result).to.equal(true);
            });

            it("should return false", () => {
                const result = checkAll({
                    property: "date",
                    condition: ConditionEnum.ALL,
                    value: [{
                        property: "a",
                        condition: ConditionEnum.EQUAL,
                        value: 1
                    }] as RulesConditions[]
                }, [{"a": 2}, {"a":1}, {"a":1}]);
                expect(result).to.equal(false);
            });
        });
    });

    describe("Some", () => {
        it("should return true", () => {
            const result = checkSome({
                property: "date",
                condition: ConditionEnum.ALL,
                value: [{
                    property: "a",
                    condition: ConditionEnum.EQUAL,
                    value: 1
                }] as RulesConditions[]
            }, [{"a": 2}, {"a":3}, {"a":1}]);
            expect(result).to.equal(true);
        });

        it("should return true", () => {
            const result = checkSome({
                property: "date",
                condition: ConditionEnum.ALL,
                value: [{
                    property: "a",
                    condition: ConditionEnum.EQUAL,
                    value: 1
                }] as RulesConditions[]
            }, [{"a": 2}, {"a":3}, {"a":1}]);
            expect(result).to.equal(true);
        });

        it("should return false", () => {
            const result = checkSome({
                property: "date",
                condition: ConditionEnum.ALL,
                value: [{
                    property: "a",
                    condition: ConditionEnum.EQUAL,
                    value: 1
                }] as RulesConditions[]
            }, [{"a": 2}, {"a":3}, {"a":4}]);
            expect(result).to.equal(false);
        });
    });

    describe("One", () => {
        it("should return true", () => {
            const result = checkOne({
                property: "date",
                condition: ConditionEnum.ALL,
                value: [{
                    property: "a",
                    condition: ConditionEnum.EQUAL,
                    value: 1
                }] as RulesConditions[]
            }, [{"a": 2}, {"a":3}, {"a":1}]);
            expect(result).to.equal(true);
        });

        it("should return false", () => {
            const result = checkOne({
                property: "date",
                condition: ConditionEnum.ALL,
                value: [{
                    property: "a",
                    condition: ConditionEnum.EQUAL,
                    value: 1
                }] as RulesConditions[]
            }, [{"a": 2}, {"a":1}, {"a":1}]);
            expect(result).to.equal(false);
        });

        it("should return false", () => {
            const result = checkOne({
                property: "date",
                condition: ConditionEnum.ALL,
                value: [{
                    property: "a",
                    condition: ConditionEnum.EQUAL,
                    value: 1
                }] as RulesConditions[]
            }, [{"a": 2}, {"a":3}, {"a":4}]);
            expect(result).to.equal(false);
        });
    });
});