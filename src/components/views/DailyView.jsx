import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom
// import Loader from "../parts/Loader";
import Backdrop from "../parts/Backdrop";
import FactsCards from "../parts/FactsCard";
import { fetchOneCall } from "../../actions";
import DailyCard from "../parts/DailyCard";
import TestCard from "../parts/TestCard";

const useStyles = makeStyles((theme) => ({}));

function DailyView(props) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showFacts = useMediaQuery(theme.breakpoints.up("sm"));
	const { oneCall } = props;
	const { daily: days, timezone_offset: offset } = oneCall;

	return (
		<React.Fragment>
			{Object.keys(oneCall).length === 0 ? (
				<Backdrop />
			) : (
				<Grid container spacing={2}>
					<Grid container item direction="column" spacing={2} sm={8}>
						<Grid item>
							<TestCard
								day={days[0]}
								timezoneOffset={offset}
								setTemp1={900}
								setTemp2={900}
							/>
						</Grid>
						<Grid item>
							<TestCard
								day={days[0]}
								timezoneOffset={offset}
								setTemp1={90}
								setTemp2={90}
							/>
						</Grid>

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
