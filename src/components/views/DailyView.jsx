import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// Material UI
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom
// import Loader from "../parts/Loader";
import Backdrop from "../parts/Backdrop";
import FactsCards from "../parts/FactsCard";
import { fetchOneCall } from "../../actions";
import DailyCard from "../parts/DailyCard";

function DailyView(props) {
	const theme = useTheme();
	const showFacts = useMediaQuery(theme.breakpoints.up("sm"));
	const { oneCall, selectedUnits, searchTerm, fetchOneCall } = props;
	const { daily: days, timezone_offset: offset } = oneCall;

	const locationToSearch = searchTerm || props.match.params.location;

	useEffect(() => {
		fetchOneCall(locationToSearch, selectedUnits.keyword);
		// React complains if "fetchOneCall" is not a dependency, even do
		// it is a function and does not change, not sure why that is
		// required
	}, [locationToSearch, selectedUnits, fetchOneCall]);

	return (
		<React.Fragment>
			{Object.keys(oneCall).length === 0 ? (
				<Backdrop />
			) : (
				<Grid container spacing={2}>
					<Grid container item direction="column" spacing={2} sm={8}>
						{days.map((day) => (
							<Grid item key={day.dt}>
								<DailyCard day={day} timezoneOffset={offset} />
							</Grid>
						))}
					</Grid>
					{showFacts && (
						<Grid container item direction="column" spacing={2} xs>
							<FactsCards n={4} />
						</Grid>
					)}
				</Grid>
			)}
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		oneCall: state.oneCall,
		selectedUnits: state.units,
		searchTerm: state.location,
	};
};

export default connect(mapStateToProps, { fetchOneCall })(
	withRouter(DailyView)
);
