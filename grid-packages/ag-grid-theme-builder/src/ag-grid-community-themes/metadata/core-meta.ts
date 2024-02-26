import { definePartMeta } from './metadata-types';

export const coreMeta = definePartMeta({
  partId: 'core',
  params: [
    {
      property: 'backgroundColor',
      type: 'color',
      docs: 'Background colour of the grid. The default is white - if you override this, ensure that there is enough contrast between the foreground and background.',
      defaultValue: '#FFF',
    },
    {
      property: 'foregroundColor',
      type: 'color',
      docs: 'Foreground colour of the grid, and default text colour. The default is black - if you override this, ensure that there is enough contrast between the foreground and background.',
      defaultValue: '#181d1f',
    },
    {
      property: 'accentColor',
      type: 'color',
      docs: "The 'brand colour' for the grid, used wherever a non-neutral colour is required. Selections, focus outlines and checkboxes use the accent colour by default.",
      defaultValue: '#2196f3',
    },
    {
      property: 'borderColor',
      type: 'color',
      docs: 'Default colour for borders.',
      defaultValue: { helper: 'transparentForeground', arg: 0.15 },
    },
    {
      property: 'wrapperBorder',
      type: 'border',
      docs: 'Borders around the outside of the grid',
      defaultValue: true,
    },
    {
      property: 'headerBorder',
      type: 'border',
      docs: 'Borders between and below headers, including ordinary header rows and components that render within header rows such as the floating filter and advanced filter',
      defaultValue: true,
    },
    {
      property: 'rowBorder',
      type: 'border',
      docs: 'Borders between rows.',
      defaultValue: true,
    },
    {
      property: 'footerBorder',
      type: 'border',
      docs: 'Horizontal borders above footer components like the pagination and status bars',
      defaultValue: true,
    },
    {
      property: 'columnBorder',
      type: 'border',
      docs: 'Vertical borders separating columns.',
      defaultValue: false,
    },
    {
      property: 'pinnedColumnBorder',
      type: 'border',
      docs: 'Borders between the grid and columns that are pinned to the left or right',
      defaultValue: true,
    },
    {
      property: 'pinnedRowBorder',
      type: 'border',
      docs: 'Borders between the grid and rows that are pinned to the top or bottom',
      defaultValue: true,
    },
    {
      property: 'sidePanelBorder',
      type: 'border',
      docs: 'Borders between the grid and side panels including the column and filter tool bars, and chart settings',
      defaultValue: true,
    },
    {
      property: 'sideButtonSelectedBorder',
      type: 'border',
      docs: 'Border around the selected sidebar button on the side panel',
      defaultValue: true,
    },
    {
      property: 'sideButtonSelectedBackgroundColor',
      type: 'color',
      docs: 'Border around the selected sidebar button on the side panel',
      defaultValue: { helper: 'ref', arg: 'backgroundColor' },
    },
    {
      property: 'sideBarBackgroundColor',
      type: 'color',
      docs: 'Background colour for non-data areas of the grid. Headers, tool panels and menus use this colour by default.',
      defaultValue: { helper: 'ref', arg: 'chromeBackgroundColor' },
    },
    {
      property: 'fontFamily',
      type: 'css',
      docs: 'Font family used for all text.',
      defaultValue:
        "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
    },
    {
      property: 'chromeBackgroundColor',
      type: 'color',
      docs: 'Background colour for non-data areas of the grid. Headers, tool panels and menus use this colour by default.',
      defaultValue: { helper: 'transparentForeground', arg: 0.02 },
    },
    {
      property: 'headerBackgroundColor',
      type: 'color',
      docs: 'Background colour for non-data areas of the grid. Headers, tool panels and menus use this colour by default.',
      defaultValue: { helper: 'ref', arg: 'chromeBackgroundColor' },
    },
    {
      property: 'headerForegroundColor',
      type: 'color',
      docs: 'Background colour for non-data areas of the grid. Headers, tool panels and menus use this colour by default.',
      defaultValue: { helper: 'ref', arg: 'foregroundColor' },
    },
    {
      property: 'dataColor',
      type: 'color',
      docs: 'Colour of text in grid cells.',
      defaultValue: { helper: 'ref', arg: 'foregroundColor' },
    },
    {
      property: 'rangeSelectionBorderStyle',
      type: 'borderStyle',
      docs: 'Style of the border around range selections.',
      defaultValue: 'solid',
    },
    {
      property: 'rangeSelectionBorderColor',
      type: 'color',
      docs: 'The color used for borders around range selections. The selection background defaults to a semi-transparent version of this colour.',
      defaultValue: { helper: 'ref', arg: 'accentColor' },
    },
    {
      property: 'rangeSelectionBackgroundColor',
      type: 'color',
      docs: 'Background colour of selected cell ranges. Choosing a semi-transparent colour ensure that multiple overlapping ranges look correct.',
      defaultValue: { helper: 'transparentAccent', arg: 0.2 },
    },
    {
      property: 'rangeSelectionChartBackgroundColor',
      type: 'color',
      docs: 'Background colour for cells that provide data to the current range chart',
      defaultValue: '#0058FF1A',
    },
    {
      property: 'rangeSelectionChartCategoryBackgroundColor',
      type: 'color',
      docs: 'Background colour for cells that provide categories to the current range chart',
      defaultValue: '#00FF841A',
    },
    {
      property: 'rangeSelectionHighlightColor',
      type: 'color',
      docs: 'Background colour to briefly apply to a cell range when the user copies from or pastes into it.',
      defaultValue: { helper: 'transparentAccent', arg: 0.5 },
    },
    {
      property: 'rowHoverColor',
      type: 'color',
      docs: 'Background color when hovering over rows in the grid and in dropdown menus. Set to `transparent` to disable the hover effect. Note: if you want a rollover on one but not the other, use CSS selectors instead of this property.',
      defaultValue: { helper: 'transparentAccent', arg: 0.12 },
    },
    {
      property: 'columnHoverColor',
      type: 'color',
      docs: 'Background color when hovering over columns in the grid',
      defaultValue: { helper: 'transparentAccent', arg: 0.05 },
    },
    {
      property: 'selectedRowBackgroundColor',
      type: 'color',
      docs: 'Background color of selected rows in the grid and in dropdown menus.',
      defaultValue: { helper: 'transparentAccent', arg: 0.08 },
    },
    {
      property: 'modalOverlayBackgroundColor',
      type: 'color',
      docs: 'Background color of the overlay shown over the grid e.g. a data loading indicator.',
      defaultValue: { helper: 'transparentBackground', arg: 0.08 },
    },
    {
      property: 'oddRowBackgroundColor',
      type: 'color',
      docs: 'Background colour applied to every other row',
      defaultValue: { helper: 'ref', arg: 'backgroundColor' },
    },
    {
      property: 'borderRadius',
      type: 'length',
      docs: 'Border radius applied to many elements such as menus, dialogs and form widgets.',
      defaultValue: '4px',
      min: 0,
      max: 20,
      step: 1,
    },
    {
      property: 'wrapperBorderRadius',
      type: 'length',
      defaultValue: '8px',
      min: 0,
      max: 20,
      step: 1,
      docs: 'Border radius applied to the outermost container around the grid.',
    },
    {
      property: 'cellWidgetSpacing',
      type: 'length',
      docs: 'Horizontal spacing between widgets inside cells (e.g. row group expand buttons and row selection checkboxes).',
      defaultValue: { helper: 'calc', arg: 'gridSize * 1.5' },
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'rowGroupIndentSize',
      type: 'length',
      docs: 'The indentation applied to each level of row grouping - deep rows are indented by a multiple of this value.',
      defaultValue: { helper: 'calc', arg: 'cellWidgetSpacing + iconSize' },
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'valueChangeDeltaUpColor',
      type: 'color',
      docs: 'Colour to temporarily apply to cell data when its value increases in an agAnimateShowChangeCellRenderer cell',
      defaultValue: '#43a047',
    },
    {
      property: 'valueChangeDeltaDownColor',
      type: 'color',
      docs: 'Colour to temporarily apply to cell data when its value decreases in an agAnimateShowChangeCellRenderer cell',
      defaultValue: '#e53935',
    },
    {
      property: 'valueChangeValueHighlightBackgroundColor',
      type: 'color',
      docs: 'Colour to apply when a cell value changes and enableCellChangeFlash is enabled',
      defaultValue: '#16a08580',
    },
    {
      property: 'gridSize',
      type: 'length',
      docs: 'Control how tightly data and UI elements are packed together. All padding and spacing in the grid is defined as a multiple of the grid size, so increasing it will make most components larger by increasing their internal white space while leaving the size of text and icons unchanged.',
      defaultValue: '8px',
      min: 0,
      max: 50,
      step: 0.5,
    },
    {
      property: 'cellHorizontalPadding',
      type: 'length',
      docs: 'Colour to apply when a cell value changes and enableCellChangeFlash is enabled',
      defaultValue: { helper: 'calc', arg: 'gridSize * 2' },
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'fontSize',
      type: 'length',
      docs: 'Height of grid rows',
      defaultValue: '14px',
      min: 8,
      max: 50,
      step: 1,
    },
    {
      property: 'rowHeight',
      type: 'length',
      docs: 'Height of grid rows',
      defaultValue: { helper: 'calc', arg: 'fontSize + gridSize * 3.5' },
      min: 8,
      max: 50,
      step: 1,
    },
    {
      property: 'headerHeight',
      type: 'length',
      docs: 'Height of header rows',
      defaultValue: { helper: 'calc', arg: 'fontSize + gridSize * 4.25' },
      min: 8,
      max: 50,
      step: 1,
    },
    {
      property: 'popupShadow',
      type: 'css',
      docs: 'Default shadow for elements that float above the grid e.g. dialogs and menus',
      defaultValue: '0 0 16px 0 #00000026',
    },
    {
      property: 'dropdownShadow',
      type: 'css',
      docs: 'Default shadow for dropdown menus',
      defaultValue: '0 1px 4px 1px #babfc766',
    },
    {
      property: 'dragGhostBackgroundColor',
      type: 'color',
      docs: 'Background colour of the ghost element when dragging columns',
      defaultValue: { helper: 'ref', arg: 'backgroundColor' },
    },
    {
      property: 'dragGhostBorder',
      type: 'border',
      docs: 'Border colour of the ghost element when dragging columns',
      defaultValue: true,
    },
    {
      property: 'insetFocusShadow',
      type: 'css',
      docs: 'Border colour of the ghost element when dragging columns',
      defaultValue: 'inset 0 0 5px var(--ag-accent-color)',
    },
    {
      property: 'sideBarPanelWidth',
      type: 'length',
      docs: 'Default width of the sidebar that contains the columns and filters tool panels',
      defaultValue: '250px',
      min: 100,
      max: 500,
      step: 1,
    },
  ],
});
