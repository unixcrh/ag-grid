var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// enterprise-modules/rich-select/src/main.ts
var main_exports = {};
__export(main_exports, {
  RichSelectModule: () => RichSelectModule
});
module.exports = __toCommonJS(main_exports);

// enterprise-modules/rich-select/src/richSelectModule.ts
var import_core3 = require("@ag-grid-community/core");
var import_core4 = require("@ag-grid-enterprise/core");

// enterprise-modules/rich-select/src/richSelect/richSelectCellEditor.ts
var import_core = require("@ag-grid-community/core");
var import_core2 = require("@ag-grid-enterprise/core");
var RichSelectCellEditor = class extends import_core.PopupComponent {
  constructor() {
    super(
      /* html */
      `<div class="ag-cell-edit-wrapper"></div>`
    );
  }
  init(params) {
    this.params = params;
    const { cellStartedEdit, values } = params;
    if ((0, import_core._missing)(values)) {
      (0, import_core._warnOnce)("agRichSelectCellEditor requires cellEditorParams.values to be set");
    }
    const { params: richSelectParams, valuesPromise } = this.buildRichSelectParams();
    this.richSelect = this.createManagedBean(new import_core2.AgRichSelect(richSelectParams));
    this.richSelect.addCssClass("ag-cell-editor");
    this.appendChild(this.richSelect);
    if (valuesPromise) {
      valuesPromise.then((values2) => {
        this.richSelect.setValueList({ valueList: values2, refresh: true });
        const searchStringCallback = this.getSearchStringCallback(values2);
        if (searchStringCallback) {
          this.richSelect.setSearchStringCreator(searchStringCallback);
        }
      });
    }
    this.addManagedListeners(this.richSelect, {
      fieldPickerValueSelected: this.onEditorPickerValueSelected.bind(this)
    });
    this.focusAfterAttached = cellStartedEdit;
  }
  onEditorPickerValueSelected(e) {
    setTimeout(() => this.params.stopEditing(!e.fromEnterKey));
  }
  buildRichSelectParams() {
    const {
      cellRenderer,
      cellHeight,
      value,
      values,
      formatValue,
      searchDebounceDelay,
      valueListGap,
      valueListMaxHeight,
      valueListMaxWidth,
      allowTyping,
      filterList,
      searchType,
      highlightMatch,
      valuePlaceholder,
      eventKey,
      multiSelect,
      suppressDeselectAll,
      suppressMultiSelectPillRenderer
    } = this.params;
    const ret = {
      value,
      cellRenderer,
      cellRowHeight: cellHeight,
      searchDebounceDelay,
      valueFormatter: formatValue,
      pickerAriaLabelKey: "ariaLabelRichSelectField",
      pickerAriaLabelValue: "Rich Select Field",
      pickerType: "virtual-list",
      pickerGap: valueListGap,
      allowTyping,
      filterList,
      searchType,
      highlightMatch,
      maxPickerHeight: valueListMaxHeight,
      maxPickerWidth: valueListMaxWidth,
      placeholder: valuePlaceholder,
      initialInputValue: eventKey?.length === 1 ? eventKey : void 0,
      multiSelect,
      suppressDeselectAll,
      suppressMultiSelectPillRenderer
    };
    let valuesResult;
    let valuesPromise;
    if (typeof values === "function") {
      valuesResult = values(this.params);
    } else {
      valuesResult = values ?? [];
    }
    if (Array.isArray(valuesResult)) {
      ret.valueList = valuesResult;
      ret.searchStringCreator = this.getSearchStringCallback(valuesResult);
    } else {
      valuesPromise = valuesResult;
    }
    if (multiSelect && allowTyping) {
      this.params.allowTyping = ret.allowTyping = false;
      (0, import_core._warnOnce)(
        "agRichSelectCellEditor cannot have `multiSelect` and `allowTyping` set to `true`. AllowTyping has been turned off."
      );
    }
    return { params: ret, valuesPromise };
  }
  getSearchStringCallback(values) {
    const { colDef } = this.params;
    if (typeof values[0] !== "object" || !colDef.keyCreator) {
      return;
    }
    return (values2) => values2.map((value) => {
      const keyParams = this.gos.addGridCommonParams({
        value,
        colDef: this.params.colDef,
        column: this.params.column,
        node: this.params.node,
        data: this.params.data
      });
      return colDef.keyCreator(keyParams);
    });
  }
  // we need to have the gui attached before we can draw the virtual rows, as the
  // virtual row logic needs info about the gui state
  afterGuiAttached() {
    const { focusAfterAttached, params } = this;
    setTimeout(() => {
      if (!this.isAlive()) {
        return;
      }
      if (focusAfterAttached) {
        const focusableEl = this.richSelect.getFocusableElement();
        focusableEl.focus();
        const { allowTyping, eventKey: eventKey2 } = this.params;
        if (allowTyping && (!eventKey2 || eventKey2.length !== 1)) {
          focusableEl.select();
        }
      }
      this.richSelect.showPicker();
      const { eventKey } = params;
      if (eventKey) {
        if (eventKey?.length === 1) {
          this.richSelect.searchTextFromString(eventKey);
        }
      }
    });
  }
  focusIn() {
    this.richSelect.getFocusableElement().focus();
  }
  getValue() {
    return this.richSelect.getValue();
  }
  isPopup() {
    return false;
  }
};

// enterprise-modules/rich-select/src/version.ts
var VERSION = "32.0.2";

// enterprise-modules/rich-select/src/richSelectModule.ts
var RichSelectModule = {
  version: VERSION,
  moduleName: import_core3.ModuleNames.RichSelectModule,
  beans: [],
  userComponents: [
    { name: "agRichSelect", classImp: RichSelectCellEditor },
    { name: "agRichSelectCellEditor", classImp: RichSelectCellEditor }
  ],
  dependantModules: [import_core4.EnterpriseCoreModule, import_core3._EditCoreModule]
};
