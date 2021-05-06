import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import TuneIcon from "@material-ui/icons/Tune";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import Brightness7Icon from "@material-ui/icons/Brightness7"; //light
import Brightness4Icon from "@material-ui/icons/Brightness4"; //dark
import GitHubIcon from "@material-ui/icons/GitHub";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

// Custom
import MoreCard from "./MoreCard";
import { More } from "@material-ui/icons";

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

function BottomNavigation(props) {
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
					{/* <Button variant="contained" style={{ marginLeft: "-8px" }}>
						WHY
					</Button> */}
					<Grid container justify="space-between" alignItems="center">
						<Grid item>
							<Button
								style={{ marginLeft: theme.spacing(0) }}
								variant="outlined"
								aria-label="change units"
								color="inherit"
								className={classes.settingsButton}
							>
								<Typography
									variant="button"
									className={classes.settingsButtonContent}
								>
									Daily
								</Typography>
								<ExpandMoreIcon fontSize="small" />
							</Button>
						</Grid>

						<Grid item>
							<IconButton color="inherit">
								<SearchIcon />
							</IconButton>
							<MoreCard />
							<IconButton edge="end" color="inherit">
								<GitHubIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default BottomNavigation;
