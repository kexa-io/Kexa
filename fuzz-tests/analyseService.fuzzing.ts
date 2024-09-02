import  { RulesConditions } from "../Kexa/models/settingFile/conditions.models";
import { ConditionEnum } from "../Kexa/enum/condition.enum";


type AnalyseServiceFunction = (rules: RulesConditions, value: any) => any;

function getFuzzString(fuzzData: Buffer) {
	return fuzzData.toString();
}

function getFuzzNumber(fuzzData: Buffer) {
	return fuzzData.readInt32LE(0);
}

function getFuzzDate(fuzzData: Buffer) {
	return fuzzData.toString();
}

function generateCronExpressionFromFuzzData(fuzzData: Buffer): string {
    // Example: Convert the first few bytes of fuzzData into cron components.
    
    const minute = fuzzData.readUInt8(0) % 60;
    const hour = fuzzData.readUInt8(1) % 24;
    const dayOfMonth = fuzzData.readUInt8(2) % 31 + 1;
    const month = fuzzData.readUInt8(3) % 12 + 1;
    const dayOfWeek = fuzzData.readUInt8(2) % 7;

    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

export async function fuzz(fuzzData: Buffer) {
 	fuzzString(getFuzzString(fuzzData));
	if (fuzzData.length >= 4) {
		fuzzNumber(getFuzzNumber(fuzzData));
		fuzzDate(generateCronExpressionFromFuzzData(fuzzData));
	}
}
	
async function fuzzDate(fuzzDate: string) {
	const analyseService = await import('../Kexa/services/analyse.service');
	

	const functionsToTest: Array<keyof typeof analyseService> = [
		'checkEqualDate',
		'checkGreaterThanDate',
		'checkGreaterThanDateOrEqual',
		'checkLessThanDate',
		'checkLessThanDateOrEqual',
//		'checkIntervalDate'
	];

	const rulesConditions: RulesConditions = {
		property: 'name',
		condition: ConditionEnum.EQUAL,
		value: fuzzDate.toString(), // 0 0 0 0 0 0
		date: 'YYYY-MM-DD' // format
	};

		for (const functionName of functionsToTest) {
			try {
				const func = analyseService[functionName];
				await (func as AnalyseServiceFunction)(rulesConditions, rulesConditions.date);
			} catch (error) {
				//console.warn(`Error in function ${functionName}:`, error);
			}
		}
}

async function fuzzNumber(fuzzData: number) {
	const analyseService = await import('../Kexa/services/analyse.service');

	const functionsToTest: Array<keyof typeof analyseService> = [
		'checkEqual',
		'checkGreaterThan',
		'checkLessThan'
	];

	const rulesConditions: RulesConditions = {
		property: 'name',
		condition: ConditionEnum.EQUAL,
		value: fuzzData,
        date: undefined
	};

		for (const functionName of functionsToTest) {	
			try {
				const func = analyseService[functionName];
				await (func as AnalyseServiceFunction)(rulesConditions, fuzzData);
			} catch (error) {
				console.warn(`Error in function ${functionName}:`, error);
			}
		}
}

async function fuzzString(fuzzData: string) {
	const analyseService = await import('../Kexa/services/analyse.service');
    
	type AnalyseServiceFunction = (rules: RulesConditions, value: string) => any;

    const functionsToTest: Array<keyof typeof analyseService> = [
        'checkEqual',
        'checkGreaterThan',
        'checkLessThan',
		'checkStartsWith',
		'checkEndsWith',
		'checkInclude',
		'checkIncludeNS',
		'checkRegex'
    ];

    const rulesConditions: RulesConditions = {
        property: 'name',
        condition: ConditionEnum.EQUAL,
        value: fuzzData.toString(),
        date: undefined
    };

        for (const functionName of functionsToTest) {
			if (functionName === 'checkRegex') {
				rulesConditions.value = "/" + fuzzData.toString() + "/";
			}
            try {
                const func = analyseService[functionName];
                await (func as AnalyseServiceFunction)(rulesConditions, fuzzData.toString());
            } catch (error) {
                // console.warn(`Error in function ${functionName}:`, error);
            }
        }
}
