import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Single } from "./views/single";

import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";
import AppContextProvider from "./store/appContext";
import { Signup } from "./views/Signup";
import { Login } from "./views/Login";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<AppContextProvider>
				<BrowserRouter basename={basename}>
					<ScrollToTop>
						<Navbar />
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/detail/:endpoint/:id">
								<Single />
							</Route>
							<Route exact path="/signup">
								<Signup />
							</Route>
							<Route exact path="/login">
								<Login />
							</Route>
							<Route>
								<h1>Not found!</h1>
							</Route>
						</Switch>
						<Footer />
					</ScrollToTop>
				</BrowserRouter>
			</AppContextProvider>
		</div>
	);
};

export default Layout;
