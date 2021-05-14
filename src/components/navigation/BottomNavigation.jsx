import React from "react";
import { connect } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

// Custom
// import MoreCard from "./MoreCard";
import ExpandableSettings from "../parts/ExpandableSettings";
import GitHubButton from "../parts/GitHubButton";

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
				color={props.selectedTheme ? "primary" : "inherit"}
			>
				<Toolbar>
					<Grid container justify="space-between" alignItems="center">
						<Grid item>
							<Button
								style={{ marginLeft: theme.spacing(-1) }}
								variant="text"
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
						</Grid>

						<Grid item>
							<IconButton color="inherit">
								<SearchIcon />
							</IconButton>
							<ExpandableSettings />
							<GitHubButton href="https://github.com/zcsain" edgeType="end" />
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedTheme: state.theme,
	};
};

export default connect(mapStateToProps)(BottomNavigation);
