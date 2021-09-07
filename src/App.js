import {useReactiveVar} from "@apollo/client";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import { isLoggedInVar,darkModeVar } from "./apollo";
import {ThemeProvider} from "styled-components";
import {darkTheme, GlobalStyles, lightTheme} from "./styles";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles/>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home/> : <Login/>}
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
