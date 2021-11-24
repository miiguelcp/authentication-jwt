import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ItemDetails = ({ item }) => {
	return (
		<div className="row flex-wrap mt-md-5">
			<div className="col-md-6 p-0">
				<img
					style={{ width: "450px", height: "400px" }}
					src="https://cdn.europosters.eu/image/750/posters/star-wars-characters-i4731.jpg"
					className="img-fluid"
					alt=""
				/>
			</div>

			<div className="col-md-6 mt-3 mt-md-0 pl-md-4">
				<h1 className="display-3">{item[0][1]}</h1>
				<p>{`${item[6][1]}.`}</p>
			</div>
		</div>
	);
};

ItemDetails.propTypes = {
	item: PropTypes.array
};
