import { useState } from "react";
import React, { useContext } from "react";
import { AppContext } from "../store/appContext";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export const LoginContent = () => {
	const { store, actions } = useContext(AppContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const login = async () => {
		let data = {
			email: email,
			password: password
		};

		const response = await fetch(store.BASE_URL + "login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		const body = await response.json();
		if (response.ok) {
			Swal.fire({
				icon: "success",
				title: "Login Successfull!",
				showConfirmButton: false,
				timer: 1500
			});
			history.push("/"), 3500;
			actions.setToken(body.token);
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!"
			});
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-center mt-3">
				<div className="col-4 text-center text-black fw-bold">
					<h1>Login</h1>
				</div>
			</div>
			<div className="row justify-content-center mt-3">
				<div className="col-4 text-center">
					<input
						placeholder="Email"
						type="text"
						value={email}
						onChange={event => {
							setEmail(event.target.value);
						}}
					/>
				</div>
			</div>
			<div className="row justify-content-center mt-3">
				<div className="col-4 text-center">
					<input
						placeholder="Password"
						type="text"
						value={password}
						onChange={event => {
							setPassword(event.target.value);
						}}
					/>
				</div>
			</div>
			<div className="row justify-content-center mt-3">
				<div className="col-3 text-center">
					<button
						className="btn btn-outline-dark"
						onClick={event => {
							login();
						}}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};
