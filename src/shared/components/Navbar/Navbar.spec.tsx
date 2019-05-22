import * as React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from './Navbar';

configure({ adapter: new Adapter() });

describe('Navbar snapshot testing', () => {
    it('create snapshot with theme', () => {
        const navbar = shallow(<Navbar />);
        expect(navbar).toMatchSnapshot();
    });
});
