'use strict';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import type { ColDef, GridOptions, GridTheme } from '@ag-grid-community/core';
import { createGrid } from '@ag-grid-community/core';
import { applyCustomProperties, themeBalham, themeMaterial, themeQuartz } from '@ag-grid-community/theming';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: ColDef[] = [{ field: 'make' }, { field: 'model' }, { field: 'price' }];

const rowData: any[] = (() => {
    const rowData: any[] = [];
    for (let i = 0; i < 10; i++) {
        rowData.push({ make: 'Toyota', model: 'Celica', price: 35000 + i * 1000 });
        rowData.push({ make: 'Ford', model: 'Mondeo', price: 32000 + i * 1000 });
        rowData.push({ make: 'Porsche', model: 'Boxster', price: 72000 + i * 1000 });
    }
    return rowData;
})();

const defaultColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
};

const createThemedGrid = (theme: GridTheme, selector: string) => {
    const gridOptions: GridOptions<IOlympicData> = {
        theme,
        columnDefs,
        rowData,
        defaultColDef,
    };
    createGrid(document.querySelector<HTMLElement>(selector)!, gridOptions);
};

createThemedGrid(themeQuartz, '#grid1');
createThemedGrid(themeMaterial, '#grid2');
createThemedGrid(themeBalham, '#grid3');
createThemedGrid(themeBalham, '#grid4');

applyCustomProperties({ headerBackgroundColor: '#33cc3344' }, document.getElementById('grid3')!);
applyCustomProperties({ headerBackgroundColor: '#cc222244' }, document.getElementById('grid4')!);
