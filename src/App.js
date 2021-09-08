import {ApolloClient, useReactiveVar} from "@apollo/client";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import { isLoggedInVar,darkModeVar, client } from "./apollo";
import {ThemeProvider} from "styled-components";
import {darkTheme, GlobalStyles, lightTheme} from "./styles";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import {HelmetProvider} from "react-helmet-async";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloClient client={client} >
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles/>
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? <Home/> : <Login/>}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp/>
                </Route>  
              ):null}
              <Route>
                <NotFound/>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloClient>
  );
}

export default App;