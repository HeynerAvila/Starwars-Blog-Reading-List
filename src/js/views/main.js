import React from "react";
import { Characters } from "../component/characters";
import { Planets } from "../component/planets";
import { Vehicles } from "../component/vehicles";
import { Starships } from "../component/starships";

export const Main = () => {
	return (
		<div className="container">
			<Characters />
			<Planets />
			<Vehicles />
			<Starships />
		</div>
	);
};
