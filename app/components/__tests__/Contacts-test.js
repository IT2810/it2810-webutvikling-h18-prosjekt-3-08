import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Contacts from '../Contacts';


test("Renders correctly", () => {
    const tree = renderer.create(<Contacts/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Constructor", () => {
    const data = renderer.create(<Contacts/>).getInstance();
    expect(data.state.contacts).toEqual([]);
});
