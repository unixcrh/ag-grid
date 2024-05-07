import { Component } from "../../widgets/component";
import { ICellRendererComp, ICellRendererParams } from "../cellRenderers/iCellRenderer";
import { Beans } from "../beans";
import { addStylesToElement, setDomChildOrder } from "../../utils/dom";
import { IRowComp, RowCtrl } from "./rowCtrl";
import { CellComp } from "../cell/cellComp";
import { getAllValuesInObject } from "../../utils/object";
import { setAriaRole } from "../../utils/aria";
import { CellCtrl, CellCtrlInstanceId } from "../cell/cellCtrl";
import { UserCompDetails } from "../../components/framework/userComponentFactory";
import { RowContainerType } from "../../gridBodyComp/rowContainer/rowContainerCtrl";
import { RowStyle } from "../../entities/gridOptions";

export class RowComp extends Component {

    #fullWidthCellRenderer: ICellRendererComp | null | undefined;

    #beans: Beans;

    #rowCtrl: RowCtrl;

    #domOrder: boolean;
    #cellComps: { [key: CellCtrlInstanceId]: CellComp | null; } = {};

    constructor(ctrl: RowCtrl, beans: Beans, containerType: RowContainerType) {
        super();

        this.#beans = beans;
        this.#rowCtrl = ctrl;

        const rowDiv = document.createElement('div');
        rowDiv.setAttribute('comp-id', `${this.getCompId()}`);
        rowDiv.setAttribute('style', this.#getInitialStyle(containerType));
        this.setTemplateFromElement(rowDiv);

        const eGui = this.getGui();
        const style = eGui.style;
        this.#domOrder = this.#rowCtrl.getDomOrder();
        setAriaRole(eGui, 'row');
        const tabIndex = this.#rowCtrl.getTabIndex();
        if (tabIndex != null) {
            eGui.setAttribute('tabindex', tabIndex.toString());
        }

        const compProxy: IRowComp = {
            setDomOrder: domOrder => this.#domOrder = domOrder,
            setCellCtrls: cellCtrls => this.#setCellCtrls(cellCtrls),
            showFullWidth: compDetails => this.#showFullWidth(compDetails),
            getFullWidthCellRenderer: () => this.#getFullWidthCellRenderer(),
            addOrRemoveCssClass: (name, on) => this.addOrRemoveCssClass(name, on),
            setUserStyles: (styles: RowStyle | undefined) => addStylesToElement(eGui, styles),
            setTop: top => style.top = top,
            setTransform: transform => style.transform = transform,
            setRowIndex: rowIndex => eGui.setAttribute('row-index', rowIndex),
            setRowId: (rowId: string) => eGui.setAttribute('row-id', rowId),
            setRowBusinessKey: businessKey => eGui.setAttribute('row-business-key', businessKey),
            refreshFullWidth: getUpdatedParams => this.#refreshFullWidth(getUpdatedParams)
        };

        ctrl.setComp(compProxy, this.getGui(), containerType);
        this.addDestroyFunc(() => {
            ctrl.unsetComp(containerType);
        });
    }

    #getInitialStyle(containerType: RowContainerType): string {
        const transform = this.#rowCtrl.getInitialTransform(containerType);
        return transform ? `transform: ${transform}` : `top: ${this.#rowCtrl.getInitialRowTop(containerType)}`;
    }

    #showFullWidth(compDetails: UserCompDetails): void {
        const callback = (cellRenderer: ICellRendererComp) => {
            if (this.isAlive()) {
                const eGui = cellRenderer.getGui();
                this.getGui().appendChild(eGui);
                this.#rowCtrl.setupDetailRowAutoHeight(eGui);
                this.#setFullWidthRowComp(cellRenderer);
            } else {
                this.#beans.context.destroyBean(cellRenderer);
            }
        };

        // if not in cache, create new one
        const res = compDetails.newAgStackInstance();

        if (!res) { return; }

        res.then(callback);
    }

    #setCellCtrls(cellCtrls: CellCtrl[]): void {
        const cellsToRemove = Object.assign({}, this.#cellComps);

        cellCtrls.forEach(cellCtrl => {
            const key = cellCtrl.getInstanceId();
            const existingCellComp = this.#cellComps[key];

            if (existingCellComp == null) {
                this.#newCellComp(cellCtrl);
            } else {
                cellsToRemove[key] = null;
            }
        });

        const cellCompsToRemove = getAllValuesInObject(cellsToRemove)
            .filter(cellComp => cellComp != null);

        this.#destroyCells(cellCompsToRemove as CellComp[]);
        this.#ensureDomOrder(cellCtrls);
    }

    #ensureDomOrder(cellCtrls: CellCtrl[]): void {
        if (!this.#domOrder) { return; }

        const elementsInOrder: HTMLElement[] = [];
        cellCtrls.forEach(cellCtrl => {
            const cellComp = this.#cellComps[cellCtrl.getInstanceId()];
            if (cellComp) {
                elementsInOrder.push(cellComp.getGui());
            }
        });

        setDomChildOrder(this.getGui(), elementsInOrder);
    }

    #newCellComp(cellCtrl: CellCtrl): void {
        const cellComp = new CellComp(this.#beans, cellCtrl,
            this.#rowCtrl.isPrintLayout(), this.getGui(), this.#rowCtrl.isEditing());
        this.#cellComps[cellCtrl.getInstanceId()] = cellComp;
        this.getGui().appendChild(cellComp.getGui());
    }

    public destroy(): void {
        super.destroy();
        this.#destroyAllCells();
    }

    #destroyAllCells(): void {
        const cellsToDestroy = getAllValuesInObject(this.#cellComps).filter(cp => cp != null);
        this.#destroyCells(cellsToDestroy as CellComp[]);
    }

    #setFullWidthRowComp(fullWidthRowComponent: ICellRendererComp): void {
        if (this.#fullWidthCellRenderer) {
            console.error('AG Grid - should not be setting fullWidthRowComponent twice');
        }

        this.#fullWidthCellRenderer = fullWidthRowComponent;
        this.addDestroyFunc(() => {
            this.#fullWidthCellRenderer = this.#beans.context.destroyBean(this.#fullWidthCellRenderer);
        });
    }

    #getFullWidthCellRenderer(): ICellRendererComp | null | undefined {
        return this.#fullWidthCellRenderer;
    }

    #destroyCells(cellComps: CellComp[]): void {
        cellComps.forEach(cellComp => {

            // could be old reference, ie removed cell
            if (!cellComp) { return; }

            // check cellComp belongs in this container
            const instanceId = cellComp.getCtrl().getInstanceId();
            if (this.#cellComps[instanceId] !== cellComp) {return; }

            cellComp.detach();
            cellComp.destroy();
            this.#cellComps[instanceId] = null;
        });
    }

    #refreshFullWidth(getUpdatedParams: () => ICellRendererParams): boolean {
        const fullWidthCellRenderer  = this.#fullWidthCellRenderer;
        if (!fullWidthCellRenderer || !fullWidthCellRenderer.refresh) {
            return false;
        }

        const params = getUpdatedParams();

        return fullWidthCellRenderer.refresh(params);
    }
}
