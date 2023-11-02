// Type definitions for @ag-grid-community/core v30.2.1
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { GridOptions } from '../entities/gridOptions';
import { GridApi } from '../gridApi';
export declare class ComponentUtil {
    static EVENTS: string[];
    /** Exclude the following internal events from code generation to prevent exposing these events via framework components */
    static EXCLUDED_INTERNAL_EVENTS: string[];
    /** EVENTS that should be exposed via code generation for the framework components.  */
    static PUBLIC_EVENTS: string[];
    static getCallbackForEvent(eventName: string): string;
    static EVENT_CALLBACKS: string[];
    static STRING_PROPERTIES: ("sideBar" | "tooltipTrigger" | "clipboardDelimiter" | "colResizeDefault" | "editType" | "quickFilterText" | "chartThemeOverrides" | "overlayLoadingTemplate" | "overlayNoRowsTemplate" | "pivotPanelShow" | "pivotColumnGroupTotals" | "pivotRowTotals" | "domLayout" | "groupDisplayType" | "rowGroupPanelShow" | "rowModelType" | "serverSideStoreType" | "serverSidePivotResultFieldSeparator" | "rowSelection" | "fillHandleDirection" | "multiSortKey" | "rowClass" | "gridId" | "treeDataDisplayType")[];
    static OBJECT_PROPERTIES: ("icons" | "onCellValueChanged" | "onCellClicked" | "onCellDoubleClicked" | "onCellContextMenu" | "rowDragText" | "sortingOrder" | "api" | "columnApi" | "context" | "statusBar" | "sideBar" | "popupParent" | "columnDefs" | "defaultColDef" | "defaultColGroupDef" | "columnTypes" | "dataTypeDefinitions" | "components" | "defaultCsvExportParams" | "defaultExcelExportParams" | "excelStyles" | "quickFilterParser" | "quickFilterMatcher" | "advancedFilterModel" | "advancedFilterParent" | "advancedFilterBuilderParams" | "chartThemes" | "customChartThemes" | "chartThemeOverrides" | "chartToolPanelsDef" | "loadingCellRenderer" | "loadingCellRendererParams" | "loadingCellRendererSelector" | "localeText" | "detailCellRenderer" | "detailCellRendererParams" | "alignedGrids" | "loadingOverlayComponent" | "loadingOverlayComponentParams" | "noRowsOverlayComponent" | "noRowsOverlayComponentParams" | "aggFuncs" | "fullWidthCellRenderer" | "fullWidthCellRendererParams" | "autoGroupColumnDef" | "groupRowRenderer" | "groupRowRendererParams" | "pinnedTopRowData" | "pinnedBottomRowData" | "rowData" | "datasource" | "serverSideDatasource" | "viewportDatasource" | "rowStyle" | "rowClassRules" | "getContextMenuItems" | "getMainMenuItems" | "postProcessPopup" | "processCellForClipboard" | "processHeaderForClipboard" | "processGroupHeaderForClipboard" | "processCellFromClipboard" | "sendToClipboard" | "processDataFromClipboard" | "isExternalFilterPresent" | "doesExternalFilterPass" | "getChartToolbarItems" | "createChartContainer" | "navigateToNextHeader" | "tabToNextHeader" | "navigateToNextCell" | "tabToNextCell" | "getLocaleText" | "getDocument" | "paginationNumberFormatter" | "getGroupRowAgg" | "isGroupOpenByDefault" | "initialGroupOrderComparator" | "processSecondaryColDef" | "processSecondaryColGroupDef" | "processPivotResultColDef" | "processPivotResultColGroupDef" | "getDataPath" | "getChildCount" | "getServerSideGroupLevelParams" | "getServerSideStoreParams" | "isServerSideGroupOpenByDefault" | "isApplyServerSideTransaction" | "isServerSideGroup" | "getServerSideGroupKey" | "getBusinessKeyForNode" | "getRowId" | "processRowPostCreate" | "isRowSelectable" | "isRowMaster" | "fillOperation" | "postSortRows" | "getRowStyle" | "getRowClass" | "getRowHeight" | "isFullWidthRow" | "onToolPanelVisibleChanged" | "onToolPanelSizeChanged" | "onCutStart" | "onCutEnd" | "onPasteStart" | "onPasteEnd" | "onColumnVisible" | "onColumnPinned" | "onColumnResized" | "onColumnMoved" | "onColumnValueChanged" | "onColumnPivotModeChanged" | "onColumnPivotChanged" | "onColumnGroupOpened" | "onNewColumnsLoaded" | "onGridColumnsChanged" | "onDisplayedColumnsChanged" | "onVirtualColumnsChanged" | "onColumnEverythingChanged" | "onComponentStateChanged" | "onCellEditRequest" | "onRowValueChanged" | "onCellEditingStarted" | "onCellEditingStopped" | "onRowEditingStarted" | "onRowEditingStopped" | "onUndoStarted" | "onUndoEnded" | "onRedoStarted" | "onRedoEnded" | "onRangeDeleteStart" | "onRangeDeleteEnd" | "onFilterOpened" | "onFilterChanged" | "onFilterModified" | "onAdvancedFilterBuilderVisibleChanged" | "onChartCreated" | "onChartRangeSelectionChanged" | "onChartOptionsChanged" | "onChartDestroyed" | "onCellKeyDown" | "onGridReady" | "onGridPreDestroyed" | "onFirstDataRendered" | "onGridSizeChanged" | "onModelUpdated" | "onVirtualRowRemoved" | "onViewportChanged" | "onBodyScroll" | "onBodyScrollEnd" | "onDragStarted" | "onDragStopped" | "onPaginationChanged" | "onRowDragEnter" | "onRowDragMove" | "onRowDragLeave" | "onRowDragEnd" | "onColumnRowGroupChanged" | "onRowGroupOpened" | "onExpandOrCollapseAll" | "onPinnedRowDataChanged" | "onRowDataChanged" | "onRowDataUpdated" | "onAsyncTransactionsFlushed" | "onStoreRefreshed" | "onCellFocused" | "onCellMouseOver" | "onCellMouseOut" | "onCellMouseDown" | "onRowClicked" | "onRowDoubleClicked" | "onRowSelected" | "onSelectionChanged" | "onRangeSelectionChanged" | "onTooltipShow" | "onTooltipHide" | "onSortChanged" | "onColumnRowGroupChangeRequest" | "onColumnPivotChangeRequest" | "onColumnValueChangeRequest" | "onColumnAggFuncChangeRequest")[];
    static ARRAY_PROPERTIES: ("sortingOrder" | "sideBar" | "columnDefs" | "components" | "excelStyles" | "chartThemes" | "chartThemeOverrides" | "alignedGrids" | "pinnedTopRowData" | "pinnedBottomRowData" | "rowData" | "rowClass")[];
    static NUMBER_PROPERTIES: ("tabIndex" | "tooltipShowDelay" | "tooltipHideDelay" | "headerHeight" | "groupHeaderHeight" | "floatingFiltersHeight" | "pivotHeaderHeight" | "pivotGroupHeaderHeight" | "autoSizePadding" | "undoRedoCellEditingLimit" | "chartThemeOverrides" | "keepDetailRowsCount" | "detailRowHeight" | "rowBuffer" | "paginationPageSize" | "pivotDefaultExpanded" | "cellFlashDelay" | "cellFadeDelay" | "groupDefaultExpanded" | "asyncTransactionWaitMillis" | "cacheOverflowSize" | "infiniteInitialRowCount" | "serverSideInitialRowCount" | "cacheBlockSize" | "maxBlocksInCache" | "maxConcurrentDatasourceRequests" | "blockLoadDebounceMillis" | "viewportRowModelPageSize" | "viewportRowModelBufferSize" | "scrollbarWidth" | "rowHeight")[];
    static BOOLEAN_PROPERTIES: ("singleClickEdit" | "enableCellChangeFlash" | "unSortIcon" | "suppressAutoSize" | "sideBar" | "suppressContextMenu" | "preventDefaultOnContextMenu" | "allowContextMenuWithControlKey" | "suppressMenuHide" | "enableBrowserTooltips" | "tooltipMouseTrack" | "tooltipInteraction" | "copyHeadersToClipboard" | "copyGroupHeadersToClipboard" | "suppressCopyRowsToClipboard" | "suppressCopySingleCellRanges" | "suppressLastEmptyLineOnPaste" | "suppressClipboardPaste" | "suppressClipboardApi" | "suppressCutToClipboard" | "maintainColumnOrder" | "suppressFieldDotNotation" | "allowDragFromColumnsToolPanel" | "suppressMovableColumns" | "suppressColumnMoveAnimation" | "suppressDragLeaveHidesColumns" | "suppressRowGroupHidesColumns" | "skipHeaderOnAutoSize" | "suppressReactUi" | "suppressClickEdit" | "readOnlyEdit" | "stopEditingWhenCellsLoseFocus" | "enterMovesDown" | "enterMovesDownAfterEdit" | "enterNavigatesVertically" | "enterNavigatesVerticallyAfterEdit" | "enableCellEditingOnBackspace" | "undoRedoCellEditing" | "suppressCsvExport" | "suppressExcelExport" | "cacheQuickFilter" | "excludeHiddenColumnsFromQuickFilter" | "includeHiddenColumnsInQuickFilter" | "excludeChildrenWhenTreeDataFiltering" | "enableAdvancedFilter" | "includeHiddenColumnsInAdvancedFilter" | "enableCharts" | "chartThemeOverrides" | "enableChartToolPanelsButton" | "suppressChartToolPanelsButton" | "masterDetail" | "keepDetailRows" | "detailRowAutoHeight" | "valueCache" | "valueCacheNeverExpires" | "enableCellExpressions" | "suppressParentsInRowNodes" | "suppressTouch" | "suppressFocusAfterRefresh" | "suppressAsyncEvents" | "suppressBrowserResizeObserver" | "suppressPropertyNamesCheck" | "suppressChangeDetection" | "debug" | "suppressLoadingOverlay" | "suppressNoRowsOverlay" | "pagination" | "paginationAutoPageSize" | "paginateChildRows" | "suppressPaginationPanel" | "pivotMode" | "pivotSuppressAutoColumn" | "suppressExpandablePivotGroups" | "functionsReadOnly" | "suppressAggFuncInHeader" | "alwaysAggregateAtRootLevel" | "suppressAggAtRootLevel" | "aggregateOnlyChangedColumns" | "suppressAggFilteredOnly" | "removePivotHeaderRowWhenSingleValueColumn" | "animateRows" | "allowShowChangeAfterFilter" | "ensureDomOrder" | "enableRtl" | "suppressColumnVirtualisation" | "suppressMaxRenderedRowRestriction" | "suppressRowVirtualisation" | "rowDragManaged" | "suppressRowDrag" | "suppressMoveWhenRowDragging" | "rowDragEntireRow" | "rowDragMultiRow" | "embedFullWidthRows" | "groupMaintainOrder" | "groupSelectsChildren" | "groupAggFiltering" | "groupIncludeFooter" | "groupIncludeTotalFooter" | "groupSuppressBlankHeader" | "groupSelectsFiltered" | "showOpenedGroup" | "groupRemoveSingleChildren" | "groupRemoveLowestSingleChildren" | "groupHideOpenParents" | "groupAllowUnbalanced" | "suppressMakeColumnVisibleAfterUnGroup" | "treeData" | "rowGroupPanelSuppressSort" | "suppressGroupRowsSticky" | "rememberGroupStateWhenNewData" | "suppressModelUpdateAfterUpdateTransaction" | "suppressServerSideInfiniteScroll" | "purgeClosedRowNodes" | "serverSideSortAllLevels" | "serverSideOnlyRefreshFilteredGroups" | "serverSideFilterAllLevels" | "serverSideSortOnServer" | "serverSideFilterOnServer" | "serverSideSortingAlwaysResets" | "serverSideFilteringAlwaysResets" | "alwaysShowHorizontalScroll" | "alwaysShowVerticalScroll" | "debounceVerticalScrollbar" | "suppressHorizontalScroll" | "suppressScrollOnNewData" | "suppressScrollWhenPopupsAreOpen" | "suppressAnimationFrame" | "suppressMiddleClickScrolls" | "suppressPreventDefaultOnMouseWheel" | "rowMultiSelectWithClick" | "suppressRowDeselection" | "suppressRowClickSelection" | "suppressCellFocus" | "suppressMultiRangeSelection" | "enableCellTextSelection" | "enableRangeSelection" | "enableRangeHandle" | "enableFillHandle" | "suppressClearOnFillReduction" | "accentedSort" | "suppressMultiSort" | "alwaysMultiSort" | "suppressMaintainUnsortedOrder" | "suppressRowHoverHighlight" | "suppressRowTransform" | "columnHoverHighlight" | "deltaSort" | "functionsPassive" | "enableGroupEdit" | "resetRowDataOnUpdate")[];
    static FUNCTION_PROPERTIES: (keyof GridOptions<any>)[];
    static ALL_PROPERTIES: (keyof GridOptions<any>)[];
    static ALL_PROPERTIES_SET: Set<keyof GridOptions<any>>;
    private static changeSetId;
    private static getCoercionLookup;
    private static coercionLookup;
    private static getValue;
    private static getGridOptionKeys;
    static copyAttributesToGridOptions(gridOptions: GridOptions | undefined, component: any, isVue?: boolean): GridOptions;
    static processOnChange(changes: any, api: GridApi): void;
    static toBoolean(value: any): boolean;
    static toNumber(value: any): number | undefined;
}
