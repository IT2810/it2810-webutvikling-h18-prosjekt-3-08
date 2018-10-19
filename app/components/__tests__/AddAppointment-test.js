import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AddAppointment from '../AddAppointment';


test("Renders correctly", () => {
    const tree = renderer.create(<AddAppointment/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Function setStartTime", () => {
    const data = renderer.create(<AddAppointment/>).getInstance();
    data.setStartTime("12:00")
    expect(data.state.startTime).toEqual("12:00");
});

test("Function setTitle", () => {
    const data = renderer.create(<AddAppointment/>).getInstance();
    data.setTitle("Title")
    expect(data.state.title).toEqual("Title");
});

test("Function setLocation", () => {
    const data = renderer.create(<AddAppointment/>).getInstance();
    data.setLocation("Oslo")
    expect(data.state.location).not.toEqual("");
});
