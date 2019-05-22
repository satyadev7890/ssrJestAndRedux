import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import NoMatch from './components/NoMatch';
import routes from './routes';

interface Props { };
interface State { };

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Switch>
            {routes.map(({ path, exact, component: C, ...rest }: any) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={(props) => (
                  <C {...props} {...rest} />
                )}
              />
            ))}
            <Route render={(props) => <NoMatch {...props} />} />
          </Switch>
        </div>
      </Provider>
    )
  }
}

export default App