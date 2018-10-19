import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Contacts from '../Contacts';


it("Renders correctly", () => {
    const tree = renderer.create(<Contacts/>).toJSON();
    expect(tree).toMatchSnapshot();
});
