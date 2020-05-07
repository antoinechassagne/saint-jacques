import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import CookieManager from "./services/CookieManager";
import Header from "./components/Header";
import routes from "./settings/routes";

const App = () => {
  const isLogged = CookieManager.get("jwt") ? true : false;

  const renderPage = (guard = false, component) => {
    const Page = component;
    if (!guard) return <Page />;
    return isLogged ? (
      <Page />
    ) : (
      <Redirect to={`${process.env.PUBLIC_URL}${routes.login.path}`} />
    );
  };

  const pages = Object.keys(routes).map((key, index) => {
    const { path, component, guard } = routes[key];
    return (
      <Route
        key={index}
        exact
        path={`${process.env.PUBLIC_URL}${path}`}
        render={() => renderPage(guard, component)}
      />
    );
  });

  return (
    <Router>
      <>
        <Header pages={routes} isLogged={isLogged} />
        <main>
          <Switch>{pages}</Switch>
        </main>
      </>
    </Router>
  );
};

export default App;
