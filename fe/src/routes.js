import { BrowserRouter as Router,Route } from "react-router-dom"
import AccountDetailsPage from "./pages/accountdetailspage/AccountDetailsPage";
import LandingPage from "./pages/landingpage/LandingPage"
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";



const Routes = () => {
    return (
        <Router>
                <Route path="/" exact component={LandingPage}></Route>
                <Route path="/signin" exact component={LoginPage}></Route>
                <Route path="/signup" exact component={RegisterPage}></Route>
                <Route path="/accountdetails" exact component={AccountDetailsPage}></Route>
        </Router>
    )
}

export default Routes;