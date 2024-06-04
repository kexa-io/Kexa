import { ConditionEnum } from "../../enum/condition.enum";
import { RulesConditions } from "../../models/settingFile/conditions.models";
import { checkAll, checkCount, checkEndsWith, checkEqual, checkEqualDate, checkEqualThanDate, checkGreaterThan, checkGreaterThanDate, checkInclude, checkIncludeNS, checkInterval, checkIntervalDate, checkLessThan, checkLessThanDate, checkOne, checkRegex, checkSome, checkStartsWith, gatheringDistantRules, gatheringRules, generateDate } from "../../services/analyse.service";

const { expect } = require('chai');
const fs = require('fs');

function loadConfig(configPath: string): any {
    process.env.SPECIALCONFIG = configPath;
}

function unloadConfig(): void {
    delete process.env.SPECIALCONFIG;
}

describe('analyse service', () => {
    describe('Gathering rules', () => {
        it('should return a multiple rules', async () => {
            const result = await gatheringRules("./Kexa/__tests__/rules/test2", true);
            expect(result.length).to.be.above(1);
        });

        it('should return 0 rules', async () => {
            const result = await gatheringRules("./Kexa/__tests__/rules/test3");
            expect(result.length).to.equal(0);
        });

        //it('Gathering distant rules', async () => {
        //    fs.mkdirSync("./distantRules", { recursive: true });
        //    https://api.github.com/repos/4urcloud/Kexa_Rules/zipball/main
        //    await gatheringDistantRules("https://github.com/4urcloud/Kexa_Rules/zipball/main", "./distantRules");
        //    let rules = fs.readdirSync("./distantRules");
        //    expect(rules).to.be.an('array').that.is.not.empty;
        //    fs.rmSync("./distantRules", { recursive: true, force: true });
        //});

        describe('Format Rules with variables', () => {
            it('Rules with var value', async () => {
                loadConfig("./Kexa/__tests__/rules/var/test2/default.json");
                const result = await gatheringRules("./Kexa/__tests__/rules/var/test2");
                unloadConfig();
                expect(result[0]?.alert.global.conditions[0].min).to.equal(1);
            });

            it('Rules with var block', async () => {
                loadConfig("./Kexa/__tests__/rules/var/test3/default.json");
                const result = await gatheringRules("./Kexa/__tests__/rules/var/test3");
                unloadConfig();
                expect(result[0]?.alert.error.enabled).to.equal(true);
            });

            it('Rules with var block and value', async () => {
                loadConfig("./Kexa/__tests__/rules/var/test1/default.json");
                const result = await gatheringRules("./Kexa/__tests__/rules/var/test1");
                unloadConfig();
                expect(result[0]?.alert.error.enabled).to.equal(true);
                expect(result[0]?.alert.global.conditions[0].min).to.equal(1);
            });
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

            it("should return true (bigint)", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 1}, 2n);
                expect(result).to.equal(true);
            })

            it("should return false (bigint)", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 1}, 1n);
                expect(result).to.equal(false);
            })

            it("should return true (bigint) str", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 1}, 2n.toString());
                expect(result).to.equal(true);
            })

            it("should return false (bigint) str", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 1}, 1n.toString());
                expect(result).to.equal(false);
            })

            it("should return false", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 1}, 1);
                expect(result).to.equal(false);
            });

            it("should return true float", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 1}, 1.2);
                expect(result).to.equal(true);
            })

            it("should return false float", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 0.9}, 0.8);
                expect(result).to.equal(false);
            });

            it("should return true bigint", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 12345678998765431n}, 123456789987654332n);
                expect(result).to.equal(true);
            })

            it("should return false bigint", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.SUP, value: 123456789987654332n}, 12345678998765431n);
                expect(result).to.equal(false);
            });

            it("should return true str", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.INF, value: 11}, "12");
                expect(result).to.equal(true);
            });

            it("should return false str", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.INF, value: 23}, "adwada");
                expect(result).to.equal(false);
            });

            it("should return true str", () => {
                const result = checkGreaterThan({property: "date", condition: ConditionEnum.INF, value: -2}, "adwada");
                expect(result).to.equal(true);
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

            it("should return true (bigint)", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 1}, 0n);
                expect(result).to.equal(true);
            })

            it("should return false (bigint) str", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 1}, 1n.toString());
                expect(result).to.equal(false);
            })

            it("should return true (bigint) str", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 1}, 0n.toString());
                expect(result).to.equal(true);
            })

            it("should return false (bigint)", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 1}, 1n);
                expect(result).to.equal(false);
            })

            it("should return true float", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 0.9}, 0.8);
                expect(result).to.equal(true);
            });

            it("should return false float", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 0.8}, 0.9);
                expect(result).to.equal(false);
            });

            it("should return true bigint", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 123456789987654332n}, 12345678998765431n);
                expect(result).to.equal(true);
            });

            it("should return false bigint", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 12345678998765431n}, 123456789987654332n);
                expect(result).to.equal(false);
            });

            it("should return true str", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 23}, "12");
                expect(result).to.equal(true);
            });

            it("should return true str", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: 23}, "adwada");
                expect(result).to.equal(true);
            });

            it("should return false str", () => {
                const result = checkLessThan({property: "date", condition: ConditionEnum.INF, value: -2}, "adwada");
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