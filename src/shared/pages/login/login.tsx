import React from "react";
import { RouteComponentProps } from "react-router-dom";
import './login.css';

export interface Props extends RouteComponentProps {
    setSessionFlag: (val: boolean) => void;
    isSessionValid: boolean;
};
interface State {
    userName: string;
    passWord: string;
    isInvalidFormDetails: boolean;
};

class Login extends React.Component<Props, State> {

    state: State = {
        userName: '',
        passWord: '',
        isInvalidFormDetails: false,
    };

    constructor(props: Props) {
        super(props);
        this.validateFormData = this.validateFormData.bind(this);
    }


    validateFormData(event: React.FormEvent<HTMLInputElement>): void {
        if (this.state.userName === '') {
            this.setState({ isInvalidFormDetails: true });
            alert('please enter username');
        } else if (this.state.passWord === '') {
            this.setState({ isInvalidFormDetails: true });
            alert('please enter password');
        } else {
            this.setState({ isInvalidFormDetails: false });
            this.props.history.push('/Home/all')
        }
    }

    render() {

        return (
            <div className="container">
                <div className='formContainer'>
                    <form className="form">
                        <input className="formInput"
                            id="userName"
                            type="text"
                            value={this.state.userName}
                            onChange={(event) => this.setState({ userName: event.target.value })}
                            placeholder="Uers Name" />
                        <input className="formInput"
                            id="passWord"
                            type="password"
                            placeholder="Password"
                            value={this.state.passWord}
                            onChange={(event) => this.setState({ passWord: event.target.value })} />
                        <input className="formButton"
                            id="submit"
                            type="button"
                            onClick={this.validateFormData}
                            value="login" />
                    </form>
                </div>
            </div>
        );
    }
}


export default Login;

