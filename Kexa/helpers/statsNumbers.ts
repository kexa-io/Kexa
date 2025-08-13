export function getMinMaxMeanMedian(array: Array<number>): MinMaxMeanMedian {
    if(array.length === 0) {
        return {
            "min": 0,
            "max": 0,
            "mean": 0,
            "median": 0,
        };
    }
    let max = array[0] || Number.MIN_VALUE;
    let min = array[0] || Number.MAX_VALUE;
    let sum = 0;
    for(const num of array){
        if(num < min) min = num;
        if(num > max) max = num;
        sum += num;
    }
    return {
        "min": min,
        "max": max,
        "mean": sum/array.length,
        "median": array[(array.length >= 2)?Math.floor(array.length/2):array[0]],
    }
}

export function convertToPercentage(num: number, total: number): number {
    return Math.round((num/total)*10000)/100;
}

export function convertMinMaxMeanMedianToPercentage(stat:MinMaxMeanMedian, total:number): MinMaxMeanMedian {
    return {
        "min": convertToPercentage(stat.min, total),
        "max": convertToPercentage(stat.max, total),
        "mean": convertToPercentage(stat.mean, total),
        "median": convertToPercentage(stat.median, total),
    }
}

export interface MinMaxMeanMedian {
    min: number,
    max: number,
    mean: number,
    median: number,
}