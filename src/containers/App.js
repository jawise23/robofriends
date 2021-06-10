import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
//import { robots } from "./robots";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

function App() {
	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchfield] = useState("");
	const [count, setCount] = useState(0);

	async function fetchUsers() {
		const resp = await fetch("https://jsonplaceholder.typicode.com/users");
		const data = await resp.json();
		return data;
	}

	useEffect(() => {fetchUsers().then(users => {setRobots(users)})}, [count]);

	const onSearchChange = (event) => {
		setSearchfield(event.target.value);
	};

	const filteredRobots = robots.filter((robot) => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	});

	return !robots.length ? (
		<h1>Loading</h1>
	) : (
		<div className="tc">
			<h1 className="f1">EMERGING TECHNOLOGY</h1>
			<button onClick={() => setCount(count + 1)}>Click Me</button>
			<SearchBox searchChange={onSearchChange} />
			<Scroll>
				<ErrorBoundry>
					<CardList robots={filteredRobots} />
				</ErrorBoundry>
			</Scroll>
		</div>
	);
}

export default App;
