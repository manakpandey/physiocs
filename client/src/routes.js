import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import PasswordUpdate from "./components/PasswordUpdate";
import { TakeTest } from "./components/TakeTest";
import DashRouter from "./components/Dashboard/DashRouter";
// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
function PrivateRoute({ isAuthenticated, children, ...rest}) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
function Urls(props) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login/"> <Login {...props} /></Route>
                    <PrivateRoute exact path="/" isAuthenticated={props.isAuthenticated}><DashRouter {...props}/></PrivateRoute>
                    <PrivateRoute exact path="/update_password/" isAuthenticated={props.isAuthenticated}><PasswordUpdate {...props}/></PrivateRoute>
                    <PrivateRoute exact path="/test/:tid" isAuthenticated={props.isAuthenticated}><TakeTest {...props}/></PrivateRoute>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default Urls;