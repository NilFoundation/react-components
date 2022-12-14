/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React, { ReactElement, ReactNode } from 'react';

/**
 * Props.
 */
export type PanelContentProps = {
    /**
     * Provide className to customize appearance.
     */
    className?: string;
    /**
     * Component children.
     */
    children?: ReactNode;
};

/**
 * Panel content component.
 *
 * @param {PanelContentProps} props - Props.
 * @returns React component.
 */
export const PanelContent = ({ className, children }: PanelContentProps): ReactElement => (
    <div className={`panel-body ${className ? className : ''}`}>{children}</div>
);
