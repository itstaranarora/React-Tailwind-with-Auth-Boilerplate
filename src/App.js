import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Login from "pages/Login";
import Signup from "pages/Signup";
import Dashboard from "pages/Dashboard";
import ProtectedRoute from "components/ProtectedRoute";

import { setAccess } from "utils/token";
import useAuth from "hooks/useAuth";
import { refreshToken } from "services/api";

function App() {
  const { setLoggedOut } = useAuth();
  const history = useHistory();

  const refreshAuthLogic = async (failedRequest) => {
    try {
      const tokenRefreshResponse = await refreshToken();
      setAccess(tokenRefreshResponse.data.access);
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.access;
      return Promise.resolve();
    } catch (error) {
      setLoggedOut();
      history.push("/login");
    }
  };

  createAuthRefreshInterceptor(axios, refreshAuthLogic, {
    statusCodes: [403],
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
