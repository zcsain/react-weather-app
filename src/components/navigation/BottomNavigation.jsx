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
import ExpandableSettings from "../parts/ExpandableSettings";
import GitHubButton from "../parts/GitHubButton";
import NavigationButton from "../parts/NavigationButton";

const useStyles = makeStyles((theme) => ({
	appBar: {
		top: "auto",
		bottom: 0,
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
							<NavigationButton />
						</Grid>

						<Grid item>
							<IconButton color="inherit">
								<SearchIcon />
							</IconButton>
							<ExpandableSettings denseList={false} />
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
