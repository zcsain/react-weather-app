import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Chip from "@material-ui/core/Chip";

// Custom
import Loader from "../parts/Loader";
import Backdrop from "../parts/Backdrop";
import FactsCards from "../parts/FactsCard";
import { fetchOneCall } from "../../actions";
import CardGrid from "../CardGrid";
import DateTimeBadge from "../parts/DateTimeBadge";
import TestingGrounds from "../TestingGrounds";
import DailyCard from "../parts/DailyCard";

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
							<TestingGrounds />
						</Grid>
						<Grid item>
							<TestingGrounds />
						</Grid>
						<Grid item>
							<TestingGrounds />
						</Grid>
						<Grid item>
							<CardGrid />
						</Grid>
						<Grid item>
							<DailyCard day={days[0]} timezoneOffset={offset} />
						</Grid>
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
