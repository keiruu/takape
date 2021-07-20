import './App.css';
import Navbar from './components/Navbar/Navbar'
import Signup from './components/Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
function App() {
  return (
    <div className="App">
        
          <Container className="d-flex align-items-center justify-content-center"
          style={{minHeight: "60vh"}}>

            <div className="w-100" style={{maxWidth: '450px'}}>
              <Router>
                <AuthProvider>
                  <Switch>
                    <Route exact path="/" component={Navbar}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/login" component={Login}/>
                  </Switch>
                </AuthProvider>
              </Router>

            </div>
          </Container>
    </div>
  );
}

export default App;
