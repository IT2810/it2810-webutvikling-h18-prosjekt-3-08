import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AppointmentSetTime from '../AppointmentSetTime';


it("Renders correctly", () => {
    const tree = renderer.create(<AppointmentSetTime/>).toJSON();
    expect(tree).toMatchSnapshot();
});
