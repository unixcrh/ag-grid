import {
    Bean,
    BeanStub,
    Column,
    IAggFunc,
    IAggFuncParams,
    IAggFuncService,
    _exists,
    _existsAndNotEmpty,
    _includes,
    _iterateObject,
    _last,
} from '@ag-grid-community/core';

const defaultAggFuncNames: { [key: string]: string } = {
    sum: 'Sum',
    first: 'First',
    last: 'Last',
    min: 'Min',
    max: 'Max',
    count: 'Count',
    avg: 'Average',
};

@Bean('aggFuncService')
export class AggFuncService extends BeanStub implements IAggFuncService {
    private static AGG_SUM = 'sum';
    private static AGG_FIRST = 'first';
    private static AGG_LAST = 'last';
    private static AGG_MIN = 'min';
    private static AGG_MAX = 'max';
    private static AGG_COUNT = 'count';
    private static AGG_AVG = 'avg';

    private aggFuncsMap: { [key: string]: IAggFunc } = {};
    private initialised = false;

    public override postConstruct(): void {
        super.postConstruct();
        this.init();
    }

    private init() {
        if (this.initialised) {
            return;
        }

        this.initialiseWithDefaultAggregations();
        this.addAggFuncs(this.gos.get('aggFuncs'));
    }

    private initialiseWithDefaultAggregations(): void {
        this.aggFuncsMap[AggFuncService.AGG_SUM] = aggSum;
        this.aggFuncsMap[AggFuncService.AGG_FIRST] = aggFirst;
        this.aggFuncsMap[AggFuncService.AGG_LAST] = aggLast;
        this.aggFuncsMap[AggFuncService.AGG_MIN] = aggMin;
        this.aggFuncsMap[AggFuncService.AGG_MAX] = aggMax;
        this.aggFuncsMap[AggFuncService.AGG_COUNT] = aggCount;
        this.aggFuncsMap[AggFuncService.AGG_AVG] = aggAvg;
        this.initialised = true;
    }

    private isAggFuncPossible(column: Column, func: string): boolean {
        const allKeys = this.getFuncNames(column);
        const allowed = _includes(allKeys, func);
        const funcExists = _exists(this.aggFuncsMap[func]);
        return allowed && funcExists;
    }

    public getDefaultFuncLabel(fctName: string): string {
        return defaultAggFuncNames[fctName] ?? fctName;
    }

    public getDefaultAggFunc(column: Column): string | null {
        const defaultAgg = column.getColDef().defaultAggFunc;

        if (_exists(defaultAgg) && this.isAggFuncPossible(column, defaultAgg)) {
            return defaultAgg;
        }

        if (this.isAggFuncPossible(column, AggFuncService.AGG_SUM)) {
            return AggFuncService.AGG_SUM;
        }

        const allKeys = this.getFuncNames(column);
        return _existsAndNotEmpty(allKeys) ? allKeys[0] : null;
    }

    public addAggFuncs(aggFuncs?: { [key: string]: IAggFunc }): void {
        this.init();
        _iterateObject(aggFuncs, (key: string, aggFunc: IAggFunc) => {
            this.aggFuncsMap[key] = aggFunc;
        });
    }

    public getAggFunc(name: string): IAggFunc {
        this.init();
        return this.aggFuncsMap[name];
    }

    public getFuncNames(column: Column): string[] {
        const userAllowedFuncs = column.getColDef().allowedAggFuncs;

        return userAllowedFuncs == null ? Object.keys(this.aggFuncsMap).sort() : userAllowedFuncs;
    }

    public clear(): void {
        this.aggFuncsMap = {};
    }
}

function aggSum(params: IAggFuncParams): number | bigint {
    const { values } = params;
    let result: any = null; // the logic ensures that we never combine bigint arithmetic with numbers, but TS is hard to please

    // for optimum performance, we use a for loop here rather than calling any helper methods or using functional code
    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if (typeof value === 'number') {
            if (result === null) {
                result = value;
            } else {
                result += typeof result === 'number' ? value : BigInt(value);
            }
        } else if (typeof value === 'bigint') {
            if (result === null) {
                result = value;
            } else {
                result = (typeof result === 'bigint' ? result : BigInt(result)) + value;
            }
        }
    }

    return result;
}

function aggFirst(params: IAggFuncParams): any {
    return params.values.length > 0 ? params.values[0] : null;
}

function aggLast(params: IAggFuncParams): any {
    return params.values.length > 0 ? _last(params.values) : null;
}

function aggMin(params: IAggFuncParams): number | bigint | null {
    const { values } = params;
    let result: number | bigint | null = null;

    // for optimum performance, we use a for loop here rather than calling any helper methods or using functional code
    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if ((typeof value === 'number' || typeof value === 'bigint') && (result === null || result > value)) {
            result = value;
        }
    }

    return result;
}

function aggMax(params: IAggFuncParams): number | bigint | null {
    const { values } = params;
    let result: number | bigint | null = null;

    // for optimum performance, we use a for loop here rather than calling any helper methods or using functional code
    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if ((typeof value === 'number' || typeof value === 'bigint') && (result === null || result < value)) {
            result = value;
        }
    }

    return result;
}

function aggCount(params: IAggFuncParams) {
    const { values } = params;
    let result = 0;

    // for optimum performance, we use a for loop here rather than calling any helper methods or using functional code
    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        // check if the value is from a group, in which case use the group's count
        result += value != null && typeof value.value === 'number' ? value.value : 1;
    }

    // the previous aggregation data
    const existingAggData = params.rowNode?.aggData?.[params.column.getColId()];
    if (existingAggData && existingAggData.value === result) {
        // the underlying values haven't changed, return the old object to avoid triggering change detection
        return existingAggData;
    }

    // it's important to wrap it in the object so we can determine if this is a group level
    return {
        value: result,
        toString: function () {
            return this.value.toString();
        },
        // used for sorting
        toNumber: function () {
            return this.value;
        },
    };
}

// the average function is tricky as the multiple levels require weighted averages
// for the non-leaf node aggregations.
function aggAvg(params: IAggFuncParams): {
    value: number | bigint | null;
    count: number;
    toString(): string;
    toNumber(): number;
} {
    const { values } = params;
    let sum: any = 0; // the logic ensures that we never combine bigint arithmetic with numbers, but TS is hard to please
    let count = 0;

    // for optimum performance, we use a for loop here rather than calling any helper methods or using functional code
    for (let i = 0; i < values.length; i++) {
        const currentValue = values[i];
        let valueToAdd = null;

        if (typeof currentValue === 'number' || typeof currentValue === 'bigint') {
            valueToAdd = currentValue;
            count++;
        } else if (
            currentValue != null &&
            (typeof currentValue.value === 'number' || typeof currentValue.value === 'bigint') &&
            typeof currentValue.count === 'number'
        ) {
            // we are aggregating groups, so we take the aggregated values to calculated a weighted average
            valueToAdd =
                currentValue.value *
                (typeof currentValue.value === 'number' ? currentValue.count : BigInt(currentValue.count));
            count += currentValue.count;
        }

        if (typeof valueToAdd === 'number') {
            sum += typeof sum === 'number' ? valueToAdd : BigInt(valueToAdd);
        } else if (typeof valueToAdd === 'bigint') {
            sum = (typeof sum === 'bigint' ? sum : BigInt(sum)) + valueToAdd;
        }
    }

    let value = null;

    // avoid divide by zero error
    if (count > 0) {
        value = sum / ((typeof sum === 'number' ? count : BigInt(count)) as any);
    }

    // the previous aggregation data
    const existingAggData = params.rowNode?.aggData?.[params.column?.getColId()];
    if (existingAggData && existingAggData.count === count && existingAggData.value === value) {
        // the underlying values haven't changed, return the old object to avoid triggering change detection
        return existingAggData;
    }

    // the result will be an object. when this cell is rendered, only the avg is shown.
    // however when this cell is part of another aggregation, the count is also needed
    // to create a weighted average for the next level.
    return {
        count,
        value,
        // the grid by default uses toString to render values for an object, so this
        // is a trick to get the default cellRenderer to display the avg value
        toString: function () {
            return typeof this.value === 'number' || typeof this.value === 'bigint' ? this.value.toString() : '';
        },
        // used for sorting
        toNumber: function () {
            return this.value;
        },
    };
}
