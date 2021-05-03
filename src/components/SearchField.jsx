import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		// width: 600,
		// maxWidth: 800,
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	container: {
		marginTop: "33%",
	},
	cont: {
		display: "grid",
		justifyContent: "center",
		fontWeight: "bold",
		fontSize: "5em",
		marginBottom: "5%",
		textAlign: "center",
	},
}));

export default function CustomizedInputBase() {
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<Typography varinat="h1" className={classes.cont} color="primary">
				Weather App
			</Typography>
			<Paper component="form" className={classes.root}>
				<IconButton className={classes.iconButton} aria-label="menu">
					<SearchIcon />
				</IconButton>
				<InputBase
					className={classes.input}
					placeholder="Search"
					inputProps={{ "aria-label": "search" }}
				/>
			</Paper>
		</Container>
	);
}
