import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './Components/SignIn/SignIn';
import Dashboard from'./Components/Student/Dashboard';
import NotFound from './Components/NotFound';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
