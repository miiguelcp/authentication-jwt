import React, { useContext, useEffect, useState } from "react";
import { ItemCard } from "../component/ItemCard";
import { AppContext } from "../store/appContext";
const apiUrl = "https://www.swapi.tech/api/";

export const Home = () => {
	const [peoples, setPeoples] = useState([]);
	const [planets, setPlanets] = useState([]);
	const [vechicles, setVehicles] = useState([]);
	const { store, actions } = useContext(AppContext);
	let dbLocalPeople = localStorage.getItem("people");
	let dbLocalVehicles = localStorage.getItem("vehicles");
	let dbLocalPlanets = localStorage.getItem("planets");

	const getData = () => {
		if (dbLocalPlanets === null && dbLocalPeople === null && dbLocalVehicles === null) {
			const fetchData = async () => {
				try {
					let [dataPeople, dataVehicles, dataPlanets] = await Promise.all([
						fetch(`${apiUrl}/people`),
						fetch(`${apiUrl}/vehicles`),
						fetch(`${apiUrl}/planets`)
					]);
					if (dataPeople.ok) {
						const bodyPeople = await dataPeople.json();
						setPeoples(bodyPeople.results);
						dbLocalPeople = localStorage.setItem("people", JSON.stringify(bodyPeople.results));
					}
					if (dataVehicles.ok) {
						const bodyVehicles = await dataVehicles.json();
						setVehicles(bodyVehicles.results);
						dbLocalVehicles = localStorage.setItem("vehicles", JSON.stringify(bodyVehicles.results));
					}
					if (dataPlanets.ok) {
						const bodyPlanets = await dataPlanets.json();
						setPlanets(bodyPlanets.results);
						dbLocalPlanets = localStorage.setItem("planets", JSON.stringify(bodyPlanets.results));
					}
				} catch (err) {}
			};
			fetchData();
		} else {
			setPeoples(JSON.parse(localStorage.getItem("people")));
			setPlanets(JSON.parse(localStorage.getItem("planets")));
			setVehicles(JSON.parse(localStorage.getItem("vehicles")));
		}
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(
		() => {
			if (store.token) {
				actions.getFavorites(store.token);
			}
		},
		[store.token]
	);
	return (
		<div className="mt-5">
			<div className="container">
				{peoples.length === 0 ? (
					<div className="d-flex justify-content-center">
						<button className="btn btn-primary" type="button" disabled>
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
							Loading...
						</button>
					</div>
				) : (
					<>
						<h1 className="text-black">Characters</h1>
						<div className="d-flex flex-row flex-nowrap overflow-auto">
							{peoples.map((people, index) => {
								return <ItemCard key={index} item={people} nature="people" />;
							})}
						</div>
					</>
				)}
				{vechicles.length === 0 ? (
					""
				) : (
					<>
						<h1 className="text-black">Vehicles</h1>
						<div className="d-flex flex-row flex-nowrap overflow-auto">
							{vechicles.map((vechicle, index) => {
								return <ItemCard key={index} item={vechicle} nature="vehicles" />;
							})}
						</div>
					</>
				)}
				{planets.length === 0 ? (
					""
				) : (
					<>
						<h1 className="text-black">Planets</h1>
						<div className="d-flex flex-row flex-nowrap overflow-auto">
							{planets.map((planet, index) => {
								return <ItemCard key={index} item={planet} nature="planets" />;
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
};
