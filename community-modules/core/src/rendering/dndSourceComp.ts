import { Component } from "../widgets/component";
import { PostConstruct } from "../context/context";
import { RowNode } from "../entities/rowNode";
import { Column } from "../entities/column";
import { createIconNoSpan } from "../utils/icon";
import { DndSourceOnRowDragParams } from "../entities/colDef";

export class DndSourceComp extends Component {

    readonly #rowNode: RowNode;
    readonly #column: Column;
    readonly #eCell: HTMLElement;

    constructor(rowNode: RowNode, column: Column, eCell: HTMLElement) {
        super(/* html */ `<div class="ag-drag-handle ag-row-drag" draggable="true"></div>`);
        this.#rowNode = rowNode;
        this.#column = column;
        this.#eCell = eCell;
    }

    @PostConstruct
    private postConstruct(): void {
        const eGui = this.getGui();
        eGui.appendChild(createIconNoSpan('rowDrag', this.gos, null)!);
        // we need to stop the event propagation here to avoid starting a range selection while dragging
        this.addGuiEventListener('mousedown', (e: MouseEvent) => {
            e.stopPropagation();
        });
        this.#addDragSource();
        this.#checkVisibility();
    }

    #addDragSource(): void {
        this.addGuiEventListener('dragstart', this.#onDragStart.bind(this));
    }

    #onDragStart(dragEvent: DragEvent): void {

        const providedOnRowDrag = this.#column.getColDef().dndSourceOnRowDrag;

        dragEvent.dataTransfer!.setDragImage(this.#eCell, 0, 0);

        // default behaviour is to convert data to json and set into drag component
        const defaultOnRowDrag = () => {
            try {
                const jsonData = JSON.stringify(this.#rowNode.data);

                dragEvent.dataTransfer!.setData('application/json', jsonData);
                dragEvent.dataTransfer!.setData('text/plain', jsonData);

            } catch (e) {
                // if we cannot convert the data to json, then we do not set the type
            }
        };

        if (providedOnRowDrag) {
            const params: DndSourceOnRowDragParams = this.gos.addGridCommonParams({
                rowNode: this.#rowNode, dragEvent: dragEvent
            });
            providedOnRowDrag(params);
        } else {
            defaultOnRowDrag();
        }
    }

    #checkVisibility(): void {
        const visible = this.#column.isDndSource(this.#rowNode);
        this.setDisplayed(visible);
    }
}
