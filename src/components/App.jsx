import React from "react";
import { connect } from "react-redux";

import { setUnits } from "../actions/index";

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>App</h1>
				<div>{this.props.units}</div>
				<button onClick={() => this.props.setUnits("imperial")}>
					Imperial
				</button>
				<button onClick={() => this.props.setUnits("metric")}>Metric</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		units: state.units,
	};
};

export default connect(mapStateToProps, { setUnits })(App);
