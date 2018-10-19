import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import ContactItem from '../ContactItem';


it("Renders correctly", () => {
    const tree = renderer.create(<ContactItem/>).toJSON();
    expect(tree).toMatchSnapshot();
});

// Fjern
