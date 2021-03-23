import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import starWars800x600 from "../../img/star-wars-800x600.jpg";
import { Context } from "../store/appContext";
import { ItemDetails } from "../component/item-details";
import { ifArrayExistsAndHasData } from "../common/common.js";

export const Starship = () => {
	const [starship, setStarship] = useState({});
	const { store, actions } = useContext(Context);
	let { name } = useParams();

	useEffect(() => {
		name = decodeURIComponent(name);
		checkIfWeHaveData();
		getStarshipByName(name);
	}, []);

	function checkIfWeHaveData() {
		if (ifArrayExistsAndHasData(store.starshipsResponseJSON)) {
			let storedStarships = JSON.parse(localStorage.getItem("starships"));
			actions.setStarships(storedStarships);
		}
	}

	function getStarshipByName(name) {
		let starship = actions.getStarshipByName(name);
		if (starship) {
			setStarship(starship);
		} else {
			alert("Starship not found");
			throw Error("Starship not found");
		}
	}

	function parseDetailsToItemDetails(object) {
		return [
			{
				label: "Fabricante",
				value: object.manufacturer
			},
			{
				label: "Modelo",
				value: object.model
			},
			{
				label: "Capacidad de Cargo",
				value: object.cargo_capacity
			},
			{
				label: "Consumibles",
				value: object.consumables
			},
			{
				label: "Tripulación",
				value: object.crew
			},
			{
				label: "Pasajeros",
				value: object.passengers
			}
		];
	}

	const itemDetails = parseDetailsToItemDetails(starship);
	const description =
		"En Star Wars existen inumerables naves estelares y formas de propulsión. La mayoría de " +
		"estos suelen tener un sistema de repulsión que los hace literalmente flotar sobre " +
		"el suelo. Además, también hay una gran variedad de naves tanto aéreos como " +
		"espaciales. Otros vehículos son sencillamente tanques zoomorfos que caminan como " +
		"animales sobre los suelos de los más inhóspitos planetas. ";

	return <ItemDetails title={starship.name} description={description} details={itemDetails} />;
};
