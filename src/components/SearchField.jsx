import React from "react";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Translate } from "@material-ui/icons";

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
	[theme.breakpoints.only("xs")]: {
		container: {
			marginTop: "auto",
			position: "fixed",
			top: "45%",
			left: "50%",
			transform: "translate(-50%, -50%)",
		},
	},
	content: {
		display: "grid",
		justifyContent: "center",
		fontWeight: "bold",
		fontSize: "4.6rem",
		marginBottom: "5%",
		textAlign: "center",
	},
	[theme.breakpoints.down("sm")]: {
		content: {
			fontSize: "3.6rem",
		},
	},
	[theme.breakpoints.down("xs")]: {
		content: {
			fontSize: "2.6rem",
		},
	},
}));

export default function CustomizedInputBase() {
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<Container
			className={classes.container}
			style={{
				display: "grid",
				alignContent: "center",
				alignItems: "center",
				alignSelf: "center",
			}}
		>
			<Typography varinat="h1" className={classes.content} color="primary">
				Breeze Weather
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
