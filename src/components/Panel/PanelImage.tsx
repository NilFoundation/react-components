/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React, { ReactElement } from 'react';
import { Image, ImageProps } from '../Image';

/**
 * Props.
 */
export type PanelImageProps = ImageProps;

/**
 * Panel image component.
 *
 * @param {PanelImageProps} props - Props.
 * @returns React component.
 */
export const PanelImage = ({ className, ...rest }: PanelImageProps): ReactElement => (
    <Image
        {...rest}
        fluid
        className={`panel__image ${className ? className : ''}`}
    />
);
