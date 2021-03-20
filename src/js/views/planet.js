import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import starWars800x600 from "../../img/star-wars-800x600.jpg";
import { Context } from "../store/appContext";
import { ItemDetails } from "../component/item-details";
import { ifArrayExistsAndHasData } from "../common/common.js";

export const Planet = () => {
	const [planet, setPlanet] = useState({});
	const { store, actions } = useContext(Context);
	let { name } = useParams();

	useEffect(() => {
		name = decodeURIComponent(name);
		checkIfWeHaveData();
		getPlanetByName(name);
	}, []);

	function checkIfWeHaveData() {
		if (ifArrayExistsAndHasData(store.planetsResponseJSON)) {
			let storedPlanets = JSON.parse(localStorage.getItem("planets"));
			actions.setPlanets(storedPlanets);
		}
	}

	function getPlanetByName(name) {
		let planet = actions.getPlanetByName(name);
		if (planet) {
			setPlanet(planet);
		} else {
			alert("Planet not found");
			throw Error("Planet not found");
		}
	}
	function parseDetailsToItemDetails(object) {
		return [
			{
				label: "Población",
				value: object.population
			},
			{
				label: "Terreno",
				value: object.terrain
			},
			{
				label: "Clima",
				value: object.climate
			},
			{
				label: "Diametro",
				value: object.diameter
			},
			{
				label: "Gravedad",
				value: object.gravity
			},
			{
				label: "Periodo de Rotación",
				value: object.rotation_period
			}
		];
	}

	const itemDetails = parseDetailsToItemDetails(planet);
	const description =
		"En este anexo se listan los planetas y satélites naturales mencionados " +
		"en el universo ficticio de la franquicia Star Wars, tanto los considerados " +
		"canónicos como los del universo expandido (Star Wars Legends). ";

	return <ItemDetails title={planet.name} description={description} details={itemDetails} />;
};
