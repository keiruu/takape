import './styles/App.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { CafeContext } from './contexts/CafeContext';
import { HashRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import Cafe from './pages/Cafe';
import { Cafes } from './components/Cafes';
import Footer from './components/Footer';
import React, {useEffect, useContext} from 'react';
import SkeletonCafe from './components/SkeletonCafe';

function App() {
  const cafe = useContext(CafeContext)

  useEffect(() => {
    const timer = setTimeout(() => {
        cafe.setLoading(false)
        console.log("App.js")
    }, 1000)
  }, [])

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
                    <Route path="/about" component={Home}/>
                    <Route path="/contactus" component={Home}/>
                    <Route exact path="/cafes" component={Cafe}/>
                    <Route 
                      path="/cafes/:id"
                      render={(props) => (
                        <div>
                          {cafe.loading ? <SkeletonCafe/> : <Cafes {...props} /> }
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
