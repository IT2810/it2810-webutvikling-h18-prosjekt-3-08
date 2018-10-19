import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Todos from '../Todos';


it("Renders correctly", async () => {
    const tree = renderer.create(<Todos/>).toJSON();
    expect(tree).toMatchSnapshot();
});


//Fjern
