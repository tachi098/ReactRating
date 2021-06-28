import './App.css';
import { Rating } from './components/Rating';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/rating"} className="navbar-brand">
            DEMORATING
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
            </li>
          </div>
        </nav>
        <div className="container-fluid mt3">
          <div className="row">
            <Switch>
              <Route exact path={["/", "/rating"]} component={Rating} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
