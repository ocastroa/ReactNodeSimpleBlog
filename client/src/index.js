import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Router } from 'react-router-dom';
import '../resources/scss/style.scss';

// Import components
import App from './components/App';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ViewPost from './components/ViewPost';

ReactDOM.render(
  <Router history={createHistory()}>
    <Navbar />
    <Switch>
      <Route path="/" component={App}>
        <Route exact path="/" component={Home} />
        <Route exact path="/new" component={CreatePost} />
        <Route exact path="/articles/:id" component={ViewPost} />
        <Route exact path="/articles/:id/edit" component={EditPost} />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('app')
);
