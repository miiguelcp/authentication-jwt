import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppContext } from "../store/appContext";

export const ItemCard = ({ item, nature }) => {
	const { store, actions } = useContext(AppContext);
	return (
		<div className="card" style={{ minWidth: "300px" }}>
			<img
				src="https://brandemia.org/contenido/subidas/2021/05/portada-starwars-imagenes-brandemia-blog-1000x670.jpg"
				className="card-img-top"
				alt={item.name}
			/>
			<div className="card-body">
				<h5 className="card-title">{item.name}</h5>
				<div className="d-flex justify-content-between">
					<Link className="btn btn-dark" to={`detail/${item.url.replace("https://www.swapi.tech/api/", "")}`}>
						{"Learn More!"}
					</Link>
					{store.token && (
						<button
							type="button"
							onClick={async event => {
								let url = item.url;
								if (
									store.favorites.find((favorite, index) => {
										return favorite.url === url;
									})
								) {
									let index = store.favorites.indexOf(
										store.favorites.find((favorite, index) => {
											return favorite.url === url;
										})
									);
									actions.removeFavorite(index, id);
								} else {
									const result = await actions.addToFavorite(item.name, url, true, nature, item.uid);
									if (result) {
										actions.getFavorites(store.token);
									}
								}
							}}
							className="btn border border-warning">
							{store &&
								(store.favorites.find((favorite, index) => {
									return (
										favorite.url ===
										"/detail/" + item.url.replace("https://www.swapi.tech/api/", "")
									);
								}) ? (
									<i className="fas fa-heart text-warning" />
								) : (
									<i className="far fa-heart text-warning" />
								))}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

ItemCard.propTypes = {
	item: PropTypes.object,
	nature: PropTypes.string
};
