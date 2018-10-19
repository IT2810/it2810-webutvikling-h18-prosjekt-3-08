import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AppointmentSetTime from '../AppointmentSetTime';


test("Renders correctly", () => {
    const tree = renderer.create(<AppointmentSetTime/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Function hidePicker", () => {
    const data = renderer.create(<AppointmentSetTime/>).getInstance();
    data.hidePicker;
    expect(data.state.isVisible).toEqual(false);
});
