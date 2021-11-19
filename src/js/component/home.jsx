import React, { useEffect, useState } from "react";

import ToDoList from "./ToDoList.jsx";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/AnnaLemons";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [tasksComponents, setTasksComponents] = useState([]);
	const [failOnUpdating, setFailOnUpdating] = useState("");
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		fetch(URL)
			.then(response => {
				if (response.ok) {
					return response.json();
				}

				throw new Error("Fail on load");
			})
			.then(responseAsJson => {
				setUpdate(false);
				setTasks(responseAsJson);
			})
			.catch(error => {
				setFailOnUpdating(error.message);
			});
	}, []);

	useEffect(() => {
		if (update) {
			fetch(URL, {
				method: "PUT",
				body: JSON.stringify(tasks),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					if (!response.ok) {
						throw new Error("Failed updating tasks");
					}
				})
				.catch(error => {
					setFailOnUpdating(error.message);
				});
		}
	}, [update]);

	useEffect(() => {
		if (tasks.length != 0) {
			setTasksComponents(
				tasks.map((task, index) => {
					return (
						<ToDoList
							deleteFunction={updateFunction}
							key={index.toString()}
							id={index.toString()}
							label={task.label}
						/>
					);
				})
			);
		}
	}, [tasks]);

	const updateFunction = id => {
		setTasks(tasks.filter((_, index) => index != id));
	};

	return (
		<div className="container text-center mt-5">
			{failOnUpdating && <h1>{failOnUpdating}</h1>}
			<form
				onSubmit={event => {
					event.preventDefault();
					setUpdate(true);
					setTasks([
						...tasks,
						{
							label: document.querySelector("input").value,
							done: false
						}
					]);
				}}>
				<input type="text" placeholder="Enter task..." />
			</form>
			<ul className="toDos">{tasksComponents}</ul>
		</div>
	);
};

export default Home;
