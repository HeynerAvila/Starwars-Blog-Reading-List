import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Navbar } from "./component/navbar";
import { Main } from "./views/main";

import { Character } from "./views/character";
import { Planet } from "./views/planet";
import { Vehicle } from "./views/vehicle";
import { Starship } from "./views/starship";

import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { Starships } from "./component/starships";

const Layout = () => {
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Main} />

					<Route exact path="/character/:name" component={Character} />
					<Route exact path="/planet/:name" component={Planet} />
					<Route exact path="/vehicle/:name" component={Vehicle} />
					<Route exact path="/starship/:name" component={Starship} />

					<Route>
						<h1>Not found!</h1>
					</Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
