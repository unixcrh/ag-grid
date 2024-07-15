// enterprise-modules/column-tool-panel/src/columnsToolPanelModule.ts
import { ModuleNames as ModuleNames2 } from "@ag-grid-community/core";
import { AgMenuItemRenderer, EnterpriseCoreModule } from "@ag-grid-enterprise/core";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SideBarModule } from "@ag-grid-enterprise/side-bar";

// enterprise-modules/column-tool-panel/src/columnToolPanel/columnToolPanel.ts
import { Component as Component8, ModuleNames, ModuleRegistry, _clearElement, _last } from "@ag-grid-community/core";
import { PivotDropZonePanel, RowGroupDropZonePanel, ValuesDropZonePanel } from "@ag-grid-enterprise/row-grouping";

// enterprise-modules/column-tool-panel/src/columnToolPanel/agPrimaryCols.ts
import { Component as Component6, PositionableFeature, RefPlaceholder as RefPlaceholder4 } from "@ag-grid-community/core";

// enterprise-modules/column-tool-panel/src/columnToolPanel/agPrimaryColsHeader.ts
import {
  AgCheckboxSelector,
  AgInputTextFieldSelector,
  Component,
  KeyCode,
  RefPlaceholder,
  _createIconNoSpan,
  _debounce,
  _setDisplayed
} from "@ag-grid-community/core";
var DEBOUNCE_DELAY = 300;
var AgPrimaryColsHeader = class extends Component {
  constructor() {
    super(
      /* html */
      `<div class="ag-column-select-header" role="presentation">
            <div data-ref="eExpand" class="ag-column-select-header-icon"></div>
            <ag-checkbox data-ref="eSelect" class="ag-column-select-header-checkbox"></ag-checkbox>
            <ag-input-text-field class="ag-column-select-header-filter-wrapper" data-ref="eFilterTextField"></ag-input-text-field>
        </div>`,
      [AgCheckboxSelector, AgInputTextFieldSelector]
    );
    this.eExpand = RefPlaceholder;
    this.eSelect = RefPlaceholder;
    this.eFilterTextField = RefPlaceholder;
  }
  wireBeans(beans) {
    this.columnModel = beans.columnModel;
  }
  postConstruct() {
    this.createExpandIcons();
    this.addManagedListeners(this.eExpand, {
      click: this.onExpandClicked.bind(this),
      keydown: (e) => {
        if (e.key === KeyCode.SPACE) {
          e.preventDefault();
          this.onExpandClicked();
        }
      }
    });
    this.addManagedElementListeners(this.eSelect.getInputElement(), { click: this.onSelectClicked.bind(this) });
    this.addManagedPropertyListener("functionsReadOnly", () => this.onFunctionsReadOnlyPropChanged());
    this.eFilterTextField.setAutoComplete(false).onValueChange(() => this.onFilterTextChanged());
    this.addManagedElementListeners(this.eFilterTextField.getInputElement(), {
      keydown: this.onMiniFilterKeyDown.bind(this)
    });
    this.addManagedEventListeners({ newColumnsLoaded: this.showOrHideOptions.bind(this) });
    const translate = this.localeService.getLocaleTextFunc();
    this.eSelect.setInputAriaLabel(translate("ariaColumnSelectAll", "Toggle Select All Columns"));
    this.eFilterTextField.setInputAriaLabel(translate("ariaFilterColumnsInput", "Filter Columns Input"));
    this.activateTabIndex([this.eExpand]);
  }
  onFunctionsReadOnlyPropChanged() {
    const readOnly = this.gos.get("functionsReadOnly");
    this.eSelect.setReadOnly(readOnly);
    this.eSelect.addOrRemoveCssClass("ag-column-select-column-readonly", readOnly);
  }
  init(params) {
    this.params = params;
    const readOnly = this.gos.get("functionsReadOnly");
    this.eSelect.setReadOnly(readOnly);
    this.eSelect.addOrRemoveCssClass("ag-column-select-column-readonly", readOnly);
    if (this.columnModel.isReady()) {
      this.showOrHideOptions();
    }
  }
  createExpandIcons() {
    this.eExpand.appendChild(this.eExpandChecked = _createIconNoSpan("columnSelectOpen", this.gos));
    this.eExpand.appendChild(this.eExpandUnchecked = _createIconNoSpan("columnSelectClosed", this.gos));
    this.eExpand.appendChild(
      this.eExpandIndeterminate = _createIconNoSpan("columnSelectIndeterminate", this.gos)
    );
    this.setExpandState(0 /* EXPANDED */);
  }
  // we only show expand / collapse if we are showing columns
  showOrHideOptions() {
    const showFilter = !this.params.suppressColumnFilter;
    const showSelect = !this.params.suppressColumnSelectAll;
    const showExpand = !this.params.suppressColumnExpandAll;
    const groupsPresent = this.columnModel.isProvidedColGroupsPresent();
    const translate = this.localeService.getLocaleTextFunc();
    this.eFilterTextField.setInputPlaceholder(translate("searchOoo", "Search..."));
    _setDisplayed(this.eFilterTextField.getGui(), showFilter);
    _setDisplayed(this.eSelect.getGui(), showSelect);
    _setDisplayed(this.eExpand, showExpand && groupsPresent);
  }
  onFilterTextChanged() {
    if (!this.onFilterTextChangedDebounced) {
      this.onFilterTextChangedDebounced = _debounce(() => {
        const filterText = this.eFilterTextField.getValue();
        this.dispatchLocalEvent({ type: "filterChanged", filterText });
      }, DEBOUNCE_DELAY);
    }
    this.onFilterTextChangedDebounced();
  }
  onMiniFilterKeyDown(e) {
    if (e.key === KeyCode.ENTER) {
      setTimeout(() => this.onSelectClicked(), DEBOUNCE_DELAY);
    }
  }
  onSelectClicked() {
    this.dispatchLocalEvent({ type: this.selectState ? "unselectAll" : "selectAll" });
  }
  onExpandClicked() {
    this.dispatchLocalEvent({ type: this.expandState === 0 /* EXPANDED */ ? "collapseAll" : "expandAll" });
  }
  setExpandState(state) {
    this.expandState = state;
    _setDisplayed(this.eExpandChecked, this.expandState === 0 /* EXPANDED */);
    _setDisplayed(this.eExpandUnchecked, this.expandState === 1 /* COLLAPSED */);
    _setDisplayed(this.eExpandIndeterminate, this.expandState === 2 /* INDETERMINATE */);
  }
  setSelectionState(state) {
    this.selectState = state;
    this.eSelect.setValue(this.selectState);
  }
};
var AgPrimaryColsHeaderSelector = {
  selector: "AG-PRIMARY-COLS-HEADER",
  component: AgPrimaryColsHeader
};

// enterprise-modules/column-tool-panel/src/columnToolPanel/agPrimaryColsList.ts
import {
  Component as Component5,
  _exists,
  _includes,
  _setAriaLabel as _setAriaLabel3,
  _setAriaLevel,
  _warnOnce as _warnOnce2,
  isProvidedColumnGroup as isProvidedColumnGroup3
} from "@ag-grid-community/core";
import { VirtualList } from "@ag-grid-enterprise/core";

// enterprise-modules/column-tool-panel/src/columnToolPanel/columnModelItem.ts
import { LocalEventService } from "@ag-grid-community/core";
var ColumnModelItem = class {
  constructor(displayName, columnOrGroup, dept, group = false, expanded) {
    this.localEventService = new LocalEventService();
    this.displayName = displayName;
    this.dept = dept;
    this.group = group;
    if (group) {
      this.columnGroup = columnOrGroup;
      this.expanded = expanded;
      this.children = [];
    } else {
      this.column = columnOrGroup;
    }
  }
  isGroup() {
    return this.group;
  }
  getDisplayName() {
    return this.displayName;
  }
  getColumnGroup() {
    return this.columnGroup;
  }
  getColumn() {
    return this.column;
  }
  getDept() {
    return this.dept;
  }
  isExpanded() {
    return !!this.expanded;
  }
  getChildren() {
    return this.children;
  }
  isPassesFilter() {
    return this.passesFilter;
  }
  setExpanded(expanded) {
    if (expanded === this.expanded) {
      return;
    }
    this.expanded = expanded;
    this.localEventService.dispatchEvent({ type: "expandedChanged" });
  }
  setPassesFilter(passesFilter) {
    this.passesFilter = passesFilter;
  }
  addEventListener(eventType, listener) {
    this.localEventService.addEventListener(eventType, listener);
  }
  removeEventListener(eventType, listener) {
    this.localEventService.removeEventListener(eventType, listener);
  }
};

// enterprise-modules/column-tool-panel/src/columnToolPanel/primaryColsListPanelItemDragFeature.ts
import { BeanStub, DragSourceType as DragSourceType2, isProvidedColumnGroup as isProvidedColumnGroup2 } from "@ag-grid-community/core";
import { VirtualListDragFeature } from "@ag-grid-enterprise/core";

// enterprise-modules/column-tool-panel/src/columnToolPanel/toolPanelColumnGroupComp.ts
import {
  AgCheckboxSelector as AgCheckboxSelector2,
  Component as Component3,
  DragSourceType,
  KeyCode as KeyCode2,
  RefPlaceholder as RefPlaceholder2,
  TouchListener,
  _createIcon,
  _createIconNoSpan as _createIconNoSpan3,
  _getToolPanelClassesFromColDef,
  _setAriaDescribedBy,
  _setAriaExpanded,
  _setAriaLabel,
  _setDisplayed as _setDisplayed2
} from "@ag-grid-community/core";

// enterprise-modules/column-tool-panel/src/columnToolPanel/toolPanelContextMenu.ts
import { Component as Component2, _createIconNoSpan as _createIconNoSpan2, isColumn, isProvidedColumnGroup } from "@ag-grid-community/core";
import { AgMenuList } from "@ag-grid-enterprise/core";
var ToolPanelContextMenu = class extends Component2 {
  constructor(column, mouseEvent, parentEl) {
    super(
      /* html */
      `<div class="ag-menu"></div>`
    );
    this.column = column;
    this.mouseEvent = mouseEvent;
    this.parentEl = parentEl;
    this.displayName = null;
  }
  wireBeans(beans) {
    this.columnModel = beans.columnModel;
    this.columnNameService = beans.columnNameService;
    this.funcColsService = beans.funcColsService;
    this.popupService = beans.popupService;
    this.focusService = beans.focusService;
  }
  postConstruct() {
    this.initializeProperties(this.column);
    this.buildMenuItemMap();
    if (isColumn(this.column)) {
      this.displayName = this.columnNameService.getDisplayNameForColumn(this.column, "columnToolPanel");
    } else {
      this.displayName = this.columnNameService.getDisplayNameForProvidedColumnGroup(
        null,
        this.column,
        "columnToolPanel"
      );
    }
    if (this.isActive()) {
      this.mouseEvent.preventDefault();
      const menuItemsMapped = this.getMappedMenuItems();
      if (menuItemsMapped.length === 0) {
        return;
      }
      this.displayContextMenu(menuItemsMapped);
    }
  }
  initializeProperties(column) {
    if (isProvidedColumnGroup(column)) {
      this.columns = column.getLeafColumns();
    } else {
      this.columns = [column];
    }
    this.allowGrouping = this.columns.some((col) => col.isPrimary() && col.isAllowRowGroup());
    this.allowValues = this.columns.some((col) => col.isPrimary() && col.isAllowValue());
    this.allowPivoting = this.columnModel.isPivotMode() && this.columns.some((col) => col.isPrimary() && col.isAllowPivot());
  }
  buildMenuItemMap() {
    const localeTextFunc = this.localeService.getLocaleTextFunc();
    this.menuItemMap = /* @__PURE__ */ new Map();
    this.menuItemMap.set("rowGroup", {
      allowedFunction: (col) => col.isPrimary() && col.isAllowRowGroup() && !this.columnModel.isColGroupLocked(col),
      activeFunction: (col) => col.isRowGroupActive(),
      activateLabel: () => `${localeTextFunc("groupBy", "Group by")} ${this.displayName}`,
      deactivateLabel: () => `${localeTextFunc("ungroupBy", "Un-Group by")} ${this.displayName}`,
      activateFunction: () => {
        const groupedColumns = this.funcColsService.getRowGroupColumns();
        this.funcColsService.setRowGroupColumns(this.addColumnsToList(groupedColumns), "toolPanelUi");
      },
      deActivateFunction: () => {
        const groupedColumns = this.funcColsService.getRowGroupColumns();
        this.funcColsService.setRowGroupColumns(this.removeColumnsFromList(groupedColumns), "toolPanelUi");
      },
      addIcon: "menuAddRowGroup",
      removeIcon: "menuRemoveRowGroup"
    });
    this.menuItemMap.set("value", {
      allowedFunction: (col) => col.isPrimary() && col.isAllowValue(),
      activeFunction: (col) => col.isValueActive(),
      activateLabel: () => localeTextFunc("addToValues", `Add ${this.displayName} to values`, [this.displayName]),
      deactivateLabel: () => localeTextFunc("removeFromValues", `Remove ${this.displayName} from values`, [this.displayName]),
      activateFunction: () => {
        const valueColumns = this.funcColsService.getValueColumns();
        this.funcColsService.setValueColumns(this.addColumnsToList(valueColumns), "toolPanelUi");
      },
      deActivateFunction: () => {
        const valueColumns = this.funcColsService.getValueColumns();
        this.funcColsService.setValueColumns(this.removeColumnsFromList(valueColumns), "toolPanelUi");
      },
      addIcon: "valuePanel",
      removeIcon: "valuePanel"
    });
    this.menuItemMap.set("pivot", {
      allowedFunction: (col) => this.columnModel.isPivotMode() && col.isPrimary() && col.isAllowPivot(),
      activeFunction: (col) => col.isPivotActive(),
      activateLabel: () => localeTextFunc("addToLabels", `Add ${this.displayName} to labels`, [this.displayName]),
      deactivateLabel: () => localeTextFunc("removeFromLabels", `Remove ${this.displayName} from labels`, [this.displayName]),
      activateFunction: () => {
        const pivotColumns = this.funcColsService.getPivotColumns();
        this.funcColsService.setPivotColumns(this.addColumnsToList(pivotColumns), "toolPanelUi");
      },
      deActivateFunction: () => {
        const pivotColumns = this.funcColsService.getPivotColumns();
        this.funcColsService.setPivotColumns(this.removeColumnsFromList(pivotColumns), "toolPanelUi");
      },
      addIcon: "pivotPanel",
      removeIcon: "pivotPanel"
    });
  }
  addColumnsToList(columnList) {
    return [...columnList].concat(this.columns.filter((col) => columnList.indexOf(col) === -1));
  }
  removeColumnsFromList(columnList) {
    return columnList.filter((col) => this.columns.indexOf(col) === -1);
  }
  displayContextMenu(menuItemsMapped) {
    const eGui = this.getGui();
    const menuList = this.createBean(new AgMenuList());
    const localeTextFunc = this.localeService.getLocaleTextFunc();
    let hideFunc = () => {
    };
    eGui.appendChild(menuList.getGui());
    menuList.addMenuItems(menuItemsMapped);
    menuList.addManagedListeners(menuList, {
      closeMenu: () => {
        this.parentEl.focus();
        hideFunc();
      }
    });
    const addPopupRes = this.popupService.addPopup({
      modal: true,
      eChild: eGui,
      closeOnEsc: true,
      afterGuiAttached: () => this.focusService.focusInto(menuList.getGui()),
      ariaLabel: localeTextFunc("ariaLabelContextMenu", "Context Menu"),
      closedCallback: (e) => {
        if (e instanceof KeyboardEvent) {
          this.parentEl.focus();
        }
        this.destroyBean(menuList);
      }
    });
    if (addPopupRes) {
      hideFunc = addPopupRes.hideFunc;
    }
    this.popupService.positionPopupUnderMouseEvent({
      type: "columnContextMenu",
      mouseEvent: this.mouseEvent,
      ePopup: eGui
    });
  }
  isActive() {
    return this.allowGrouping || this.allowValues || this.allowPivoting;
  }
  getMappedMenuItems() {
    const ret = [];
    for (const val of this.menuItemMap.values()) {
      const isInactive = this.columns.some((col) => val.allowedFunction(col) && !val.activeFunction(col));
      const isActive = this.columns.some((col) => val.allowedFunction(col) && val.activeFunction(col));
      if (isInactive) {
        ret.push({
          name: val.activateLabel(this.displayName),
          icon: _createIconNoSpan2(val.addIcon, this.gos, null),
          action: () => val.activateFunction()
        });
      }
      if (isActive) {
        ret.push({
          name: val.deactivateLabel(this.displayName),
          icon: _createIconNoSpan2(val.removeIcon, this.gos, null),
          action: () => val.deActivateFunction()
        });
      }
    }
    return ret;
  }
};

// enterprise-modules/column-tool-panel/src/columnToolPanel/toolPanelColumnGroupComp.ts
var ToolPanelColumnGroupComp = class extends Component3 {
  constructor(modelItem, allowDragging, eventType, focusWrapper) {
    super();
    this.modelItem = modelItem;
    this.allowDragging = allowDragging;
    this.eventType = eventType;
    this.focusWrapper = focusWrapper;
    this.cbSelect = RefPlaceholder2;
    this.eLabel = RefPlaceholder2;
    this.eGroupOpenedIcon = RefPlaceholder2;
    this.eGroupClosedIcon = RefPlaceholder2;
    this.eColumnGroupIcons = RefPlaceholder2;
    this.processingColumnStateChange = false;
    this.modelItem = modelItem;
    this.columnGroup = modelItem.getColumnGroup();
    this.columnDept = modelItem.getDept();
    this.displayName = modelItem.getDisplayName();
    this.allowDragging = allowDragging;
  }
  wireBeans(beans) {
    this.columnModel = beans.columnModel;
    this.dragAndDropService = beans.dragAndDropService;
    this.modelItemUtils = beans.modelItemUtils;
  }
  postConstruct() {
    this.setTemplate(
      /* html */
      `<div class="ag-column-select-column-group" aria-hidden="true">
            <span class="ag-column-group-icons" data-ref="eColumnGroupIcons" >
                <span class="ag-column-group-closed-icon" data-ref="eGroupClosedIcon"></span>
                <span class="ag-column-group-opened-icon" data-ref="eGroupOpenedIcon"></span>
            </span>
            <ag-checkbox data-ref="cbSelect" class="ag-column-select-checkbox"></ag-checkbox>
            <span class="ag-column-select-column-label" data-ref="eLabel"></span>
        </div>`,
      [AgCheckboxSelector2]
    );
    this.eDragHandle = _createIconNoSpan3("columnDrag", this.gos);
    this.eDragHandle.classList.add("ag-drag-handle", "ag-column-select-column-group-drag-handle");
    const checkboxGui = this.cbSelect.getGui();
    const checkboxInput = this.cbSelect.getInputElement();
    checkboxGui.insertAdjacentElement("afterend", this.eDragHandle);
    checkboxInput.setAttribute("tabindex", "-1");
    this.eLabel.innerHTML = this.displayName ? this.displayName : "";
    this.setupExpandContract();
    this.addCssClass("ag-column-select-indent-" + this.columnDept);
    this.getGui().style.setProperty("--ag-indentation-level", String(this.columnDept));
    this.addManagedEventListeners({ columnPivotModeChanged: this.onColumnStateChanged.bind(this) });
    this.addManagedElementListeners(this.eLabel, { click: this.onLabelClicked.bind(this) });
    this.addManagedListeners(this.cbSelect, { fieldValueChanged: this.onCheckboxChanged.bind(this) });
    this.addManagedListeners(this.modelItem, { expandedChanged: this.onExpandChanged.bind(this) });
    this.addManagedListeners(this.focusWrapper, {
      keydown: this.handleKeyDown.bind(this),
      contextmenu: this.onContextMenu.bind(this)
    });
    this.setOpenClosedIcons();
    this.setupDragging();
    this.onColumnStateChanged();
    this.addVisibilityListenersToAllChildren();
    this.refreshAriaExpanded();
    this.refreshAriaLabel();
    this.setupTooltip();
    const classes = _getToolPanelClassesFromColDef(
      this.columnGroup.getColGroupDef(),
      this.gos,
      null,
      this.columnGroup
    );
    classes.forEach((c) => this.addOrRemoveCssClass(c, true));
  }
  getColumns() {
    return this.columnGroup.getLeafColumns();
  }
  setupTooltip() {
    const colGroupDef = this.columnGroup.getColGroupDef();
    if (!colGroupDef) {
      return;
    }
    const isTooltipWhenTruncated = this.gos.get("tooltipShowMode") === "whenTruncated";
    let shouldDisplayTooltip;
    if (isTooltipWhenTruncated) {
      shouldDisplayTooltip = () => this.eLabel.scrollWidth > this.eLabel.clientWidth;
    }
    const refresh = () => {
      const newTooltipText = colGroupDef.headerTooltip;
      this.setTooltip({ newTooltipText, location: "columnToolPanelColumnGroup", shouldDisplayTooltip });
    };
    refresh();
    this.addManagedEventListeners({ newColumnsLoaded: refresh });
  }
  getTooltipParams() {
    const res = super.getTooltipParams();
    res.location = "columnToolPanelColumnGroup";
    return res;
  }
  handleKeyDown(e) {
    switch (e.key) {
      case KeyCode2.LEFT:
        e.preventDefault();
        this.modelItem.setExpanded(false);
        break;
      case KeyCode2.RIGHT:
        e.preventDefault();
        this.modelItem.setExpanded(true);
        break;
      case KeyCode2.SPACE:
        e.preventDefault();
        if (this.isSelectable()) {
          this.onSelectAllChanged(!this.isSelected());
        }
        break;
    }
  }
  onContextMenu(e) {
    const { columnGroup, gos } = this;
    if (gos.get("functionsReadOnly")) {
      return;
    }
    const contextMenu = this.createBean(new ToolPanelContextMenu(columnGroup, e, this.focusWrapper));
    this.addDestroyFunc(() => {
      if (contextMenu.isAlive()) {
        this.destroyBean(contextMenu);
      }
    });
  }
  addVisibilityListenersToAllChildren() {
    const listener = this.onColumnStateChanged.bind(this);
    this.columnGroup.getLeafColumns().forEach((column) => {
      this.addManagedListeners(column, {
        visibleChanged: listener,
        columnValueChanged: listener,
        columnPivotChanged: listener,
        columnRowGroupChanged: listener
      });
    });
  }
  setupDragging() {
    if (!this.allowDragging) {
      _setDisplayed2(this.eDragHandle, false);
      return;
    }
    let hideColumnOnExit = !this.gos.get("suppressDragLeaveHidesColumns");
    const dragSource = {
      type: DragSourceType.ToolPanel,
      eElement: this.eDragHandle,
      dragItemName: this.displayName,
      getDefaultIconName: () => hideColumnOnExit ? "hide" : "notAllowed",
      getDragItem: () => this.createDragItem(),
      onDragStarted: () => {
        hideColumnOnExit = !this.gos.get("suppressDragLeaveHidesColumns");
        const event = {
          type: "columnPanelItemDragStart",
          column: this.columnGroup
        };
        this.eventService.dispatchEvent(event);
      },
      onDragStopped: () => {
        const event = {
          type: "columnPanelItemDragEnd"
        };
        this.eventService.dispatchEvent(event);
      },
      onGridEnter: (dragItem) => {
        if (hideColumnOnExit) {
          this.modelItemUtils.updateColumns({
            columns: this.columnGroup.getLeafColumns(),
            visibleState: dragItem?.visibleState,
            pivotState: dragItem?.pivotState,
            eventType: this.eventType
          });
        }
      },
      onGridExit: () => {
        if (hideColumnOnExit) {
          this.onChangeCommon(false);
        }
      }
    };
    this.dragAndDropService.addDragSource(dragSource, true);
    this.addDestroyFunc(() => this.dragAndDropService.removeDragSource(dragSource));
  }
  createDragItem() {
    const columns = this.columnGroup.getLeafColumns();
    const visibleState = {};
    const pivotState = {};
    columns.forEach((col) => {
      const colId = col.getId();
      visibleState[colId] = col.isVisible();
      pivotState[colId] = this.modelItemUtils.createPivotState(col);
    });
    return {
      columns,
      visibleState,
      pivotState
    };
  }
  setupExpandContract() {
    this.eGroupClosedIcon.appendChild(_createIcon("columnSelectClosed", this.gos, null));
    this.eGroupOpenedIcon.appendChild(_createIcon("columnSelectOpen", this.gos, null));
    const listener = this.onExpandOrContractClicked.bind(this);
    this.addManagedElementListeners(this.eGroupClosedIcon, { click: listener });
    this.addManagedElementListeners(this.eGroupOpenedIcon, { click: listener });
    const touchListener = new TouchListener(this.eColumnGroupIcons, true);
    this.addManagedListeners(touchListener, { tap: listener });
    this.addDestroyFunc(touchListener.destroy.bind(touchListener));
  }
  onLabelClicked() {
    const nextState = !this.cbSelect.getValue();
    this.onChangeCommon(nextState);
  }
  onCheckboxChanged(event) {
    this.onChangeCommon(event.selected);
  }
  getVisibleLeafColumns() {
    const childColumns = [];
    const extractCols = (children) => {
      children.forEach((child) => {
        if (!child.isPassesFilter()) {
          return;
        }
        if (child.isGroup()) {
          extractCols(child.getChildren());
        } else {
          childColumns.push(child.getColumn());
        }
      });
    };
    extractCols(this.modelItem.getChildren());
    return childColumns;
  }
  onChangeCommon(nextState) {
    this.refreshAriaLabel();
    if (this.processingColumnStateChange) {
      return;
    }
    this.modelItemUtils.selectAllChildren(this.modelItem.getChildren(), nextState, this.eventType);
  }
  refreshAriaLabel() {
    const translate = this.localeService.getLocaleTextFunc();
    const columnLabel = translate("ariaColumnGroup", "Column Group");
    const checkboxValue = this.cbSelect.getValue();
    const state = checkboxValue === void 0 ? translate("ariaIndeterminate", "indeterminate") : checkboxValue ? translate("ariaVisible", "visible") : translate("ariaHidden", "hidden");
    const visibilityLabel = translate("ariaToggleVisibility", "Press SPACE to toggle visibility");
    _setAriaLabel(this.focusWrapper, `${this.displayName} ${columnLabel}`);
    this.cbSelect.setInputAriaLabel(`${visibilityLabel} (${state})`);
    _setAriaDescribedBy(this.focusWrapper, this.cbSelect.getInputElement().id);
  }
  onColumnStateChanged() {
    const selectedValue = this.workOutSelectedValue();
    const readOnlyValue = this.workOutReadOnlyValue();
    this.processingColumnStateChange = true;
    this.cbSelect.setValue(selectedValue);
    this.cbSelect.setReadOnly(readOnlyValue);
    this.addOrRemoveCssClass("ag-column-select-column-group-readonly", readOnlyValue);
    this.processingColumnStateChange = false;
  }
  workOutSelectedValue() {
    const pivotMode = this.columnModel.isPivotMode();
    const visibleLeafColumns = this.getVisibleLeafColumns();
    let checkedCount = 0;
    let uncheckedCount = 0;
    visibleLeafColumns.forEach((column) => {
      if (!pivotMode && column.getColDef().lockVisible) {
        return;
      }
      if (this.isColumnChecked(column, pivotMode)) {
        checkedCount++;
      } else {
        uncheckedCount++;
      }
    });
    if (checkedCount > 0 && uncheckedCount > 0) {
      return void 0;
    }
    return checkedCount > 0;
  }
  workOutReadOnlyValue() {
    const pivotMode = this.columnModel.isPivotMode();
    let colsThatCanAction = 0;
    this.columnGroup.getLeafColumns().forEach((col) => {
      if (pivotMode) {
        if (col.isAnyFunctionAllowed()) {
          colsThatCanAction++;
        }
      } else {
        if (!col.getColDef().lockVisible) {
          colsThatCanAction++;
        }
      }
    });
    return colsThatCanAction === 0;
  }
  isColumnChecked(column, pivotMode) {
    if (pivotMode) {
      const pivoted = column.isPivotActive();
      const grouped = column.isRowGroupActive();
      const aggregated = column.isValueActive();
      return pivoted || grouped || aggregated;
    }
    return column.isVisible();
  }
  onExpandOrContractClicked() {
    const oldState = this.modelItem.isExpanded();
    this.modelItem.setExpanded(!oldState);
  }
  onExpandChanged() {
    this.setOpenClosedIcons();
    this.refreshAriaExpanded();
  }
  setOpenClosedIcons() {
    const folderOpen = this.modelItem.isExpanded();
    _setDisplayed2(this.eGroupClosedIcon, !folderOpen);
    _setDisplayed2(this.eGroupOpenedIcon, folderOpen);
  }
  refreshAriaExpanded() {
    _setAriaExpanded(this.focusWrapper, this.modelItem.isExpanded());
  }
  getDisplayName() {
    return this.displayName;
  }
  onSelectAllChanged(value) {
    const cbValue = this.cbSelect.getValue();
    const readOnly = this.cbSelect.isReadOnly();
    if (!readOnly && (value && !cbValue || !value && cbValue)) {
      this.cbSelect.toggle();
    }
  }
  isSelected() {
    return this.cbSelect.getValue();
  }
  isSelectable() {
    return !this.cbSelect.isReadOnly();
  }
  setSelected(selected) {
    this.cbSelect.setValue(selected, true);
  }
};

// enterprise-modules/column-tool-panel/src/columnToolPanel/primaryColsListPanelItemDragFeature.ts
var PrimaryColsListPanelItemDragFeature = class extends BeanStub {
  constructor(comp, virtualList) {
    super();
    this.comp = comp;
    this.virtualList = virtualList;
  }
  wireBeans(beans) {
    this.columnModel = beans.columnModel;
    this.columnMoveService = beans.columnMoveService;
  }
  postConstruct() {
    this.createManagedBean(
      new VirtualListDragFeature(this.comp, this.virtualList, {
        dragSourceType: DragSourceType2.ToolPanel,
        listItemDragStartEvent: "columnPanelItemDragStart",
        listItemDragEndEvent: "columnPanelItemDragEnd",
        eventSource: this.eventService,
        getCurrentDragValue: (listItemDragStartEvent) => this.getCurrentDragValue(listItemDragStartEvent),
        isMoveBlocked: (currentDragValue) => this.isMoveBlocked(currentDragValue),
        getNumRows: (comp) => comp.getDisplayedColsList().length,
        moveItem: (currentDragValue, lastHoveredListItem) => this.moveItem(currentDragValue, lastHoveredListItem)
      })
    );
  }
  getCurrentDragValue(listItemDragStartEvent) {
    return listItemDragStartEvent.column;
  }
  isMoveBlocked(currentDragValue) {
    const preventMoving = this.gos.get("suppressMovableColumns");
    if (preventMoving) {
      return true;
    }
    const currentColumns = this.getCurrentColumns(currentDragValue);
    const hasNotMovable = currentColumns.find((col) => {
      const colDef = col.getColDef();
      return !!colDef.suppressMovable || !!colDef.lockPosition;
    });
    return !!hasNotMovable;
  }
  moveItem(currentDragValue, lastHoveredListItem) {
    const targetIndex = this.getTargetIndex(currentDragValue, lastHoveredListItem);
    const columnsToMove = this.getCurrentColumns(currentDragValue);
    if (targetIndex != null) {
      this.columnMoveService.moveColumns(columnsToMove, targetIndex, "toolPanelUi");
    }
  }
  getMoveDiff(currentDragValue, end) {
    const allColumns = this.columnModel.getCols();
    const currentColumns = this.getCurrentColumns(currentDragValue);
    const currentColumn = currentColumns[0];
    const span = currentColumns.length;
    const currentIndex = allColumns.indexOf(currentColumn);
    if (currentIndex < end) {
      return span;
    }
    return 0;
  }
  getCurrentColumns(currentDragValue) {
    if (isProvidedColumnGroup2(currentDragValue)) {
      return currentDragValue.getLeafColumns();
    }
    return [currentDragValue];
  }
  getTargetIndex(currentDragValue, lastHoveredListItem) {
    if (!lastHoveredListItem) {
      return null;
    }
    const columnItemComponent = lastHoveredListItem.component;
    let isBefore = lastHoveredListItem.position === "top";
    let targetColumn;
    if (columnItemComponent instanceof ToolPanelColumnGroupComp) {
      const columns = columnItemComponent.getColumns();
      targetColumn = columns[0];
      isBefore = true;
    } else {
      targetColumn = columnItemComponent.getColumn();
    }
    const movingCols = this.getCurrentColumns(currentDragValue);
    if (movingCols.indexOf(targetColumn) !== -1) {
      return null;
    }
    const targetColumnIndex = this.columnModel.getCols().indexOf(targetColumn);
    const adjustedTarget = isBefore ? targetColumnIndex : targetColumnIndex + 1;
    const diff = this.getMoveDiff(currentDragValue, adjustedTarget);
    return adjustedTarget - diff;
  }
};

// enterprise-modules/column-tool-panel/src/columnToolPanel/toolPanelColumnComp.ts
import {
  AgCheckboxSelector as AgCheckboxSelector3,
  Component as Component4,
  DragSourceType as DragSourceType3,
  KeyCode as KeyCode3,
  RefPlaceholder as RefPlaceholder3,
  _createIconNoSpan as _createIconNoSpan4,
  _escapeString,
  _getToolPanelClassesFromColDef as _getToolPanelClassesFromColDef2,
  _setAriaDescribedBy as _setAriaDescribedBy2,
  _setAriaLabel as _setAriaLabel2,
  _setDisplayed as _setDisplayed3,
  _warnOnce
} from "@ag-grid-community/core";
var ToolPanelColumnComp = class extends Component4 {
  constructor(modelItem, allowDragging, groupsExist, focusWrapper) {
    super();
    this.allowDragging = allowDragging;
    this.groupsExist = groupsExist;
    this.focusWrapper = focusWrapper;
    this.eLabel = RefPlaceholder3;
    this.cbSelect = RefPlaceholder3;
    this.processingColumnStateChange = false;
    this.column = modelItem.getColumn();
    this.columnDept = modelItem.getDept();
    this.displayName = modelItem.getDisplayName();
  }
  wireBeans(beans) {
    this.columnModel = beans.columnModel;
    this.dragAndDropService = beans.dragAndDropService;
    this.modelItemUtils = beans.modelItemUtils;
  }
  postConstruct() {
    this.setTemplate(
      /* html */
      `<div class="ag-column-select-column" aria-hidden="true">
            <ag-checkbox data-ref="cbSelect" class="ag-column-select-checkbox"></ag-checkbox>
            <span class="ag-column-select-column-label" data-ref="eLabel"></span>
        </div>`,
      [AgCheckboxSelector3]
    );
    this.eDragHandle = _createIconNoSpan4("columnDrag", this.gos);
    this.eDragHandle.classList.add("ag-drag-handle", "ag-column-select-column-drag-handle");
    const checkboxGui = this.cbSelect.getGui();
    const checkboxInput = this.cbSelect.getInputElement();
    checkboxGui.insertAdjacentElement("afterend", this.eDragHandle);
    checkboxInput.setAttribute("tabindex", "-1");
    const displayNameSanitised = _escapeString(this.displayName);
    this.eLabel.innerHTML = displayNameSanitised;
    const indent = this.columnDept;
    if (this.groupsExist) {
      this.addCssClass("ag-column-select-add-group-indent");
    }
    this.addCssClass(`ag-column-select-indent-${indent}`);
    this.getGui().style.setProperty("--ag-indentation-level", String(indent));
    this.setupDragging();
    const onColStateChanged = this.onColumnStateChanged.bind(this);
    this.addManagedEventListeners({ columnPivotModeChanged: onColStateChanged });
    this.addManagedListeners(this.column, {
      columnValueChanged: onColStateChanged,
      columnPivotChanged: onColStateChanged,
      columnRowGroupChanged: onColStateChanged,
      visibleChanged: onColStateChanged
    });
    this.addManagedListeners(this.focusWrapper, {
      keydown: this.handleKeyDown.bind(this),
      contextmenu: this.onContextMenu.bind(this)
    });
    this.addManagedPropertyListener("functionsReadOnly", this.onColumnStateChanged.bind(this));
    this.addManagedListeners(this.cbSelect, { fieldValueChanged: this.onCheckboxChanged.bind(this) });
    this.addManagedElementListeners(this.eLabel, { click: this.onLabelClicked.bind(this) });
    this.onColumnStateChanged();
    this.refreshAriaLabel();
    this.setupTooltip();
    const classes = _getToolPanelClassesFromColDef2(this.column.getColDef(), this.gos, this.column, null);
    classes.forEach((c) => this.addOrRemoveCssClass(c, true));
  }
  getColumn() {
    return this.column;
  }
  setupTooltip() {
    const isTooltipWhenTruncated = this.gos.get("tooltipShowMode") === "whenTruncated";
    let shouldDisplayTooltip;
    if (isTooltipWhenTruncated) {
      shouldDisplayTooltip = () => this.eLabel.scrollWidth > this.eLabel.clientWidth;
    }
    const refresh = () => {
      const newTooltipText = this.column.getColDef().headerTooltip;
      this.setTooltip({ newTooltipText, location: "columnToolPanelColumn", shouldDisplayTooltip });
    };
    refresh();
    this.addManagedEventListeners({ newColumnsLoaded: refresh });
  }
  getTooltipParams() {
    const res = super.getTooltipParams();
    res.location = "columnToolPanelColumn";
    res.colDef = this.column.getColDef();
    return res;
  }
  onContextMenu(e) {
    const { column, gos } = this;
    if (gos.get("functionsReadOnly")) {
      return;
    }
    const contextMenu = this.createBean(new ToolPanelContextMenu(column, e, this.focusWrapper));
    this.addDestroyFunc(() => {
      if (contextMenu.isAlive()) {
        this.destroyBean(contextMenu);
      }
    });
  }
  handleKeyDown(e) {
    if (e.key === KeyCode3.SPACE) {
      e.preventDefault();
      if (this.isSelectable()) {
        this.onSelectAllChanged(!this.isSelected());
      }
    }
  }
  onLabelClicked() {
    if (this.gos.get("functionsReadOnly")) {
      return;
    }
    const nextState = !this.cbSelect.getValue();
    this.onChangeCommon(nextState);
  }
  onCheckboxChanged(event) {
    this.onChangeCommon(event.selected);
  }
  onChangeCommon(nextState) {
    if (this.cbSelect.isReadOnly()) {
      return;
    }
    this.refreshAriaLabel();
    if (this.processingColumnStateChange) {
      return;
    }
    this.modelItemUtils.setColumn(this.column, nextState, "toolPanelUi");
  }
  refreshAriaLabel() {
    const translate = this.localeService.getLocaleTextFunc();
    const columnLabel = translate("ariaColumn", "Column");
    const state = this.cbSelect.getValue() ? translate("ariaVisible", "visible") : translate("ariaHidden", "hidden");
    const visibilityLabel = translate("ariaToggleVisibility", "Press SPACE to toggle visibility");
    _setAriaLabel2(this.focusWrapper, `${this.displayName} ${columnLabel}`);
    this.cbSelect.setInputAriaLabel(`${visibilityLabel} (${state})`);
    _setAriaDescribedBy2(this.focusWrapper, this.cbSelect.getInputElement().id);
  }
  setupDragging() {
    if (!this.allowDragging) {
      _setDisplayed3(this.eDragHandle, false);
      return;
    }
    let hideColumnOnExit = !this.gos.get("suppressDragLeaveHidesColumns");
    const dragSource = {
      type: DragSourceType3.ToolPanel,
      eElement: this.eDragHandle,
      dragItemName: this.displayName,
      getDefaultIconName: () => hideColumnOnExit ? "hide" : "notAllowed",
      getDragItem: () => this.createDragItem(),
      onDragStarted: () => {
        hideColumnOnExit = !this.gos.get("suppressDragLeaveHidesColumns");
        const event = {
          type: "columnPanelItemDragStart",
          column: this.column
        };
        this.eventService.dispatchEvent(event);
      },
      onDragStopped: () => {
        const event = {
          type: "columnPanelItemDragEnd"
        };
        this.eventService.dispatchEvent(event);
      },
      onGridEnter: (dragItem) => {
        if (hideColumnOnExit) {
          this.modelItemUtils.updateColumns({
            columns: [this.column],
            visibleState: dragItem?.visibleState,
            pivotState: dragItem?.pivotState,
            eventType: "toolPanelUi"
          });
        }
      },
      onGridExit: () => {
        if (hideColumnOnExit) {
          this.onChangeCommon(false);
        }
      }
    };
    this.dragAndDropService.addDragSource(dragSource, true);
    this.addDestroyFunc(() => this.dragAndDropService.removeDragSource(dragSource));
  }
  createDragItem() {
    const colId = this.column.getColId();
    const visibleState = { [colId]: this.column.isVisible() };
    const pivotState = { [colId]: this.modelItemUtils.createPivotState(this.column) };
    return {
      columns: [this.column],
      visibleState,
      pivotState
    };
  }
  onColumnStateChanged() {
    this.processingColumnStateChange = true;
    const isPivotMode = this.columnModel.isPivotMode();
    if (isPivotMode) {
      const anyFunctionActive = this.column.isAnyFunctionActive();
      this.cbSelect.setValue(anyFunctionActive);
    } else {
      this.cbSelect.setValue(this.column.isVisible());
    }
    let canBeToggled = true;
    let canBeDragged = true;
    if (isPivotMode) {
      const functionsReadOnly = this.gos.get("functionsReadOnly");
      const noFunctionsAllowed = !this.column.isAnyFunctionAllowed();
      canBeToggled = !functionsReadOnly && !noFunctionsAllowed;
      canBeDragged = canBeToggled;
    } else {
      const { enableRowGroup, enableValue, lockPosition, suppressMovable, lockVisible } = this.column.getColDef();
      const forceDraggable = !!enableRowGroup || !!enableValue;
      const disableDraggable = !!lockPosition || !!suppressMovable;
      canBeToggled = !lockVisible;
      canBeDragged = forceDraggable || !disableDraggable;
    }
    this.cbSelect.setReadOnly(!canBeToggled);
    this.eDragHandle.classList.toggle("ag-column-select-column-readonly", !canBeDragged);
    this.addOrRemoveCssClass("ag-column-select-column-readonly", !canBeDragged && !canBeToggled);
    this.cbSelect.setPassive(false);
    this.processingColumnStateChange = false;
  }
  getDisplayName() {
    return this.displayName;
  }
  onSelectAllChanged(value) {
    if (value !== this.cbSelect.getValue()) {
      if (!this.cbSelect.isReadOnly()) {
        this.cbSelect.toggle();
      }
    }
  }
  isSelected() {
    return this.cbSelect.getValue();
  }
  isSelectable() {
    return !this.cbSelect.isReadOnly();
  }
  isExpandable() {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setExpanded(_value) {
    _warnOnce("can not expand a column item that does not represent a column group header");
  }
};

// enterprise-modules/column-tool-panel/src/columnToolPanel/agPrimaryColsList.ts
var UIColumnModel = class {
  constructor(items) {
    this.items = items;
  }
  getRowCount() {
    return this.items.length;
  }
  getRow(index) {
    return this.items[index];
  }
};
var PRIMARY_COLS_LIST_PANEL_CLASS = "ag-column-select-list";
var AgPrimaryColsList = class extends Component5 {
  constructor() {
    super(
      /* html */
      `<div class="${PRIMARY_COLS_LIST_PANEL_CLASS}" role="presentation"></div>`
    );
    this.destroyColumnItemFuncs = [];
    this.hasLoadedInitialState = false;
    this.isInitialState = false;
  }
  wireBeans(beans) {
    this.columnModel = beans.columnModel;
    this.columnNameService = beans.columnNameService;
    this.colDefService = beans.toolPanelColDefService;
    this.modelItemUtils = beans.modelItemUtils;
  }
  destroy() {
    this.destroyColumnTree();
    super.destroy();
  }
  destroyColumnTree() {
    this.allColsTree = [];
    this.destroyColumnItemFuncs.forEach((f) => f());
    this.destroyColumnItemFuncs = [];
  }
  init(params, allowDragging, eventType) {
    this.params = params;
    this.allowDragging = allowDragging;
    this.eventType = eventType;
    if (!this.params.suppressSyncLayoutWithGrid) {
      this.addManagedEventListeners({ columnMoved: this.onColumnsChanged.bind(this) });
    }
    this.addManagedEventListeners({
      newColumnsLoaded: this.onColumnsChanged.bind(this)
    });
    const listener = this.fireSelectionChangedEvent.bind(this);
    this.addManagedEventListeners({
      columnPivotChanged: listener,
      columnPivotModeChanged: listener,
      columnRowGroupChanged: listener,
      columnValueChanged: listener,
      columnVisible: listener,
      newColumnsLoaded: listener
    });
    this.expandGroupsByDefault = !this.params.contractColumnSelection;
    this.virtualList = this.createManagedBean(
      new VirtualList({
        cssIdentifier: "column-select",
        ariaRole: "tree"
      })
    );
    this.appendChild(this.virtualList.getGui());
    this.virtualList.setComponentCreator((item, listItemElement) => {
      _setAriaLevel(listItemElement, item.getDept() + 1);
      return this.createComponentFromItem(item, listItemElement);
    });
    if (this.columnModel.isReady()) {
      this.onColumnsChanged();
    }
    if (this.params.suppressColumnMove) {
      return;
    }
    this.createManagedBean(new PrimaryColsListPanelItemDragFeature(this, this.virtualList));
  }
  createComponentFromItem(item, listItemElement) {
    if (item.isGroup()) {
      const renderedGroup = new ToolPanelColumnGroupComp(
        item,
        this.allowDragging,
        this.eventType,
        listItemElement
      );
      this.createBean(renderedGroup);
      return renderedGroup;
    }
    const columnComp = new ToolPanelColumnComp(item, this.allowDragging, this.groupsExist, listItemElement);
    this.createBean(columnComp);
    return columnComp;
  }
  onColumnsChanged() {
    if (!this.hasLoadedInitialState) {
      this.hasLoadedInitialState = true;
      this.isInitialState = !!this.params.initialState;
    }
    const expandedStates = this.getExpandedStates();
    const pivotModeActive = this.columnModel.isPivotMode();
    const shouldSyncColumnLayoutWithGrid = !this.params.suppressSyncLayoutWithGrid && !pivotModeActive;
    if (shouldSyncColumnLayoutWithGrid) {
      this.buildTreeFromWhatGridIsDisplaying();
    } else {
      this.buildTreeFromProvidedColumnDefs();
    }
    this.setExpandedStates(expandedStates);
    this.markFilteredColumns();
    this.flattenAndFilterModel();
    this.isInitialState = false;
  }
  getDisplayedColsList() {
    return this.displayedColsList;
  }
  getExpandedStates() {
    const res = {};
    if (this.isInitialState) {
      const { expandedGroupIds } = this.params.initialState;
      expandedGroupIds.forEach((id) => {
        res[id] = true;
      });
      return res;
    }
    if (!this.allColsTree) {
      return {};
    }
    this.forEachItem((item) => {
      if (!item.isGroup()) {
        return;
      }
      const colGroup = item.getColumnGroup();
      if (colGroup) {
        res[colGroup.getId()] = item.isExpanded();
      }
    });
    return res;
  }
  setExpandedStates(states) {
    if (!this.allColsTree) {
      return;
    }
    const { isInitialState } = this;
    this.forEachItem((item) => {
      if (!item.isGroup()) {
        return;
      }
      const colGroup = item.getColumnGroup();
      if (colGroup) {
        const expanded = states[colGroup.getId()];
        const groupExistedLastTime = expanded != null;
        if (groupExistedLastTime || isInitialState) {
          item.setExpanded(!!expanded);
        }
      }
    });
  }
  buildTreeFromWhatGridIsDisplaying() {
    this.colDefService.syncLayoutWithGrid(this.setColumnLayout.bind(this));
  }
  setColumnLayout(colDefs) {
    const columnTree = this.colDefService.createColumnTree(colDefs);
    this.buildListModel(columnTree);
    this.groupsExist = colDefs.some((colDef) => {
      return colDef && typeof colDef.children !== "undefined";
    });
    this.markFilteredColumns();
    this.flattenAndFilterModel();
  }
  buildTreeFromProvidedColumnDefs() {
    this.buildListModel(this.columnModel.getColDefColTree());
    this.groupsExist = this.columnModel.isProvidedColGroupsPresent();
  }
  buildListModel(columnTree) {
    const columnExpandedListener = this.onColumnExpanded.bind(this);
    const addListeners = (item) => {
      item.addEventListener("expandedChanged", columnExpandedListener);
      const removeFunc = item.removeEventListener.bind(item, "expandedChanged", columnExpandedListener);
      this.destroyColumnItemFuncs.push(removeFunc);
    };
    const recursivelyBuild = (tree, dept, parentList) => {
      tree.forEach((child) => {
        if (isProvidedColumnGroup3(child)) {
          createGroupItem(child, dept, parentList);
        } else {
          createColumnItem(child, dept, parentList);
        }
      });
    };
    const createGroupItem = (columnGroup, dept, parentList) => {
      const columnGroupDef = columnGroup.getColGroupDef();
      const skipThisGroup = columnGroupDef && columnGroupDef.suppressColumnsToolPanel;
      if (skipThisGroup) {
        return;
      }
      if (columnGroup.isPadding()) {
        recursivelyBuild(columnGroup.getChildren(), dept, parentList);
        return;
      }
      const displayName = this.columnNameService.getDisplayNameForProvidedColumnGroup(
        null,
        columnGroup,
        "columnToolPanel"
      );
      const item = new ColumnModelItem(
        displayName,
        columnGroup,
        dept,
        true,
        this.expandGroupsByDefault
      );
      parentList.push(item);
      addListeners(item);
      recursivelyBuild(columnGroup.getChildren(), dept + 1, item.getChildren());
    };
    const createColumnItem = (column, dept, parentList) => {
      const skipThisColumn = column.getColDef() && column.getColDef().suppressColumnsToolPanel;
      if (skipThisColumn) {
        return;
      }
      const displayName = this.columnNameService.getDisplayNameForColumn(column, "columnToolPanel");
      parentList.push(new ColumnModelItem(displayName, column, dept));
    };
    this.destroyColumnTree();
    recursivelyBuild(columnTree, 0, this.allColsTree);
  }
  onColumnExpanded() {
    this.flattenAndFilterModel();
  }
  flattenAndFilterModel() {
    this.displayedColsList = [];
    const recursiveFunc = (item) => {
      if (!item.isPassesFilter()) {
        return;
      }
      this.displayedColsList.push(item);
      if (item.isGroup() && item.isExpanded()) {
        item.getChildren().forEach(recursiveFunc);
      }
    };
    this.allColsTree.forEach(recursiveFunc);
    this.virtualList.setModel(new UIColumnModel(this.displayedColsList));
    const focusedRow = this.virtualList.getLastFocusedRow();
    this.virtualList.refresh();
    if (focusedRow != null) {
      this.focusRowIfAlive(focusedRow);
    }
    this.notifyListeners();
    this.refreshAriaLabel();
  }
  refreshAriaLabel() {
    const translate = this.localeService.getLocaleTextFunc();
    const columnListName = translate("ariaColumnPanelList", "Column List");
    const localeColumns = translate("columns", "Columns");
    const items = this.displayedColsList.length;
    _setAriaLabel3(this.virtualList.getAriaElement(), `${columnListName} ${items} ${localeColumns}`);
  }
  focusRowIfAlive(rowIndex) {
    window.setTimeout(() => {
      if (this.isAlive()) {
        this.virtualList.focusRow(rowIndex);
      }
    }, 0);
  }
  forEachItem(callback) {
    const recursiveFunc = (items) => {
      items.forEach((item) => {
        callback(item);
        if (item.isGroup()) {
          recursiveFunc(item.getChildren());
        }
      });
    };
    if (!this.allColsTree) {
      return;
    }
    recursiveFunc(this.allColsTree);
  }
  doSetExpandedAll(value) {
    this.forEachItem((item) => {
      if (item.isGroup()) {
        item.setExpanded(value);
      }
    });
  }
  setGroupsExpanded(expand, groupIds) {
    if (!groupIds) {
      this.doSetExpandedAll(expand);
      return;
    }
    const expandedGroupIds = [];
    this.forEachItem((item) => {
      if (!item.isGroup()) {
        return;
      }
      const groupId = item.getColumnGroup().getId();
      if (groupIds.indexOf(groupId) >= 0) {
        item.setExpanded(expand);
        expandedGroupIds.push(groupId);
      }
    });
    const unrecognisedGroupIds = groupIds.filter((groupId) => !_includes(expandedGroupIds, groupId));
    if (unrecognisedGroupIds.length > 0) {
      _warnOnce2("unable to find group(s) for supplied groupIds:", unrecognisedGroupIds);
    }
  }
  getExpandState() {
    let expandedCount = 0;
    let notExpandedCount = 0;
    this.forEachItem((item) => {
      if (!item.isGroup()) {
        return;
      }
      if (item.isExpanded()) {
        expandedCount++;
      } else {
        notExpandedCount++;
      }
    });
    if (expandedCount > 0 && notExpandedCount > 0) {
      return 2 /* INDETERMINATE */;
    }
    if (notExpandedCount > 0) {
      return 1 /* COLLAPSED */;
    }
    return 0 /* EXPANDED */;
  }
  doSetSelectedAll(selectAllChecked) {
    this.modelItemUtils.selectAllChildren(this.allColsTree, selectAllChecked, this.eventType);
  }
  getSelectionState() {
    let checkedCount = 0;
    let uncheckedCount = 0;
    const pivotMode = this.columnModel.isPivotMode();
    this.forEachItem((item) => {
      if (item.isGroup()) {
        return;
      }
      if (!item.isPassesFilter()) {
        return;
      }
      const column = item.getColumn();
      const colDef = column.getColDef();
      let checked;
      if (pivotMode) {
        const noPivotModeOptionsAllowed = !column.isAllowPivot() && !column.isAllowRowGroup() && !column.isAllowValue();
        if (noPivotModeOptionsAllowed) {
          return;
        }
        checked = column.isValueActive() || column.isPivotActive() || column.isRowGroupActive();
      } else {
        if (colDef.lockVisible) {
          return;
        }
        checked = column.isVisible();
      }
      checked ? checkedCount++ : uncheckedCount++;
    });
    if (checkedCount > 0 && uncheckedCount > 0) {
      return void 0;
    }
    return !(checkedCount === 0 || uncheckedCount > 0);
  }
  setFilterText(filterText) {
    this.filterText = _exists(filterText) ? filterText.toLowerCase() : null;
    this.markFilteredColumns();
    this.flattenAndFilterModel();
  }
  markFilteredColumns() {
    const passesFilter = (item) => {
      if (!_exists(this.filterText)) {
        return true;
      }
      const displayName = item.getDisplayName();
      return displayName == null || displayName.toLowerCase().indexOf(this.filterText) !== -1;
    };
    const recursivelyCheckFilter = (item, parentPasses) => {
      let atLeastOneChildPassed = false;
      if (item.isGroup()) {
        const groupPasses = passesFilter(item);
        item.getChildren().forEach((child) => {
          const childPasses = recursivelyCheckFilter(child, groupPasses || parentPasses);
          if (childPasses) {
            atLeastOneChildPassed = childPasses;
          }
        });
      }
      const filterPasses = parentPasses || atLeastOneChildPassed ? true : passesFilter(item);
      item.setPassesFilter(filterPasses);
      return filterPasses;
    };
    this.allColsTree.forEach((item) => recursivelyCheckFilter(item, false));
  }
  notifyListeners() {
    this.fireGroupExpandedEvent();
    this.fireSelectionChangedEvent();
  }
  fireGroupExpandedEvent() {
    const expandState = this.getExpandState();
    this.dispatchLocalEvent({ type: "groupExpanded", state: expandState });
  }
  fireSelectionChangedEvent() {
    if (!this.allColsTree) {
      return;
    }
    const selectionState = this.getSelectionState();
    this.dispatchLocalEvent({ type: "selectionChanged", state: selectionState });
  }
  getExpandedGroups() {
    const expandedGroupIds = [];
    if (!this.allColsTree) {
      return expandedGroupIds;
    }
    this.forEachItem((item) => {
      if (item.isGroup() && item.isExpanded()) {
        expandedGroupIds.push(item.getColumnGroup().getId());
      }
    });
    return expandedGroupIds;
  }
};
var AgPrimaryColsListSelector = {
  selector: "AG-PRIMARY-COLS-LIST",
  component: AgPrimaryColsList
};

// enterprise-modules/column-tool-panel/src/columnToolPanel/agPrimaryCols.ts
var AgPrimaryCols = class extends Component6 {
  constructor() {
    super(
      /* html */
      `<div class="ag-column-select">
            <ag-primary-cols-header data-ref="primaryColsHeaderPanel"></ag-primary-cols-header>
            <ag-primary-cols-list data-ref="primaryColsListPanel"></ag-primary-cols-list>
        </div>`,
      [AgPrimaryColsHeaderSelector, AgPrimaryColsListSelector]
    );
    this.primaryColsHeaderPanel = RefPlaceholder4;
    this.primaryColsListPanel = RefPlaceholder4;
  }
  // we allow dragging in the toolPanel, but not when this component appears in the column menu
  init(allowDragging, params, eventType) {
    this.allowDragging = allowDragging;
    this.params = params;
    this.eventType = eventType;
    this.primaryColsHeaderPanel.init(this.params);
    const hideFilter = this.params.suppressColumnFilter;
    const hideSelect = this.params.suppressColumnSelectAll;
    const hideExpand = this.params.suppressColumnExpandAll;
    if (hideExpand && hideFilter && hideSelect) {
      this.primaryColsHeaderPanel.setDisplayed(false);
    }
    this.addManagedListeners(this.primaryColsListPanel, {
      groupExpanded: this.onGroupExpanded.bind(this),
      selectionChanged: this.onSelectionChange.bind(this)
    });
    this.primaryColsListPanel.init(this.params, this.allowDragging, this.eventType);
    this.addManagedListeners(this.primaryColsHeaderPanel, {
      expandAll: this.onExpandAll.bind(this),
      collapseAll: this.onCollapseAll.bind(this),
      selectAll: this.onSelectAll.bind(this),
      unselectAll: this.onUnselectAll.bind(this),
      filterChanged: this.onFilterChanged.bind(this)
    });
    this.positionableFeature = new PositionableFeature(this.getGui(), { minHeight: 100 });
    this.createManagedBean(this.positionableFeature);
  }
  toggleResizable(resizable) {
    this.positionableFeature.setResizable(resizable ? { bottom: true } : false);
  }
  onExpandAll() {
    this.primaryColsListPanel.doSetExpandedAll(true);
  }
  onCollapseAll() {
    this.primaryColsListPanel.doSetExpandedAll(false);
  }
  expandGroups(groupIds) {
    this.primaryColsListPanel.setGroupsExpanded(true, groupIds);
  }
  collapseGroups(groupIds) {
    this.primaryColsListPanel.setGroupsExpanded(false, groupIds);
  }
  setColumnLayout(colDefs) {
    this.primaryColsListPanel.setColumnLayout(colDefs);
  }
  onFilterChanged(event) {
    this.primaryColsListPanel.setFilterText(event.filterText);
  }
  syncLayoutWithGrid() {
    this.primaryColsListPanel.onColumnsChanged();
  }
  onSelectAll() {
    this.primaryColsListPanel.doSetSelectedAll(true);
  }
  onUnselectAll() {
    this.primaryColsListPanel.doSetSelectedAll(false);
  }
  onGroupExpanded(event) {
    this.primaryColsHeaderPanel.setExpandState(event.state);
    this.params.onStateUpdated();
  }
  onSelectionChange(event) {
    this.primaryColsHeaderPanel.setSelectionState(event.state);
  }
  getExpandedGroups() {
    return this.primaryColsListPanel.getExpandedGroups();
  }
};

// enterprise-modules/column-tool-panel/src/columnToolPanel/pivotModePanel.ts
import { AgToggleButtonSelector, Component as Component7, RefPlaceholder as RefPlaceholder5 } from "@ag-grid-community/core";
var PivotModePanel = class extends Component7 {
  constructor() {
    super(...arguments);
    this.cbPivotMode = RefPlaceholder5;
  }
  wireBeans(beans) {
    this.columnModel = beans.columnModel;
    this.ctrlsService = beans.ctrlsService;
  }
  createTemplate() {
    return (
      /* html */
      `<div class="ag-pivot-mode-panel">
                <ag-toggle-button data-ref="cbPivotMode" class="ag-pivot-mode-select"></ag-toggle-button>
            </div>`
    );
  }
  postConstruct() {
    this.setTemplate(this.createTemplate(), [AgToggleButtonSelector]);
    this.cbPivotMode.setValue(this.columnModel.isPivotMode());
    const localeTextFunc = this.localeService.getLocaleTextFunc();
    this.cbPivotMode.setLabel(localeTextFunc("pivotMode", "Pivot Mode"));
    this.addManagedListeners(this.cbPivotMode, { fieldValueChanged: this.onBtPivotMode.bind(this) });
    const listener = this.onPivotModeChanged.bind(this);
    this.addManagedEventListeners({
      newColumnsLoaded: listener,
      columnPivotModeChanged: listener
    });
  }
  onBtPivotMode() {
    const newValue = !!this.cbPivotMode.getValue();
    if (newValue !== this.columnModel.isPivotMode()) {
      this.gos.updateGridOptions({ options: { pivotMode: newValue }, source: "toolPanelUi" });
      this.ctrlsService.getHeaderRowContainerCtrls().forEach((c) => c.refresh());
    }
  }
  onPivotModeChanged() {
    const pivotModeActive = this.columnModel.isPivotMode();
    this.cbPivotMode.setValue(pivotModeActive);
  }
};

// enterprise-modules/column-tool-panel/src/columnToolPanel/columnToolPanel.ts
var ColumnToolPanel = class extends Component8 {
  constructor() {
    super(
      /* html */
      `<div class="ag-column-panel"></div>`
    );
    this.initialised = false;
    this.childDestroyFuncs = [];
  }
  // lazy initialise the panel
  setVisible(visible) {
    super.setDisplayed(visible);
    if (visible && !this.initialised) {
      this.init(this.params);
    }
  }
  init(params) {
    const defaultParams = this.gos.addGridCommonParams({
      suppressColumnMove: false,
      suppressColumnSelectAll: false,
      suppressColumnFilter: false,
      suppressColumnExpandAll: false,
      contractColumnSelection: false,
      suppressPivotMode: false,
      suppressRowGroups: false,
      suppressValues: false,
      suppressPivots: false,
      suppressSyncLayoutWithGrid: false
    });
    this.params = {
      ...defaultParams,
      ...params
    };
    if (this.isRowGroupingModuleLoaded() && !this.params.suppressPivotMode) {
      this.pivotModePanel = this.createBean(new PivotModePanel());
      this.childDestroyFuncs.push(() => this.destroyBean(this.pivotModePanel));
      this.appendChild(this.pivotModePanel);
    }
    this.primaryColsPanel = this.createBean(new AgPrimaryCols());
    this.childDestroyFuncs.push(() => this.destroyBean(this.primaryColsPanel));
    this.primaryColsPanel.init(true, this.params, "toolPanelUi");
    this.primaryColsPanel.addCssClass("ag-column-panel-column-select");
    this.appendChild(this.primaryColsPanel);
    if (this.isRowGroupingModuleLoaded()) {
      if (!this.params.suppressRowGroups) {
        this.rowGroupDropZonePanel = this.createBean(new RowGroupDropZonePanel(false));
        this.childDestroyFuncs.push(() => this.destroyBean(this.rowGroupDropZonePanel));
        this.appendChild(this.rowGroupDropZonePanel);
      }
      if (!this.params.suppressValues) {
        this.valuesDropZonePanel = this.createBean(new ValuesDropZonePanel(false));
        this.childDestroyFuncs.push(() => this.destroyBean(this.valuesDropZonePanel));
        this.appendChild(this.valuesDropZonePanel);
      }
      if (!this.params.suppressPivots) {
        this.pivotDropZonePanel = this.createBean(new PivotDropZonePanel(false));
        this.childDestroyFuncs.push(() => this.destroyBean(this.pivotDropZonePanel));
        this.appendChild(this.pivotDropZonePanel);
      }
      this.setLastVisible();
      const [pivotModeListener] = this.addManagedEventListeners({
        columnPivotModeChanged: () => {
          this.resetChildrenHeight();
          this.setLastVisible();
        }
      });
      this.childDestroyFuncs.push(() => pivotModeListener());
    }
    this.initialised = true;
  }
  setPivotModeSectionVisible(visible) {
    if (!this.isRowGroupingModuleLoaded()) {
      return;
    }
    if (this.pivotModePanel) {
      this.pivotModePanel.setDisplayed(visible);
    } else if (visible) {
      this.pivotModePanel = this.createBean(new PivotModePanel());
      this.getGui().insertBefore(this.pivotModePanel.getGui(), this.getGui().firstChild);
      this.childDestroyFuncs.push(() => this.destroyBean(this.pivotModePanel));
    }
    this.setLastVisible();
  }
  setRowGroupsSectionVisible(visible) {
    if (!this.isRowGroupingModuleLoaded()) {
      return;
    }
    if (this.rowGroupDropZonePanel) {
      this.rowGroupDropZonePanel.setDisplayed(visible);
    } else if (visible) {
      this.rowGroupDropZonePanel = this.createManagedBean(new RowGroupDropZonePanel(false));
      this.appendChild(this.rowGroupDropZonePanel);
    }
    this.setLastVisible();
  }
  setValuesSectionVisible(visible) {
    if (!this.isRowGroupingModuleLoaded()) {
      return;
    }
    if (this.valuesDropZonePanel) {
      this.valuesDropZonePanel.setDisplayed(visible);
    } else if (visible) {
      this.valuesDropZonePanel = this.createManagedBean(new ValuesDropZonePanel(false));
      this.appendChild(this.valuesDropZonePanel);
    }
    this.setLastVisible();
  }
  setPivotSectionVisible(visible) {
    if (!this.isRowGroupingModuleLoaded()) {
      return;
    }
    if (this.pivotDropZonePanel) {
      this.pivotDropZonePanel.setDisplayed(visible);
    } else if (visible) {
      this.pivotDropZonePanel = this.createManagedBean(new PivotDropZonePanel(false));
      this.appendChild(this.pivotDropZonePanel);
      this.pivotDropZonePanel.setDisplayed(visible);
    }
    this.setLastVisible();
  }
  setResizers() {
    [this.primaryColsPanel, this.rowGroupDropZonePanel, this.valuesDropZonePanel, this.pivotDropZonePanel].forEach(
      (panel) => {
        if (!panel) {
          return;
        }
        const eGui = panel.getGui();
        panel.toggleResizable(
          !eGui.classList.contains("ag-last-column-drop") && !eGui.classList.contains("ag-hidden")
        );
      }
    );
  }
  setLastVisible() {
    const eGui = this.getGui();
    const columnDrops = Array.prototype.slice.call(eGui.querySelectorAll(".ag-column-drop"));
    columnDrops.forEach((columnDrop) => columnDrop.classList.remove("ag-last-column-drop"));
    const columnDropEls = eGui.querySelectorAll(".ag-column-drop:not(.ag-hidden)");
    const lastVisible = _last(columnDropEls);
    if (lastVisible) {
      lastVisible.classList.add("ag-last-column-drop");
    }
    this.setResizers();
  }
  resetChildrenHeight() {
    const eGui = this.getGui();
    const children = eGui.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.style.removeProperty("height");
      child.style.removeProperty("flex");
    }
  }
  isRowGroupingModuleLoaded() {
    return ModuleRegistry.__assertRegistered(ModuleNames.RowGroupingModule, "Row Grouping", this.gridId);
  }
  expandColumnGroups(groupIds) {
    this.primaryColsPanel.expandGroups(groupIds);
  }
  collapseColumnGroups(groupIds) {
    this.primaryColsPanel.collapseGroups(groupIds);
  }
  setColumnLayout(colDefs) {
    this.primaryColsPanel.setColumnLayout(colDefs);
  }
  syncLayoutWithGrid() {
    this.primaryColsPanel.syncLayoutWithGrid();
  }
  destroyChildren() {
    this.childDestroyFuncs.forEach((func) => func());
    this.childDestroyFuncs.length = 0;
    _clearElement(this.getGui());
  }
  refresh(params) {
    this.destroyChildren();
    this.init(params);
    return true;
  }
  getState() {
    return {
      expandedGroupIds: this.primaryColsPanel.getExpandedGroups()
    };
  }
  // this is a user component, and IComponent has "public destroy()" as part of the interface.
  // so this must be public.
  destroy() {
    this.destroyChildren();
    super.destroy();
  }
};

// enterprise-modules/column-tool-panel/src/columnToolPanel/modelItemUtils.ts
import { BeanStub as BeanStub2 } from "@ag-grid-community/core";
var ModelItemUtils = class extends BeanStub2 {
  constructor() {
    super(...arguments);
    this.beanName = "modelItemUtils";
  }
  wireBeans(beans) {
    this.aggFuncService = beans.aggFuncService;
    this.columnModel = beans.columnModel;
    this.columnApplyStateService = beans.columnApplyStateService;
  }
  selectAllChildren(colTree, selectAllChecked, eventType) {
    const cols = this.extractAllLeafColumns(colTree);
    this.setAllColumns(cols, selectAllChecked, eventType);
  }
  setColumn(col, selectAllChecked, eventType) {
    this.setAllColumns([col], selectAllChecked, eventType);
  }
  setAllColumns(cols, selectAllChecked, eventType) {
    if (this.columnModel.isPivotMode()) {
      this.setAllPivot(cols, selectAllChecked, eventType);
    } else {
      this.setAllVisible(cols, selectAllChecked, eventType);
    }
  }
  extractAllLeafColumns(allItems) {
    const res = [];
    const recursiveFunc = (items) => {
      items.forEach((item) => {
        if (!item.isPassesFilter()) {
          return;
        }
        if (item.isGroup()) {
          recursiveFunc(item.getChildren());
        } else {
          res.push(item.getColumn());
        }
      });
    };
    recursiveFunc(allItems);
    return res;
  }
  setAllVisible(columns, visible, eventType) {
    const colStateItems = [];
    columns.forEach((col) => {
      if (col.getColDef().lockVisible) {
        return;
      }
      if (col.isVisible() != visible) {
        colStateItems.push({
          colId: col.getId(),
          hide: !visible
        });
      }
    });
    if (colStateItems.length > 0) {
      this.columnApplyStateService.applyColumnState({ state: colStateItems }, eventType);
    }
  }
  setAllPivot(columns, value, eventType) {
    this.setAllPivotActive(columns, value, eventType);
  }
  setAllPivotActive(columns, value, eventType) {
    const colStateItems = [];
    const turnOnAction = (col) => {
      if (col.isAnyFunctionActive()) {
        return;
      }
      if (col.isAllowValue()) {
        const aggFunc = typeof col.getAggFunc() === "string" ? col.getAggFunc() : this.aggFuncService?.getDefaultAggFunc(col);
        colStateItems.push({
          colId: col.getId(),
          aggFunc
        });
      } else if (col.isAllowRowGroup()) {
        colStateItems.push({
          colId: col.getId(),
          rowGroup: true
        });
      } else if (col.isAllowPivot()) {
        colStateItems.push({
          colId: col.getId(),
          pivot: true
        });
      }
    };
    const turnOffAction = (col) => {
      const isActive = col.isPivotActive() || col.isRowGroupActive() || col.isValueActive();
      if (isActive) {
        colStateItems.push({
          colId: col.getId(),
          pivot: false,
          rowGroup: false,
          aggFunc: null
        });
      }
    };
    const action = value ? turnOnAction : turnOffAction;
    columns.forEach(action);
    if (colStateItems.length > 0) {
      this.columnApplyStateService.applyColumnState({ state: colStateItems }, eventType);
    }
  }
  updateColumns(params) {
    const { columns, visibleState, pivotState, eventType } = params;
    const state = columns.map((column) => {
      const colId = column.getColId();
      if (this.columnModel.isPivotMode()) {
        const pivotStateForColumn = pivotState?.[colId];
        return {
          colId,
          pivot: pivotStateForColumn?.pivot,
          rowGroup: pivotStateForColumn?.rowGroup,
          aggFunc: pivotStateForColumn?.aggFunc
        };
      } else {
        return {
          colId,
          hide: !visibleState?.[colId]
        };
      }
    });
    this.columnApplyStateService.applyColumnState({ state }, eventType);
  }
  createPivotState(column) {
    return {
      pivot: column.isPivotActive(),
      rowGroup: column.isRowGroupActive(),
      aggFunc: column.isValueActive() ? column.getAggFunc() : void 0
    };
  }
};

// enterprise-modules/column-tool-panel/src/version.ts
var VERSION = "32.0.2";

// enterprise-modules/column-tool-panel/src/columnsToolPanelModule.ts
var ColumnsToolPanelModule = {
  version: VERSION,
  moduleName: ModuleNames2.ColumnsToolPanelModule,
  beans: [ModelItemUtils],
  userComponents: [
    { name: "agColumnsToolPanel", classImp: ColumnToolPanel },
    {
      name: "agMenuItem",
      classImp: AgMenuItemRenderer
    }
  ],
  dependantModules: [EnterpriseCoreModule, RowGroupingModule, SideBarModule]
};
export {
  AgPrimaryCols,
  ColumnsToolPanelModule
};
