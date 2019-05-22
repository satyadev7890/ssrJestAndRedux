import React, { Component } from 'react'
import { RouteComponentProps } from "react-router-dom";
import './Grid.css';
import { connect } from 'react-redux'
import { store } from '../../redux/reducers';
import { getLanguageDetails } from '../../redux/actions';

interface NavParams {
  id: string;
}

interface Props extends RouteComponentProps<NavParams> {
  staticContext?: any;
  gridRepos?: any;
  getLanguageDetails?: (val: string) => void; 
};

interface State {
  repos: any
  loading: boolean;
};

declare global {
  interface Window { __INITIAL_DATA__: any; }
}

declare global {
  var __isBrowser__: boolean;
}


class Grid extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    let repos;
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      repos = props.staticContext.data;
    }

    this.state = {
      repos,
      loading: repos ? false : true,
    }
    this.fetchRepos = this.fetchRepos.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { match }: Props = this.props;
    this.setState(()=> ({
      repos: nextProps.gridRepos,
      loading: false,
    }), ()=> {
      if (nextProps.match.params.id !== match.params.id) {
        this.fetchRepos(nextProps.match.params.id);
      }
    })
  }

  componentDidMount() {
    if (!this.state.repos || this.state.repos === []) {
      this.fetchRepos(this.props.match.params.id)
    }
  }

  fetchRepos(lang: string) {
    this.setState(() => ({
      loading: true,
    }))
    this.props.getLanguageDetails(lang);
  }

  render() {
    const { repos, loading } = this.state;
    if (loading) {
      return <div className="gridLoading">LOADING</div>;
    }
    return (
      <div className="gridContainer">
        {repos.map(({ name, owner, stargazers_count, html_url, description }: any) => (
          <div className="gridItem" key={name}>
            <div className="gridSubItem">
              <div><span className="gridItemTitle">Language name:</span> <span className="gridItemTitleColor">{name}</span></div>
              <div><span className="gridItemTitle">Owner:</span> @{owner.login}</div>
              <div><span className="gridItemTitle">Description:</span> {description}</div>
              <div><span className="gridItemTitle">Stars: </span> {stargazers_count} stars</div>
              <div><span className="gridItemTitle">Link: </span><a href={html_url} target="_blank">go to {name} site</a></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ commonReducer }: store) => {
  return  commonReducer;
}

export default connect(mapStateToProps, { getLanguageDetails })(Grid);