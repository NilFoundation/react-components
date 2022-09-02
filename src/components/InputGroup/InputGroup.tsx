/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { Size } from '../../enums';
import { InputGroupIcon } from './InputGroupIcon';
import { InputGroupButton } from './InputGroupButton';
import { InputSize } from '../../models';

/**
 * Props.
 */
export interface InputGroupProps {
    children: ReactNode;
    size?: InputSize;
    className?: string;
}

/**
 * Input group component.
 *
 * @param {InputGroupProps} props - Props.
 * @returns - React component.
 */
export const InputGroup = ({
    className,
    size = Size.md,
    children,
}: InputGroupProps): ReactElement => {
    const inputGroupClassName = clsx(
        'input-group',
        className && className,
        size !== Size.md && `input-group-${size}`,
    );

    return <div className={inputGroupClassName}>{children}</div>;
};

/**
 * Component extensions.
 */
InputGroup.Icon = InputGroupIcon;
InputGroup.Button = InputGroupButton;
