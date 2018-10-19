import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Calendar from '../Calendar';


test("Renders correctly", () => {
    const tree = renderer.create(<Calendar/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Function hidePicker", () => {
    const data = renderer.create(<Calendar/>).getInstance();
    data.hidePicker;
    expect(data.state.isVisible).toEqual(false);
});
