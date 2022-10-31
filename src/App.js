import React, { Component } from "react";
import PhotoContextProvider from "./context/PhotoContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

Sentry.init({
  dsn: "https://538425005d21499ba0f1810ee66ab876@o87286.ingest.sentry.io/4504078629470208",
  release: "prithvi-react-snapshot@0.1.0", //Need the release for sourcemaps
  integrations: [new BrowserTracing()],
  routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
  tracesSampleRate: 1.0,
});

function FallbackComponent() {
  return <h2>Houston, something went wrong</h2>;
}

class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
  };

  render() {
    return (
      <PhotoContextProvider>
        <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
          <HashRouter basename="/SnapScout">
            <div className="container">
              <Route
                render={(props) => (
                  <Header
                    handleSubmit={this.handleSubmit}
                    history={props.history}
                  />
                )}
              />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/mountain" />}
                />

                <Route
                  path="/mountain"
                  render={() => <Item searchTerm="mountain" />}
                />
                <Route
                  path="/beach"
                  render={() => <Item searchTerm="beach" />}
                />
                <Route path="/bird" render={() => <Item searchTerm="bird" />} />
                <Route path="/food" render={() => <Item searchTerm="food" />} />
                <Route
                  path="/error"
                  render={() => <Item searchTerm="error" />}
                />
                <Route
                  path="/search/:searchInput"
                  render={(props) => (
                    <Search searchTerm={props.match.params.searchInput} />
                  )}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </HashRouter>
        </Sentry.ErrorBoundary>
      </PhotoContextProvider>
    );
  }
}

export default Sentry.withProfiler(App);
