import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Contacts from './app/components/Contacts';


it("Renders correctly", () => {
    const tree = renderer.create(<Contacts/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it("Testing Async - store contacts", async () => {
    expect.assertions(1);
    const data = await retrieveContacts();
    expect(data).toEqual(this.state.contacts);

})
