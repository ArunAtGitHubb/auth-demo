import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Signup from './signup';

function App() {

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minWidth: "100vw" }}>
      <div className='w-100 mt-5' style={{ maxWidth: "500px" }}>
        <Switch>
          <PrivateRoute path="/" component={Dashboard} exact />
          <PublicRoute path="/signup" component={Signup} />
          <PublicRoute path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </div>
    </Container>
  )
}

export default App;
