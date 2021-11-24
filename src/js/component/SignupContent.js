import React, { useContext, useState } from "react";
import { AppContext } from "../store/appContext";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export const SignupContent = () => {
	const { store, actions } = useContext(AppContext);
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const signup = async () => {
		let data = {
			email: email,
			username: username,
			password: password
		};

		const response = await fetch(store.BASE_URL + "users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		if (response.ok) {
			Swal.fire({
				icon: "success",
				title: "User created!",
				showConfirmButton: false,
				timer: 1500
			});
			history.push("/login");
		} else {
			Swal.fire({
				icon: "error",
				title: `Something went wrong! ${response.statusText}`,
				showConfirmButton: false,
				timer: 1500
			});
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-center mt-3">
				<div className="col-4 text-center text-black fw-bold">
					<h1>Sign up</h1>
				</div>
			</div>
			<div className="row mt-3 justify-content-center">
				<div className="col-4 text-center">
					<input
						placeholder="Username"
						type="text"
						value={username}
						onChange={event => {
							setUsername(event.target.value);
						}}
					/>
				</div>
			</div>
			<div className="row mt-3 justify-content-center">
				<div className="col-4 text-center">
					<input
						placeholder="email"
						type="text"
						value={email}
						onChange={event => {
							setEmail(event.target.value);
						}}
					/>
				</div>
			</div>
			<div className="row mt-3 justify-content-center">
				<div className="col-4 text-center">
					<input
						placeholder="Password"
						type="password"
						value={password}
						onChange={event => {
							setPassword(event.target.value);
						}}
					/>
				</div>
			</div>
			<div className="row mt-3 justify-content-center">
				<div className="col-3 text-center">
					<button
						onClick={event => {
							signup();
						}}
						className="btn btn-outline-warning">
						Sign up
					</button>
				</div>
			</div>
		</div>
	);
};
