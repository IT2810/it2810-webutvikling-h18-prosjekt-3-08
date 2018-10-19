import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import PerfectDays from '../PerfectDays';


it("Renders correctly", () => {
    const tree = renderer.create(<PerfectDays/>).toJSON();
    expect(tree).toMatchSnapshot();
});

// Fjern
