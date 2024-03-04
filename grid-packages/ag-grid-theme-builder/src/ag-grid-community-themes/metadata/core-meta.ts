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
      property: 'invalidColor',
      type: 'color',
      docs: 'The colour for inputs and UI controls in an invalid state.',
      defaultValue: '#e02525',
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
      docs: 'Borders between and below header rows.',
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
      docs: 'Background colour for header and header-like.',
      defaultValue: { helper: 'ref', arg: 'chromeBackgroundColor' },
    },
    {
      property: 'headerFontWeight',
      type: 'css',
      docs: 'Weight of text in the header',
      defaultValue: '500',
    },
    {
      property: 'headerForegroundColor',
      type: 'color',
      docs: 'Colour of text in the header',
      defaultValue: { helper: 'ref', arg: 'foregroundColor' },
    },
    {
      property: 'headerCellHoverBackgroundColor',
      type: 'color',
      docs: 'Rollover colour for header cells.',
      defaultValue: 'transparent',
    },
    {
      property: 'headerCellHoverBackgroundTransitionDuration',
      type: 'length',
      docs: 'Duration of header cell hover transition, if --ag-header-cell-hover-background-color is set.',
      defaultValue: '0.2s',
      min: 0,
      max: 10,
      step: 0.05,
    },
    {
      property: 'dataColor',
      type: 'color',
      docs: 'Colour of text in grid cells.',
      defaultValue: { helper: 'ref', arg: 'foregroundColor' },
    },
    {
      property: 'subtleForegroundColor',
      type: 'color',
      docs: 'Colour of text and UI elements that should stand out less than the default.',
      defaultValue: { helper: 'transparentForeground', arg: 0.5 },
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
      // TODO should be HighlightBackgroundColor, and add HighlightForegroundColor
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
      docs: 'Background color when hovering over columns in the grid. This is not visible unless enabled in the grid options.',
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
      property: 'labelWidgetSpacing',
      type: 'length',
      docs: 'Horizontal spacing between icons and text inside labels, e.g. in the header and sidebar tabs',
      defaultValue: { helper: 'ref', arg: 'gridSize' },
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
      property: 'dragGhostShadow',
      type: 'css',
      docs: 'Shadow for the ghost element when dragging columns',
      defaultValue: { helper: 'ref', arg: 'popupShadow' },
    },
    {
      property: 'focusShadow',
      type: 'css',
      docs: 'Shadow around UI controls that have focus e.g. text inputs and buttons. The value must a valid CSS box-shadow.',
      defaultValue: '0 0 0 3px color-mix(in srgb, transparent, var(--ag-accent-color) 50%)',
    },
    {
      property: 'insetFocusShadow',
      type: 'css',
      docs: "Shadow inside UI controls that have focus and aren't in a position where they can display a shadow outside of their bounds. The value must a valid CSS box-shadow value beginning with the `inset` keyword.",
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
    {
      property: 'headerColumnResizeHandleDisplay',
      type: 'css',
      docs: 'Whether to show an indicator of the drag handle on resizable header columns. If hidden, the handle will still be active but invisible.',
      defaultValue: 'block',
    },
    {
      property: 'headerColumnResizeHandleHeight',
      type: 'length',
      docs: 'Height of the drag handle on resizable header columns. Percentage values are relative to the header height.',
      defaultValue: '30%',
      min: 0,
      max: 100,
      step: 1,
    },
    {
      property: 'headerColumnResizeHandleWidth',
      type: 'length',
      docs: 'Width of the drag handle on resizable header columns.',
      defaultValue: '2px',
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'headerColumnResizeHandleColor',
      type: 'color',
      docs: 'Colour of the drag handle on resizable header columns',
      defaultValue: { helper: 'ref', arg: 'borderColor' },
    },
    {
      property: 'widgetContainerHorizontalPadding',
      type: 'length',
      docs: 'The horizontal padding of containers that contain stacked widgets, such as menus and tool panels',
      defaultValue: { helper: 'calc', arg: 'gridSize * 1.5' },
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'widgetContainerVerticalPadding',
      type: 'length',
      docs: 'The vertical padding of containers that contain stacked widgets, such as menus and tool panels',
      defaultValue: { helper: 'calc', arg: 'gridSize * 1.5' },
      min: 0,
      max: 50,
      step: 1,
    },

    {
      property: 'widgetHorizontalSpacing',
      type: 'length',
      docs: 'The spacing between widgets in containers arrange widgets horizontally',
      defaultValue: { helper: 'calc', arg: 'gridSize * 1.5' },
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'widgetVerticalSpacing',
      type: 'length',
      docs: 'The spacing between widgets in containers arrange widgets vertically',
      defaultValue: { helper: 'ref', arg: 'gridSize' },
      min: 0,
      max: 50,
      step: 1,
    },

    {
      property: 'listItemHeight',
      type: 'length',
      docs: 'Height of items in scrolling lists e.g. dropdown select inputs and column menu set filters.',
      defaultValue: { helper: 'calc', arg: 'iconSize + widgetVerticalSpacing' },
      min: 0,
      max: 50,
      step: 1,
    },

    {
      property: 'inputBackgroundColor',
      type: 'color',
      docs: 'Background colour for text inputs.',
      defaultValue: { helper: 'ref', arg: 'backgroundColor' },
    },
    {
      property: 'inputDisabledBackgroundColor',
      type: 'color',
      docs: 'Background colour for disabled text inputs.',
      defaultValue: { helper: 'opaqueForeground', arg: 0.06 },
    },
    {
      property: 'inputDisabledForegroundColor',
      type: 'color',
      docs: 'Text colour for disabled text inputs.',
      defaultValue: { helper: 'transparentForeground', arg: 0.5 },
    },
    {
      property: 'inputBorder',
      type: 'border',
      docs: 'Borders around text inputs.',
      defaultValue: true,
    },
    {
      property: 'inputDisabledBorder',
      type: 'border',
      docs: 'Borders around text inputs.',
      defaultValue: true,
    },
    {
      property: 'inputInvalidBorder',
      type: 'border',
      docs: 'Borders around text inputs.',
      defaultValue: 'solid 1px var(--ag-invalid-color)',
    },
    {
      property: 'inputFocusBorder',
      type: 'border',
      docs: 'Borders around focussed text inputs.',
      defaultValue: { helper: 'accentBorder' },
    },
    {
      property: 'inputHorizontalPadding',
      type: 'length',
      docs: 'Padding inside text inputs.',
      defaultValue: { helper: 'ref', arg: 'gridSize' },
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'inputBorderRadius',
      type: 'length',
      docs: 'Padding inside text inputs.',
      defaultValue: { helper: 'ref', arg: 'borderRadius' },
      min: 0,
      max: 50,
      step: 1,
    },

    {
      property: 'toggleButtonWidth',
      type: 'length',
      docs: 'Width of the whole toggle button component',
      defaultValue: '28px',
      min: 0,
      max: 100,
      step: 1,
    },
    {
      property: 'toggleButtonHeight',
      type: 'length',
      docs: 'Height of the whole toggle button component',
      defaultValue: '18px',
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'toggleButtonBorderWidth',
      type: 'length',
      docs: 'Size of the toggle button outer border',
      defaultValue: '2px',
      min: 0,
      max: 10,
      step: 1,
    },
    {
      property: 'toggleButtonOnBorderColor',
      type: 'color',
      docs: "Colour of the toggle button outer border in its 'on' state",
      defaultValue: { helper: 'ref', arg: 'accentColor' },
    },
    {
      property: 'toggleButtonOnBackgroundColor',
      type: 'color',
      docs: "Colour of the toggle button background in its 'on' state",
      defaultValue: { helper: 'ref', arg: 'accentColor' },
    },
    {
      property: 'toggleButtonOffBorderColor',
      type: 'color',
      docs: "Colour of the toggle button's outer border in its 'off' state",
      defaultValue: { helper: 'opaqueForeground', arg: 0.3 },
    },
    {
      property: 'toggleButtonOffBackgroundColor',
      type: 'color',
      docs: "Colour of the toggle button background in its 'off' state",
      defaultValue: { helper: 'opaqueForeground', arg: 0.3 },
    },
    {
      property: 'toggleButtonSwitchBorderColor',
      type: 'color',
      docs: 'Border colour of the toggle button switch (the bit that slides from left to right)',
      defaultValue: { helper: 'ref', arg: 'toggleButtonOffBorderColor' },
    },
    {
      property: 'toggleButtonSwitchBackgroundColor',
      type: 'color',
      docs: 'Colour of the toggle button switch (the bit that slides from left to right)',
      defaultValue: { helper: 'ref', arg: 'backgroundColor' },
    },

    {
      property: 'checkboxBorderWidth',
      type: 'length',
      docs: 'The color of an unchecked checkbox',
      defaultValue: '1px',
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'checkboxBorderRadius',
      type: 'length',
      docs: 'The color of an unchecked checkbox',
      defaultValue: { helper: 'ref', arg: 'borderRadius' },
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'checkboxUncheckedBackgroundColor',
      type: 'color',
      docs: 'The inner color of an unchecked checkbox',
      defaultValue: { helper: 'ref', arg: 'backgroundColor' },
    },
    {
      property: 'checkboxUncheckedBorderColor',
      type: 'color',
      docs: 'The border color of an unchecked checkbox',
      defaultValue: { helper: 'opaqueForeground', arg: 0.3 },
    },
    {
      property: 'checkboxCheckedBackgroundColor',
      type: 'color',
      docs: 'The inner color of a checked checkbox',
      defaultValue: { helper: 'ref', arg: 'accentColor' },
    },
    {
      property: 'checkboxCheckedBorderColor',
      type: 'color',
      docs: 'The border color of a checked checkbox',
      defaultValue: { helper: 'ref', arg: 'accentColor' },
    },
    {
      property: 'checkboxCheckedShapeImage',
      type: 'css',
      docs: 'An image defining the shape of the check mark on checked checkboxes',
      defaultValue: `url('data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" fill="none"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M1 3.5 3.5 6l5-5"/></svg>')}')`,
    },
    {
      property: 'checkboxCheckedShapeColor',
      type: 'color',
      docs: 'The colour of the check mark on checked checkboxes.',
      defaultValue: { helper: 'ref', arg: 'backgroundColor' },
    },
    {
      property: 'checkboxIndeterminateBackgroundColor',
      type: 'color',
      docs: 'The inner color of an indeterminate checkbox',
      defaultValue: { helper: 'opaqueForeground', arg: 0.3 },
    },
    {
      property: 'checkboxIndeterminateBorderColor',
      type: 'color',
      docs: 'The border color of an indeterminate checkbox',
      defaultValue: { helper: 'opaqueForeground', arg: 0.3 },
    },
    {
      property: 'checkboxIndeterminateShapeImage',
      type: 'css',
      docs: 'An image defining the shape of the dash mark on indeterminate checkboxes',
      defaultValue: `url('data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none"><rect width="10" height="2" fill="#000" rx="1"/></svg>')}')`,
    },
    {
      property: 'checkboxIndeterminateShapeColor',
      type: 'color',
      docs: 'The colour of the dash mark on indeterminate checkboxes',
      defaultValue: { helper: 'ref', arg: 'backgroundColor' },
    },
    {
      property: 'radioCheckedShapeImage',
      type: 'css',
      docs: 'An image defining the shape of the mark on checked radio buttons',
      defaultValue: `url('data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="none"><circle cx="3" cy="3" r="3" fill="#000"/></svg>')}')`,
    },

    {
      property: 'menuBorder',
      type: 'border',
      docs: 'Border around menus e.g. column menu and right-click context menu',
      defaultValue: { helper: 'foregroundBorder', arg: 0.2 },
    },
    {
      property: 'menuBackgroundColor',
      type: 'color',
      docs: 'Background colour for menus e.g. column menu and right-click context menu',
      defaultValue: { helper: 'opaqueForeground', arg: 0.03 },
    },
    {
      property: 'menuForegroundColor',
      type: 'color',
      docs: 'Text colour for menus e.g. column menu and right-click context menu',
      defaultValue: { helper: 'opaqueForeground', arg: 0.95 },
    },
    {
      property: 'menuShadow',
      type: 'css',
      docs: 'Shadow for menus e.g. column menu and right-click context menu',
      defaultValue: { helper: 'ref', arg: 'popupShadow' },
    },
    {
      property: 'menuSeparatorColor',
      type: 'color',
      docs: 'Colour of the dividing line between sections of menus e.g. column menu and right-click context menu',
      defaultValue: { helper: 'ref', arg: 'borderColor' },
    },

    {
      property: 'setFilterIndentSize',
      type: 'length',
      docs: 'How much to indent child items in the Set Filter list when filtering tree data.',
      defaultValue: { helper: 'ref', arg: 'iconSize' },
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'chartMenuButtonBorder',
      type: 'border',
      docs: 'Border around the button that shows and hides the chart settings menus',
      defaultValue: true,
    },
    {
      property: 'iconButtonHoverColor',
      type: 'color',
      docs: 'Hover color for clickable icons',
      defaultValue: { helper: 'transparentForeground', arg: 0.1 },
    },

    {
      property: 'dialogShadow',
      type: 'css',
      docs: 'Shadow for popup dialogs such as the integrated charts and the advanced filter builder.',
      defaultValue: { helper: 'ref', arg: 'popupShadow' },
    },
    {
      property: 'dialogBorder',
      type: 'color',
      docs: 'Border colour popup dialogs such as the integrated charts and the advanced filter builder.',
      defaultValue: { helper: 'foregroundBorder', arg: 0.2 },
    },

    {
      property: 'panelBackgroundColor',
      type: 'color',
      docs: 'Background colour for panels and dialogs such as the integrated charts and the advanced filter builder.',
      defaultValue: { helper: 'ref', arg: 'backgroundColor' },
    },
    {
      property: 'panelTitleBarBackgroundColor',
      type: 'color',
      docs: 'Background colour for the title bar of panels and dialogs such as the integrated charts and the advanced filter builder.',
      defaultValue: { helper: 'ref', arg: 'headerBackgroundColor' },
    },
    {
      property: 'panelTitleBarBorder',
      type: 'border',
      docs: 'Border below the title bar of panels and dialogs such as the integrated charts and the advanced filter builder.',
      defaultValue: true,
    },

    {
      property: 'columnSelectIndentSize',
      type: 'length',
      docs: 'How much to indent child items in the Set Filter list when filtering tree data.',
      defaultValue: { helper: 'ref', arg: 'iconSize' },
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'toolPanelSeparatorBorder',
      type: 'border',
      docs: 'Colour of the dividing line between sections of menus e.g. column menu and right-click context menu',
      defaultValue: true,
    },

    {
      property: 'tooltipBackgroundColor',
      type: 'color',
      docs: 'Background colour for tooltips',
      defaultValue: { helper: 'ref', arg: 'chromeBackgroundColor' },
    },
    {
      property: 'tooltipForegroundColor',
      type: 'color',
      docs: 'Text colour for tooltips',
      defaultValue: { helper: 'ref', arg: 'foregroundColor' },
    },
    {
      property: 'tooltipBorder',
      type: 'border',
      docs: 'Border for tooltips',
      defaultValue: true,
    },

    {
      property: 'columnDropCellBackgroundColor',
      type: 'color',
      docs: 'Background colour for the representation of columns within the column drop component',
      defaultValue: { helper: 'transparentForeground', arg: 0.07 },
    },
    {
      property: 'columnDropCellBorder',
      type: 'border',
      docs: 'Border for the representation of columns within the column drop component',
      defaultValue: { helper: 'foregroundBorder', arg: 0.13 },
    },

    {
      property: 'advancedFilterBuilderButtonBarBorder',
      type: 'border',
      docs: 'Colour of the dividing line above the buttons in the advanced filter builder',
      defaultValue: true,
    },
    {
      property: 'advancedFilterBuilderIndentSize',
      type: 'length',
      docs: 'Amount that each level of the nesting in the advanced filter builder is indented by',
      defaultValue: { helper: 'calc', arg: 'gridSize * 2 + iconSize' },
      min: 0,
      max: 50,
      step: 1,
    },
    {
      property: 'advancedFilterBuilderJoinPillColor',
      type: 'color',
      docs: 'Colour of the join operator pills in the Advanced Filter Builder',
      defaultValue: '#f08e8d',
    },
    {
      property: 'advancedFilterBuilderColumnPillColor',
      type: 'color',
      docs: 'Colour of the column pills in the Advanced Filter Builder',
      defaultValue: '#a6e194',
    },
    {
      property: 'advancedFilterBuilderOptionPillColor',
      type: 'color',
      docs: 'Colour of the filter option pills in the Advanced Filter Builder',
      defaultValue: '#f3c08b',
    },
    {
      property: 'advancedFilterBuilderValuePillColor',
      type: 'color',
      docs: 'Colour of the value pills in the Advanced Filter Builder',
      defaultValue: '#85c0e4',
    },

    {
      property: 'filterToolPanelGroupIndent',
      type: 'color',
      docs: 'How much to indent child columns in the filters tool panel relative to their parent',
      defaultValue: { helper: 'calc', arg: 'gridSize' },
    },
  ],
});
