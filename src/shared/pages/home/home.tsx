import React from "react";
import { RouteComponentProps } from "react-router-dom";
import './home.css';
import Navbar from '../../components/Navbar';
import Grid from '../../components/Grid';

interface NavParams {
    id: string;
}

interface Props extends RouteComponentProps<NavParams> {
};

interface State {
};

class Home extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="homeContainer">
                <Navbar />
                <Grid {...this.props} />
            </div>
        );
    }
}

export default Home;

