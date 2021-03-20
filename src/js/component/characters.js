import React, { useState, useEffect, useContext } from "react";
import { HorizontalScrollList } from "./horizontal-scroll-list";
import { Context } from "../store/appContext";

export const Characters = () => {
	const { store, actions } = useContext(Context);
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		charactersProcess();
	}, []);

	async function charactersProcess() {
		await getCharacters();
		localStorage.setItem("characters", JSON.stringify(store.charactersResponseJSON));
		const charactersMap = mapCharacters();
		setCharacters(charactersMap);
	}

	async function getCharacters() {
		await actions.fetchGetCharacters();
	}

	function mapCharacters() {
		let jsonMap = [];
		if (store.charactersResponseJSON.results) {
			jsonMap = store.charactersResponseJSON.results.map(function(character, index) {
				let details = [
					"Genero: " + character.gender,
					"Color de Pelo: " + character.hair_color,
					"Color de Ojos: " + character.eye_color
				];
				return {
					name: character.name,
					details: details,
					isFavorite: false
				};
			});
		}
		return jsonMap;
	}

	return <HorizontalScrollList listName={"Personajes"} items={characters} link={"character"} />;
};
