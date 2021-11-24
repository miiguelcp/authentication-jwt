import React from "react";
import PropTypes from "prop-types";

export const Description = ({ value }) => {
	return (
		<div className="col border-top border-black text-center">
			<p className="text-black fw-bold pt-3 m-0">{`${value[0]}:`}</p>
			<p className="text-black">{`${value[1]}.`}</p>
		</div>
	);
};

Description.propTypes = {
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};
