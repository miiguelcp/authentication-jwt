import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export const AppContext = createContext(undefined);

const AppContextProvider = ({ children }) => {
	const [store, setStore] = useState({
		favorites: [],
		token: undefined,
		BASE_URL: "http://localhost:3010/"
	});

	const actions = {
		getFavorites: async token => {
			const response = await fetch("http://127.0.0.1:3010/favorites", {
				method: "GET",
				headers: { Authorization: "Bearer " + token }
			});
			const body = await response.json();
			if (response.ok) {
				setStore(prev => ({ ...prev, favorites: body }));
			}
		},
		addToFavorite: async (_name, _url, _isFav, _nature, uid) => {
			const response = await fetch("http://127.0.0.1:3010/favorites/" + _nature, {
				method: "POST",
				headers: { Authorization: "Bearer " + store.token, "Content-Type": "application/json" },
				body: JSON.stringify({ name: _name, uid: uid })
			});
			if (response.ok) {
				return true;
			}
			return false;
		},

		removeFavorite: async (index, id) => {
			const response = await fetch(`http://127.0.0.1:3010/favorites/${id}`, {
				method: "DELETE"
			});
			if (response.status == 204) {
				Swal.fire({
					icon: "success",
					title: "Favorite Deleted",
					showConfirmButton: false,
					timer: 1500
				});
			}
			const newFav = store.favorites.filter((fav, i) => i !== index);
			setStore(prev => ({ ...prev, favorites: newFav }));
		},

		setToken: token => {
			localStorage.setItem("token", token);
			setStore(prev => ({ ...prev, token: token }));
		},

		logout: () => {
			localStorage.removeItem("token");
			setStore(prev => ({
				...prev,
				token: undefined
			}));
		}
	};
	const context = { store, actions };

	return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
	children: PropTypes.node
};

export default AppContextProvider;
