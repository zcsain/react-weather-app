import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Custom
import MoreCard from "./MoreCard";

const useStyles = makeStyles((theme) => ({
	text: {
		padding: theme.spacing(2, 2, 0),
	},
	paper: {
		paddingBottom: 50,
	},
	list: {
		marginBottom: theme.spacing(2),
	},
	subheader: {
		backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		top: "auto",
		bottom: 0,
	},
	grow: {
		flexGrow: 1,
	},
	fabButton: {
		position: "absolute",
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: "0 auto",
	},
	settingsButton: {
		marginLeft: "16px",
	},
	settingsButtonContent: {
		paddingLeft: "8px",
		paddingRight: "2px",
		fontWeight: "bold",
	},
}));

export default function BottomAppBar(props) {
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<React.Fragment>
			{/* Toolbar is here to offset content from AppBar */}
			<Toolbar style={{ marginTop: theme.spacing(2) }} />
			<AppBar
				position="fixed"
				className={classes.appBar}
				color={props.theme ? "primary" : "inherit"}
			>
				<Toolbar>
					{/* <IconButton edge="start" color="inherit" aria-label="open drawer">
						<MenuIcon />
					</IconButton> */}
					{/* <Fab color="primary" aria-label="add" className={classes.fabButton}>
						<SearchIcon />
					</Fab> */}
					<Button
						aria-label="change units"
						color="inherit"
						className={classes.settingsButton}
					>
						<Typography
							variant="button"
							className={classes.settingsButtonContent}
						>
							Current
						</Typography>
						<ExpandMoreIcon fontSize="small" />
					</Button>
					<div className={classes.grow} />
					{/* <IconButton color="inherit">
						<SearchIcon />
					</IconButton> */}
					{/* <IconButton color="inherit">
						<SettingsIcon />
					</IconButton> */}
					<IconButton color="inherit">
						<SearchIcon />
					</IconButton>
					<IconButton color="inherit">
						<GitHubIcon />
					</IconButton>
					{/* <IconButton color="inherit">
						<MoreIcon />
					</IconButton> */}
					<MoreCard />
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}
