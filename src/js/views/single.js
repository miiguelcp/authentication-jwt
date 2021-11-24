import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { ItemDetails } from "../component/ItemDetails";
import { Description } from "../component/Description";

const apiUrl = "https://www.swapi.tech/api";

export const Single = props => {
	const params = useParams();
	const [item, setItem] = useState(undefined);

	const getData = async (id, endpoint) => {
		const response = await fetch(`${apiUrl}/${endpoint}/${id}`);
		if (response.ok) {
			const body = await response.json();
			let arrayItem = [];
			if (endpoint === "people") {
				arrayItem.push(
					["Name", body.result.properties.name],
					["Birth Day", body.result.properties.birth_year],
					["Gender", body.result.properties.gender],
					["Height", body.result.properties.height],
					["Skin Color", body.result.properties.skin_color],
					["Eye Color", body.result.properties.eye_color],
					["Description", body.result.description]
				);
			} else if (endpoint === "vehicles") {
				arrayItem.push(
					["Name", body.result.properties.name],
					["Crew", body.result.properties.crew],
					["Passengers", body.result.properties.passengers],
					["Vehicle Class", body.result.properties.vehicle_class],
					["Model", body.result.properties.model],
					["Manufacturer", body.result.properties.manufacturer],
					["Description", body.result.description]
				);
			} else {
				arrayItem.push(
					["Name", body.result.properties.name],
					["Climate", body.result.properties.climate],
					["Terrain", body.result.properties.terrain],
					["Gravity", body.result.properties.gravity],
					["Diameter", body.result.properties.diameter],
					["Population", body.result.properties.population],
					["Description", body.result.description]
				);
			}

			setItem(arrayItem);
		}
	};

	useEffect(
		() => {
			if (params.id && params.endpoint) {
				getData(params.id, params.endpoint);
			}
		},
		[params.id, params.endpoint]
	);

	return (
		<>
			<div className="container">
				{item ? (
					<ItemDetails item={item} />
				) : (
					<div className="d-flex py-3 justify-content-center">
						<button className="btn btn-primary" type="button" disabled>
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
							Loading...
						</button>
					</div>
				)}
			</div>
			<div className="row py-5">
				{item &&
					item.map((prop, index) => {
						return <Description key={index} value={prop} />;
					})}
			</div>
		</>
	);
};

Single.propTypes = {
	item: PropTypes.object
};
