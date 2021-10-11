import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './Components/SignIn/SignIn';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
