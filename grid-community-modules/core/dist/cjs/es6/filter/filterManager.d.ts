// Type definitions for @ag-grid-community/core v30.2.1
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { AgPromise } from '../utils';
import { RowNode } from '../entities/rowNode';
import { Column } from '../entities/column';
import { ColumnEventType, FilterChangedEventSourceType } from '../events';
import { IFilterComp, IFilter, IFilterParams } from '../interfaces/iFilter';
import { ColDef } from '../entities/colDef';
import { UserCompDetails } from '../components/framework/userComponentFactory';
import { BeanStub } from '../context/beanStub';
import { AdvancedFilterModel } from '../interfaces/advancedFilterModel';
export declare type FilterRequestSource = 'COLUMN_MENU' | 'TOOLBAR' | 'NO_UI';
export declare class FilterManager extends BeanStub {
    private valueService;
    private columnModel;
    private rowModel;
    private userComponentFactory;
    private rowRenderer;
    private dataTypeService;
    private quickFilterService;
    private advancedFilterService;
    private allColumnFilters;
    private allColumnListeners;
    private activeAggregateFilters;
    private activeColumnFilters;
    private processingFilterChange;
    private allowShowChangeAfterFilter;
    private externalFilterPresent;
    private aggFiltering;
    private filterModelUpdateQueue;
    init(): void;
    private isExternalFilterPresentCallback;
    private doesExternalFilterPass;
    setFilterModel(model: {
        [key: string]: any;
    }): void;
    private setModelOnFilterWrapper;
    getFilterModel(): {
        [key: string]: any;
    };
    isColumnFilterPresent(): boolean;
    isAggregateFilterPresent(): boolean;
    isExternalFilterPresent(): boolean;
    isChildFilterPresent(): boolean;
    private isAdvancedFilterPresent;
    private onAdvancedFilterEnabledChanged;
    isAdvancedFilterEnabled(): boolean;
    isAdvancedFilterHeaderActive(): boolean;
    private doAggregateFiltersPass;
    private updateActiveFilters;
    private updateFilterFlagInColumns;
    isAnyFilterPresent(): boolean;
    private doColumnFiltersPass;
    resetQuickFilterCache(): void;
    private refreshFiltersForAggregations;
    callOnFilterChangedOutsideRenderCycle(params: {
        source?: FilterChangedEventSourceType;
        filterInstance?: IFilterComp;
        additionalEventAttributes?: any;
        columns?: Column[];
    }): void;
    onFilterChanged(params?: {
        source?: FilterChangedEventSourceType;
        filterInstance?: IFilterComp;
        additionalEventAttributes?: any;
        columns?: Column[];
    }): void;
    isSuppressFlashingCellsBecauseFiltering(): boolean;
    isQuickFilterPresent(): boolean;
    private updateAggFiltering;
    isAggregateQuickFilterPresent(): boolean;
    private isNonAggregateQuickFilterPresent;
    doesRowPassOtherFilters(filterToSkip: IFilterComp, node: any): boolean;
    doesRowPassAggregateFilters(params: {
        rowNode: RowNode;
        filterInstanceToSkip?: IFilterComp;
    }): boolean;
    doesRowPassFilter(params: {
        rowNode: RowNode;
        filterInstanceToSkip?: IFilterComp;
    }): boolean;
    onNewRowsLoaded(source: ColumnEventType): void;
    private createValueGetter;
    getFilterComponent(column: Column, source: FilterRequestSource, createIfDoesNotExist?: boolean): AgPromise<IFilterComp> | null;
    isFilterActive(column: Column): boolean;
    getOrCreateFilterWrapper(column: Column, source: FilterRequestSource): FilterWrapper | null;
    cachedFilter(column: Column): FilterWrapper | undefined;
    private getDefaultFilter;
    getDefaultFloatingFilter(column: Column): string;
    private createFilterInstance;
    createFilterParams(column: Column, colDef: ColDef): IFilterParams;
    private createFilterWrapper;
    private putIntoGui;
    private onColumnsChanged;
    private updateDependantFilters;
    isFilterAllowed(column: Column): boolean;
    getFloatingFilterCompDetails(column: Column, showParentFilter: () => void): UserCompDetails | undefined;
    getCurrentFloatingFilterParentModel(column: Column): any;
    destroyFilter(column: Column, source?: 'api' | 'columnChanged'): void;
    private disposeColumnListener;
    private disposeFilterWrapper;
    private checkDestroyFilter;
    areFilterCompsDifferent(oldCompDetails: UserCompDetails | null, newCompDetails: UserCompDetails | null): boolean;
    getAdvancedFilterModel(): AdvancedFilterModel | null;
    setAdvancedFilterModel(expression: AdvancedFilterModel | null | undefined): void;
    showAdvancedFilterBuilder(source: 'api' | 'ui'): void;
    private updateAdvancedFilterColumns;
    hasFloatingFilters(): boolean;
    getFilterInstance<TFilter extends IFilter>(key: string | Column, callback?: (filter: TFilter | null) => void): TFilter | null | undefined;
    private getFilterInstanceImpl;
    private warnAdvancedFilters;
    setupAdvancedFilterHeaderComp(eCompToInsertBefore: HTMLElement): void;
    getHeaderRowCount(): number;
    getHeaderHeight(): number;
    private processFilterModelUpdateQueue;
    protected destroy(): void;
}
export interface FilterWrapper {
    compiledElement: any;
    column: Column;
    filterPromise: AgPromise<IFilterComp> | null;
    guiPromise: AgPromise<HTMLElement | null>;
    compDetails: UserCompDetails | null;
}
