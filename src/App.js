import './styles/App.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';

function App() {
  return (
    <div className="App">
              <Router>
                <AuthProvider>
                  <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/forgot-password" component={ForgotPassword}/>
                  </Switch>
                </AuthProvider>
              </Router> 
    </div>
  );
}

export default App;
