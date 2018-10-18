import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Contacts from './app/components/Contacts';

it("Testing", () => {
    const tree = renderer.create(<Contacts/>).toJSON();
    expect(tree).toMatchSnapshot();
});
