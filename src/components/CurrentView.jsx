import React, { useState } from "react";
import { connect } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";

// Custom
import iconsMap from "../utils/iconsMap";
import Backdrop from "./Backdrop";

const useStyles = makeStyles((theme) => ({}));

function CurrentView(props) {
	const classes = useStyles();

	const renderData = () => {
		const { weather, main, wind, dt, sys } = props.current;

		const date = new Date(dt * 1000).toLocaleDateString("default", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
		const icon = iconsMap[weather[0].icon];

		return (
			<React.Fragment>
				<Card>
					<CardHeader
						avatar={<Icon className={`${icon}`} />}
						title={`Current Weather - ${props.match.params.location}`}
						subheader={date}
					/>

					<CardContent>Fuck you</CardContent>
				</Card>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			{/* <CircularProgress color="inherit" /> */}
			<Backdrop />
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		current: state.current,
	};
};

export default connect(mapStateToProps)(CurrentView);
