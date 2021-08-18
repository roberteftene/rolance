import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBarMenu from "./components/sidebar-menu/SideBarMenu";
import AccountDetailsPage from "./pages/accountdetailspage/AccountDetailsPage";
import AddJobFormPage from "./pages/addjobpage/AddJobFormPage";
import Home from "./pages/homepage/HomePage";
import LandingPage from "./pages/landingpage/LandingPage";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/signin" exact component={LoginPage}></Route>
        <Route path="/signup" exact component={RegisterPage}></Route>
        <Route
          path="/accountdetails"
          exact
          component={AccountDetailsPage}
        ></Route>
        <>
          <SideBarMenu />
          <Route path="/home" exact component={Home}></Route>
          <Route path="/job" exact component={AddJobFormPage}/>
        </>
      </Switch>
    </Router>
  );
};

export default Routes;
