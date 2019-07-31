import * as React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RouteComponentProps } from "react-router-dom";
import Grid from './Grid';

configure({ adapter: new Adapter() });

const props: any = {
    getLanguageDetails: jest.fn(),
}

describe('Grid snapshot testing', () => {
    it('create snapshot with theme', () => {
        // const grid = shallow(<Grid {...props} />);
        // expect(grid).toMatchSnapshot();
    });
});

// describe('Grid component testing', () => {
//     let grid: any = ''

//     beforeEach(() => {
//         grid = shallow(<Grid  {...props} />);
//     });

//     test('Grid link testing', () => {
//         const link = grid.find('a');
//         link.simulate('click');
//         expect(props.history.push).toHaveBeenCalled();
//     })
// });