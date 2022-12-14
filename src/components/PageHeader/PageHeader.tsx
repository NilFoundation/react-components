/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React, { ReactElement, ReactNode } from 'react';

/**
 * Props.
 */
type PageHeaderProps = {
    /**
     * Component children.
     */
    children: ReactNode;
    /**
     * Provide className to customize appearance.
     */
    className?: string;
};

/**
 * Page header.
 *
 * @param {PageHeaderProps} props - Props.
 * @returns React component.
 */
export const PageHeader = ({ children, className = '' }: PageHeaderProps): ReactElement => (
    <div className={`page-header ${className}`}>{children}</div>
);
