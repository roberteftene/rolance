import { BrowserRouter as Router,Route } from "react-router-dom"
import LandingPage from "./pages/landingpage/LandingPage"



const Routes = () => {
    return (
        <Router>
                <Route path="/" exact component={LandingPage}></Route>
        </Router>
    )
}

export default Routes;