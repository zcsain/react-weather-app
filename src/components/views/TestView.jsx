import React, { useEffect } from "react";
import { connect } from "react-redux";

// Material UI
import Typography from "@material-ui/core/Typography";

// Custom
import { fetchGeolocation } from "../../actions";

function TestView({ geolocations, fetchGeolocation }) {
	useEffect(() => {
		fetchGeolocation("Paris");
	}, [fetchGeolocation]);

	console.log(geolocations);

	return (
		<React.Fragment>
			{geolocations.map((item, index) => {
				return (
					<React.Fragment key={index}>
						<Typography variant="h5" color="inherit">
							{index}.
						</Typography>

						<Typography variant="body2" color="inherit">
							{item.name + ", "}
							{item.state ? item.state + ", " : null}
							{item.country}
						</Typography>
					</React.Fragment>
				);
			})}
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		geolocations: state.geolocation,
	};
};

export default connect(mapStateToProps, { fetchGeolocation })(TestView);
