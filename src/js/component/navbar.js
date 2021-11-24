import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store/appContext";
import Swal from "sweetalert2";

export const Navbar = () => {
	const { store, actions } = useContext(AppContext);

	let handleRemoveFav = (index, id) => {
		let navDropDown = document.querySelector("#navDropDown");
		let dropButton = document.querySelector("#dropdownMenuButton1");
		navDropDown.classList.add("dropdown-menu", "dropdown-menu-end", "show");
		navDropDown.setAttribute("data-bs-popper", "none");
		dropButton.classList.add("btn", "btn-primary", "dropdown-toggle", "show");
		dropButton.setAttribute("aria-expanded", "true");
		actions.removeFavorite(index, id);
	};

	return (
		<nav className="navbar navbar-light bg-light p-0">
			<div className="container-fluid">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
						<img
							src="https://raw.githubusercontent.com/detain/svg-logos/master/svg/star-wars.svg"
							style={{ width: "7rem", margin: "none" }}
						/>
					</span>
				</Link>
				{!store.token ? (
					<>
						<Link to="/login" type="button" className="btn btn-outline-warning">
							{"Login"}
						</Link>
						<Link to="/signup" type="button" className="btn btn-outline-warning">
							{"Sign Up"}
						</Link>
					</>
				) : (
					<>
						<button
							className="btn btn-dark"
							onClick={event => {
								Swal.fire({
									icon: "success",
									title: "Logout Successfull!",
									showConfirmButton: false,
									timer: 1500
								});
								actions.logout();
							}}>
							Log out
						</button>
						<div className="dropdown">
							<button
								className="btn btn-warning dropdown-toggle"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								Favorites <span className="dot">{store.favorites.length}</span>
							</button>
							<ul
								id="navDropDown"
								className="dropdown-menu dropdown-menu-end"
								aria-labelledby="dropdownMenuButton1">
								{store.favorites.map((favorite, index) => {
									return (
										<li className="d-flex align-items-center" key={index}>
											<Link to={favorite.url} className="dropdown-item">
												{favorite.favoriteName}
											</Link>
											<i
												className="far fa-trash-alt pe-2"
												onClick={e => {
													handleRemoveFav(index, favorite.id);
													if (store.favorites.length === 1) {
														navDropDown.classList.remove("show");
														navDropDown.removeAttribute("data-bs-popper");
													}
												}}
											/>
										</li>
									);
								})}
							</ul>
						</div>
					</>
				)}
			</div>
		</nav>
	);
};
