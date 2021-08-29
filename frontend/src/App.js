import './styles/App.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import CafesList from './components/CafesList';

function App() {
  return (
    <div className="App">
              <Router>
                <AuthProvider>
                  <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                    <Route path="/register" component={Signup}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/forgot-password" component={ForgotPassword}/>
                    <Route path="/cafes" component={CafesList}/>
                  </Switch>
                </AuthProvider>
              </Router> 
    </div>
  );
}

export default App;
