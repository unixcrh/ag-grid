import styled from '@emotion/styled';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { type ReactNode } from 'react';

import { BordersEditor } from './BordersEditor';
import { FormField } from './FormField';
import { ParamEditor } from './ParamEditor';
import { PartEditor } from './PartEditor';

export const EditorPanel = () => {
    return (
        <AccordionRoot type="multiple" defaultValue={['General']}>
            <div className="pageHeading">
                <h1 className="pageTitle">Theme Builder </h1>
                <a className="iconDoc" href="https://ag-grid.com/react-data-grid/themes/" target="_blank">
                    <span>↗</span>
                </a>
            </div>
            {/* <p className="pageDescription">Prototype & customise your data grid theme</p> */}
            <Section heading="General">
                <LeftBiasRow>
                    <ParamEditor param="fontFamily" />
                    <ParamEditor param="fontSize" />
                </LeftBiasRow>
                <ParamEditor param="backgroundColor" />
                <ParamEditor param="foregroundColor" />
                <ParamEditor param="accentColor" />
                <ParamEditor param="borderColor" />
                <BordersEditor />
                <ParamEditor param="gridSize" label="Spacing" showDocs />
                <EvenSplitRow>
                    <ParamEditor param="wrapperBorderRadius" label="Wrapper radius" showDocs />
                    <ParamEditor param="borderRadius" label="Widget radius" showDocs />
                </EvenSplitRow>
            </Section>
            <Section heading="Header">
                <ParamEditor param="headerBackgroundColor" label="Background color" />
                <ParamEditor param="headerTextColor" label="Text color" />
                <LeftBiasRow>
                    <ParamEditor param="headerFontFamily" label="Font family" />
                    <ParamEditor param="headerFontSize" label="Font size" />
                </LeftBiasRow>
                <ParamEditor param="headerFontWeight" label="Font weight" />
                <ParamEditor param="headerVerticalPaddingScale" label="Adjust vertical padding" />
                <FormField label="Adjust horizontal padding">
                    <Note>(See cell horizontal padding)</Note>
                </FormField>
            </Section>
            <Section heading="Cells">
                <ParamEditor param="dataColor" label="Text color" />
                <ParamEditor param="oddRowBackgroundColor" label="Odd row background" />
                <ParamEditor param="rowVerticalPaddingScale" label="Adjust vertical padding" />
                <ParamEditor param="cellHorizontalPaddingScale" label="Adjust horizontal padding" />
            </Section>
            <Section heading="Icons">
                <PartEditor part="iconSet" />
                <ParamEditor param="iconSize" label="Size" />
            </Section>
        </AccordionRoot>
    );
};

const Section = (props: { heading: string; children: ReactNode }) => (
    <AccordionItem value={props.heading}>
        <AccordionHeader>
            <Trigger>
                {props.heading} <OpenCloseChevron size={16} />
            </Trigger>
        </AccordionHeader>
        <AccordionContent>
            <SectionContent>{props.children}</SectionContent>
        </AccordionContent>
    </AccordionItem>
);

const Note = styled('div')`
    color: var(--color-fg-tertiary);
    font-size: 14px;
    font-style: italic;
    margin-left: 12px;
    margin-bottom: 8px;
`;

const SectionContent = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin-bottom: 32px;
`;

const AccordionRoot = styled(Accordion.Root)`
    display: flex;
    flex-direction: column;
    width: 100%;

    .iconDoc {
        margin-left: 8px;
        color: var(--color-fg-quinary);
        font-size: var(--text-fs-sm);
        transition: all 0.3s ease;
        &:hover {
            color: var(--color-fg-primary);
            transition: all 0.3s ease;
            opacity: 0.7;
        }
    }

    .pageHeading {
        display: flex;
        margin-bottom: 8px;
        align-items: center;
        position: sticky;
        padding-bottom: 8px;
        top: 0px;
        background: linear-gradient(var(--color-bg-primary) 65%, rgba(255, 255, 255, 0));
    }

    .pageTitle {
        color: var(--color-fg-secondary);
        font-weight: var(--text-semibold);
        font-size: var(--text-fs-base);
        padding-left: 6px;
        margin-bottom: 0;
    }

    .pageDescription {
        color: var(--color-text-secondary);
        font-size: var(--text-fs-sm);
        opacity: 0.7;
        padding-left: 4px;
    }
`;

const AccordionItem = styled(Accordion.Item)`
    margin: 0;
`;

const AccordionHeader = styled(Accordion.Header)`
    margin-bottom: 16px;
    padding-left: 6px;
    padding-right: 10px;
`;

const AccordionContent = styled(Accordion.Content)`
    overflow: hidden;
    margin: 0;
    padding-left: 6px;
    padding-right: 10px;

    &[data-state='open'] {
        animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards;
    }

    &[data-state='closed'] {
        animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards;
    }

    @keyframes slideDown {
        from {
            height: 0;
        }
        to {
            height: var(--radix-accordion-content-height);
        }
    }

    @keyframes slideUp {
        from {
            height: var(--radix-accordion-content-height);
        }
        to {
            height: 0;
        }
    }
`;

const Trigger = styled(Accordion.Trigger)`
    all: unset;
    color: var(--color-fg-secondary) !important;
    background: none !important;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    transition: all 0.5s;
    opacity: 0.9;
    &:hover {
        opacity: 0.6;
        transition: all 0.5s;
    }
`;

const EvenSplitRow = styled('div')`
    display: flex;
    gap: 12px;
    > * {
        flex: 1;
    }
`;

const LeftBiasRow = styled('div')`
    display: flex;
    gap: 12px;
    > :nth-of-type(1) {
        flex: 2;
    }
    > :nth-of-type(2) {
        flex: 1;
    }
`;

const OpenCloseChevron = styled(ChevronDown)`
    opacity: 0.6;
    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
    [data-state='open'] & {
        transform: rotate(180deg);
    }
`;
