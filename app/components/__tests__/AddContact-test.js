import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AddContact from '../AddContact';


test("Renders correctly", async () => {
    const tree = renderer.create(<AddContact/>).toJSON();
    expect(tree).toMatchSnapshot();
});
