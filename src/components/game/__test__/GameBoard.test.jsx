
import React from 'react';
import { mount } from 'enzyme';

import GameBoard from '../GameBoard';


describe('GameBoard', () => {
    let wrapper;

    test('Game board should show instructions when child is undefined or its length equals 0', () => {
        wrapper = mount(
            <GameBoard
                onClick={() => {}}
            />
        );
        // TODO Tests. Had problems with jest and babel 7 so I built the components without tests
        console.log(wrapper);
    });
});
