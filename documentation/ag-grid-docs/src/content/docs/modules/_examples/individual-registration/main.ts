import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, GridOptions, ModuleRegistry, createGrid } from '@ag-grid-community/core';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register shared Modules globally
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule]);

const columnDefs: ColDef[] = [{ field: 'id' }, { field: 'color' }, { field: 'value1' }];
const defaultColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
};

let rowIdSequence = 100;
function createRowBlock() {
    return ['Red', 'Green', 'Blue'].map((color) => ({
        id: rowIdSequence++,
        color: color,
        value1: Math.floor(Math.random() * 100),
    }));
}

const baseGridOptions: GridOptions = {
    defaultColDef: defaultColDef,
    columnDefs: columnDefs,
};

const leftGridOptions: GridOptions = {
    ...baseGridOptions,
    rowData: createRowBlock(),
};

const rightGridOptions: GridOptions = {
    ...baseGridOptions,
    rowData: createRowBlock(),
};

function loadGrid(side: string) {
    const grid = document.querySelector<HTMLElement>('#e' + side + 'Grid')!;
    let modules = side === 'Left' ? [SetFilterModule, ClipboardModule] : [ExcelExportModule];
    createGrid(grid, side === 'Left' ? leftGridOptions : rightGridOptions, { modules: modules });
}

loadGrid('Left');
loadGrid('Right');
