/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { RefObject, useEffect } from 'react';
import { KeyboardEventKey } from '../enums';

/**
 * Provides keyboard (arrowUp and arrowDown) menu interactions.
 *
 * @param ref - Menu ref.
 */
export const useMenuKeyboardNavigation = <T extends HTMLElement>(ref: RefObject<T>) => {
    useEffect(() => {
        const onKeyPress = (e: KeyboardEvent) => {
            const { key } = e;
            if (key !== KeyboardEventKey.arrowDown && key !== KeyboardEventKey.arrowUp) {
                return;
            }

            if (!ref || !ref.current) {
                return;
            }

            const menuChildren = Array.from(ref.current.children);
            const activeElement = menuChildren.find(x => x === document.activeElement);
            const getNextFocus =
                key === KeyboardEventKey.arrowDown ? getNextChild : getPreviousChild;
            const nextFocus = getNextFocus(ref.current, activeElement);

            nextFocus && nextFocus instanceof HTMLElement && nextFocus.focus();
        };

        document.addEventListener('keydown', onKeyPress);

        return () => {
            document.removeEventListener('keydown', onKeyPress);
        };
    }, [ref]);
};

/**
 *
 * @param parent - Parent element.
 * @param item - Current item.
 * @returns - Preceding current item parent's child.
 */
const getPreviousChild = <T extends HTMLElement>(parent: T, item?: Element): ChildNode | null => {
    if (!item || parent.isSameNode(item)) {
        return parent.lastElementChild;
    }

    return item.previousElementSibling ?? parent.lastElementChild;
};

/**
 *
 * @param parent - Parent element.
 * @param item - Current item.
 * @returns - Next to current item parent's child.
 */
const getNextChild = <T extends HTMLElement>(parent: T, item?: Element): ChildNode | null => {
    if (!item || parent.isSameNode(item)) {
        return parent.firstElementChild;
    }

    return item.nextElementSibling ?? parent.firstElementChild;
};