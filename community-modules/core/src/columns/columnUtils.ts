import type { Context } from '../context/context';
import { isColumn } from '../entities/agColumn';
import type { AgColumn } from '../entities/agColumn';
import { isProvidedColumnGroup } from '../entities/agProvidedColumnGroup';
import type { AgProvidedColumnGroup } from '../entities/agProvidedColumnGroup';
import type { ColumnInstanceId } from '../interfaces/iColumn';
import { _warnOnce } from '../utils/function';
import { depthFirstOriginalTreeSearch } from './columnFactory';
import { CONTROLS_COLUMN_ID_PREFIX } from './controlsColService';

export const GROUP_AUTO_COLUMN_ID = 'ag-Grid-AutoColumn' as const;

// Possible candidate for reuse (alot of recursive traversal duplication)
export function getColumnsFromTree(rootColumns: (AgColumn | AgProvidedColumnGroup)[]): AgColumn[] {
    const result: AgColumn[] = [];

    const recursiveFindColumns = (childColumns: (AgColumn | AgProvidedColumnGroup)[]): void => {
        for (let i = 0; i < childColumns.length; i++) {
            const child = childColumns[i];
            if (isColumn(child)) {
                result.push(child);
            } else if (isProvidedColumnGroup(child)) {
                recursiveFindColumns(child.getChildren());
            }
        }
    };

    recursiveFindColumns(rootColumns);

    return result;
}

export function getWidthOfColsInList(columnList: AgColumn[]) {
    return columnList.reduce((width, col) => width + col.getActualWidth(), 0);
}

export function destroyColumnTree(
    context: Context,
    oldTree: (AgColumn | AgProvidedColumnGroup)[] | null | undefined,
    newTree?: (AgColumn | AgProvidedColumnGroup)[] | null
): void {
    const oldObjectsById: { [id: ColumnInstanceId]: (AgColumn | AgProvidedColumnGroup) | null } = {};

    if (!oldTree) {
        return;
    }

    // add in all old columns to be destroyed
    depthFirstOriginalTreeSearch(null, oldTree, (child) => {
        oldObjectsById[child.getInstanceId()] = child;
    });

    // however we don't destroy anything in the new tree. if destroying the grid, there is no new tree
    if (newTree) {
        depthFirstOriginalTreeSearch(null, newTree, (child) => {
            oldObjectsById[child.getInstanceId()] = null;
        });
    }

    // what's left can be destroyed
    const colsToDestroy = Object.values(oldObjectsById).filter((item) => item != null);
    context.destroyBeans(colsToDestroy);
}

export function isColumnGroupAutoCol(col: AgColumn): boolean {
    const colId = col.getId();
    return colId.startsWith(GROUP_AUTO_COLUMN_ID);
}

export function isColumnControlsCol(col: AgColumn): boolean {
    return col.getColId().startsWith(CONTROLS_COLUMN_ID_PREFIX);
}

export function convertColumnTypes(type: string | string[]): string[] {
    let typeKeys: string[] = [];

    if (type instanceof Array) {
        const invalidArray = type.some((a) => typeof a !== 'string');
        if (invalidArray) {
            _warnOnce("if colDef.type is supplied an array it should be of type 'string[]'");
        } else {
            typeKeys = type;
        }
    } else if (typeof type === 'string') {
        typeKeys = type.split(',');
    } else {
        _warnOnce("colDef.type should be of type 'string' | 'string[]'");
    }
    return typeKeys;
}
