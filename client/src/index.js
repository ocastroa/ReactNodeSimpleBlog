import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';
import '../resources/scss/style.scss';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { allReducers } from './store/reducers/index';
import thunks from 'redux-thunk';

// Import components
import App from './components/App';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ViewPost from './components/ViewPost';
import Form from './components/Form';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create a Redux store holding the state of the app
const store = createStore(allReducers, storeEnhancers(applyMiddleware(thunks)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Navbar />
      <Switch>
        <Route path="/" component={App}>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={Form} />
          <Route exact path="/articles/:id" component={ViewPost} />
          <Route exact path="/articles/:id/edit" component={Form} />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
