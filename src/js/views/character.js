import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import starWars800x600 from "../../img/star-wars-800x600.jpg";
import { Context } from "../store/appContext";
import { ItemDetails } from "../component/item-details";
import { ifArrayExistsAndHasData } from "../common/common.js";

export const Character = () => {
	const [character, setCharacter] = useState({});
	const { store, actions } = useContext(Context);
	let { name } = useParams();

	useEffect(() => {
		name = decodeURIComponent(name);
		checkIfWeHaveData();
		getCharacterByName(name);
	}, []);

	function checkIfWeHaveData() {
		if (ifArrayExistsAndHasData(store.charactersResponseJSON)) {
			let storedCharacters = JSON.parse(localStorage.getItem("characters"));
			actions.setCharacters(storedCharacters);
		}
	}

	function getCharacterByName() {
		let character = actions.getCharacterByName(name);
		if (character) {
			setCharacter(character);
		} else {
			alert("Character not found");
			throw Error("Character not found");
		}
	}

	function parseDetailsToItemDetails(object) {
		return [
			{
				label: "Genero",
				value: object.gender
			},
			{
				label: "Color de Pelo",
				value: object.hair_color
			},
			{
				label: "Altura",
				value: object.height
			},
			{
				label: "Masa",
				value: object.mass
			},
			{
				label: "Color de Piel",
				value: object.skin_color
			},
			{
				label: "Año de Nacimiento",
				value: object.birth_year
			}
		];
	}

	const itemDetails = parseDetailsToItemDetails(character);
	const description =
		"Dentro de la franquicia de medios Star Wars, existe una gran cantidad de personajes, " +
		"en este anexo se listan y describen tanto a los personajes principales como a otros menores. " +
		"Algunos de estos personajes solo pertenecen a la continuidad alternativa Leyendas, " +
		"material previo al reinicio del canon en 2014, por tanto forman parte de la historia " +
		"oficial de la saga. ";

	return <ItemDetails title={character.name} description={description} details={itemDetails} />;
};
