import React, { useState, useEffect, useContext } from "react";
import { HorizontalScrollList } from "./horizontal-scroll-list";
import { Context } from "../store/appContext";

export const Starships = () => {
	const { store, actions } = useContext(Context);
	const [starships, setStarships] = useState([]);

	useEffect(() => {
		starshipsProcess();
	}, []);

	async function starshipsProcess() {
		await getStarships();
		localStorage.setItem("starships", JSON.stringify(store.starshipsResponseJSON));
		const starshipsMap = mapStarships();
		setStarships(starshipsMap);
	}

	async function getStarships() {
		await actions.fetchGetStarships();
	}

	function mapStarships() {
		let jsonMap = [];
		if (store.starshipsResponseJSON.results) {
			jsonMap = store.starshipsResponseJSON.results.map(function(starship, index) {
				let details = ["Fabricante: " + starship.manufacturer, "Modelo: " + starship.model];
				return {
					name: starship.name,
					details: details
				};
			});
		}
		return jsonMap;
	}

	return <HorizontalScrollList listName={"Naves Estelares"} items={starships} link={"starship"} />;
};
