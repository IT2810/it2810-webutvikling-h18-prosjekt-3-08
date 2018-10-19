import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AddAppointment from '../AddAppointment';


it("Renders correctly", () => {
    const tree = renderer.create(<AddAppointment/>).toJSON();
    expect(tree).toMatchSnapshot();
});
