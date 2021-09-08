import './styles/App.css';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import Cafe from './pages/Cafe';
import { Cafes } from './components/Cafes';
import AddReview from './components/AddReview';
import Footer from './components/Footer';
import React, {useEffect} from 'react';

function App() {
  
  return (
    <div className="App">
              <Router>
                <AuthProvider>
                  <Switch>
                    <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                    <Route path="/register" component={Signup}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/forgot-password" component={ForgotPassword}/>
                    <PrivateRoute exact path="/" component={Home}/>
                    <Route exact path="/cafes" component={Cafe}/>
                    <Route
                      path="/cafes/:id/review"
                      render={(props) => (
                        <AddReview {...props}/>
                      )}
                    />
                    <Route 
                      path="/cafes/:id"
                      render={(props) => (
                        <div>
                          <Cafes {...props} />
                          <Footer/>
                        </div>
                      )}
                    />
                  </Switch>
                </AuthProvider>
              </Router> 
    </div>
  );
}

export default App;
