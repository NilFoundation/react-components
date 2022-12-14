/**
 * @file Unit test.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React from 'react';
import { render } from '@testing-library/react';
import { InputGroup } from '../InputGroup';
import { FormControl } from '../../FormControl';
import { Button } from '../../Button';

/**
 * InputGroup component unit testing.
 */
describe('inputGroup', () => {
    /**
     * Component renders.
     */
    it('renders', () => {
        const { getByRole } = render(
            <InputGroup>
                <InputGroup.Addon>Addon</InputGroup.Addon>
                <FormControl />
                <InputGroup.Buttons>
                    <Button>Button</Button>
                </InputGroup.Buttons>
            </InputGroup>,
        );

        expect(getByRole('textbox')).toBeInTheDocument();
    });
});
