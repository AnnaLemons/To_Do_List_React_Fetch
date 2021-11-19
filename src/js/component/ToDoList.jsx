import React from "react";
import PropTypes from "prop-types";

const ToDoList = props => {
	return (
		<li
			onClick={() => {
				props.deleteFunction(props.id);
			}}>
			{props.label}
			{props.value}
		</li>
	);
};

ToDoList.propTypes = {
	label: PropTypes.string,
	value: PropTypes.bool,
	deleteFunction: PropTypes.func,
	id: PropTypes.string
};
export default ToDoList;
