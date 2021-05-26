import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Material UI
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom
import Backdrop from "../parts/Backdrop";
import FactsCards from "../parts/FactsCard";
import { fetchOneCall, setSearchTerm } from "../../actions";
import HourlyCard from "../cards/HourlyCard";
import hoursWithSunriseSunsetData from "../../utils/hoursWithSunriseSunsetData";

function HourlyView({
	oneCall,
	selecteUnits,
	searchTerm,
	fetchOneCall,
	setSearchTerm,
	match,
}) {
	const theme = useTheme();
	const showFacts = useMediaQuery(theme.breakpoints.up("sm"));
	const { hourly: hours, timezone_offset: offset } = oneCall;

	const locationToSearch = searchTerm || match.params.location;

	useEffect(() => {
		fetchOneCall(locationToSearch, selecteUnits.keyword);
		setSearchTerm(locationToSearch);
	}, [locationToSearch, selecteUnits, fetchOneCall, setSearchTerm]);

	return (
		<React.Fragment>
			{Object.keys(oneCall).length === 0 ? (
				<Backdrop />
			) : (
				<Grid container spacing={2}>
					<Grid container item direction="column" spacing={2} sm={8}>
						{hours.map((hour) => (
							<Grid item key={hour.dt}>
								<HourlyCard hour={hour} timezoneOffset={offset} />
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
		selecteUnits: state.units,
		searchTerm: state.location,
	};
};

export default connect(mapStateToProps, { fetchOneCall, setSearchTerm })(
	withRouter(HourlyView)
);
