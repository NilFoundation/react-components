/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React, { ReactElement, Ref, useState, useRef } from 'react';
import clsx from 'clsx';
import { InputSize } from '../../models';
import { Size } from '../../enums';
import { InputGroup } from '../InputGroup';
import { Input } from '../Input';
import { Menu } from '../Menu';
import { SelectOption, SelectOptionProps } from './SelectOption';
import { SelectOptionModel } from './SelectOptionModel';
import { SelectContext } from './SelectContext';
import { Icon } from '../Icon';
import { Button } from '../Button';
import './Select.scss';

/**
 * Props.
 */
export interface SelectProps<T> {
    /**
     * Component children.
     */
    children: ReactElement<SelectOptionProps<T>> | ReactElement<SelectOptionProps<T>>[];
    /**
     * Callback on select option.
     */
    onChange?: (value: T) => void;
    /**
     * Component size.
     */
    size?: InputSize;
    /**
     * Provide className to customize appearance.
     */
    className?: string;
    /**
     * Displays when there are nothing to select.
     */
    noItemsMessage?: string;
    /**
     * Displays when nothing is selected.
     */
    placeholder?: string;
    /**
     * Disable component.
     */
    disabled?: boolean;
    /**
     * Id.
     */
    id?: string;
    /**
     * Allows to clear selected value and adds clear icon.
     */
    clearable?: boolean;
    /**
     * Clear icon name.
     */
    clearIcon?: string;
    /**
     * Forward ref for root input element.
     */
    ref?: Ref<HTMLInputElement>;
    /**
     * Allows to select multiply options.
     */
    multiple?: boolean;
    /**
     * Icon, displaying when select menu is open.
     */
    menuOpendIcon?: string;
    /**
     * Icon, displaying when select menu is closed.
     */
    menuClosedIcon?: string;
}

/**
 * Select component.
 *
 * @param {SelectProps} props - Props.
 * @returns - React component.
 */
export const Select = <T,>({
    className,
    onChange,
    size = Size.md,
    children,
    noItemsMessage = 'No items to select',
    placeholder = 'No items selected',
    disabled,
    id,
    clearable,
    clearIcon = 'glyphicon glyphicon-remove',
    ref,
    multiple = false,
    menuOpendIcon = 'glyphicon glyphicon-triangle-top',
    menuClosedIcon = 'glyphicon glyphicon-triangle-bottom',
}: SelectProps<T>) => {
    const selectClassName = clsx('select', className && className);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOptionModel<T>>();
    const iconName = dropdownVisible ? menuOpendIcon : menuClosedIcon;
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    const clearSelect = (): void => {
        if (!ref) {
            return;
        }

        if (!clearable) {
            return;
        }

        if (disabled) {
            return;
        }

        !multiple && setDropdownVisible(false);
        setSelectedOption(undefined);
    };

    const onSelectOption = (selectOption: SelectOptionModel<T>): void => {
        if (disabled) {
            return;
        }

        setSelectedOption(selectOption);
        onChange && onChange(selectOption.value);
        !multiple && setDropdownVisible(false);
    };

    const onCloseMenuHandler = () => {
        setDropdownVisible(false);
        const { current } = toggleButtonRef;
        current && current.focus();
    };

    return (
        <SelectContext.Provider value={{ multiple, selectedOption, onSelectOption }}>
            <div className={selectClassName}>
                <InputGroup size={size}>
                    <Input
                        readOnly
                        ref={ref}
                        id={id}
                        value={selectedOption?.title ?? ''}
                        disabled={disabled}
                        placeholder={placeholder}
                        onClick={(): void => setDropdownVisible(!dropdownVisible)}
                        tabIndex={-1}
                    />
                    <InputGroup.Buttons>
                        {clearable && !!selectedOption?.value && (
                            <Button
                                onClick={clearSelect}
                                disabled={disabled}
                                aria-label="Clear selected value"
                            >
                                <Icon iconName={clearIcon} />
                            </Button>
                        )}
                        <Button
                            onClick={(): void => setDropdownVisible(!dropdownVisible)}
                            disabled={disabled}
                            aria-haspopup={true}
                            aria-expanded={dropdownVisible}
                            aria-label="Toggle select menu"
                            ref={toggleButtonRef}
                        >
                            <Icon iconName={iconName} />
                        </Button>
                    </InputGroup.Buttons>
                </InputGroup>
                <Menu
                    visible={dropdownVisible}
                    onCloseMenu={onCloseMenuHandler}
                    role="listbox"
                    className="selectMenu"
                >
                    {!children && noItemsMessage}
                    {children}
                </Menu>
            </div>
        </SelectContext.Provider>
    );
};

/**
 * Component extensions.
 */
Select.Option = SelectOption;
