import React, { useState } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// Material UI
import {
	makeStyles,
	ThemeProvider,
	createMuiTheme,
	useTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom
import Header from "./navigation/Header";
import CardV1 from "./CardV1";
import CardGrid from "./CardGrid";
import CurrentView from "./views/CurrentView";
import history from "../history";
import SearchField from "./parts/HomeSearchField";
import NavigationTabs from "./navigation/NavigationTabs";
import BottomNavEdit from "./navigation/BottomNavEdit";

const dark = createMuiTheme({
	palette: {
		type: "dark",
		// makes text white, or anything with the "primary" keyword
		primary: {
			main: "#fff",
		},
	},
});

const blueLight = createMuiTheme({
	palette: {
		type: "light",
		primary: {
			main: "#1976d2",
		},
	},
});

const useStyles = makeStyles((theme) => ({
	[theme.breakpoints.up("sm")]: {
		container: {
			marginTop: theme.spacing(9),
		},
	},
	[theme.breakpoints.down("xs")]: {
		container: {
			marginTop: theme.spacing(2),
		},
	},
}));

function App(props) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const xsDevice = useMediaQuery(theme.breakpoints.down("xs"));

	return (
		<ThemeProvider theme={props.selectedTheme ? blueLight : dark}>
			<CssBaseline />
			<Router history={history}>
				<Container maxWidth="md" className={classes.container}>
					{!xsDevice && <Header searchFieldInAppBar={true} />}
					<Switch>
						{/* If no location is provide redirect to home */}
						<Redirect exact from="/current" to="/" />
						<Route path="/" exact>
							<SearchField />
						</Route>
						<Route path="/explore/:location" exact>
							<CurrentView />
						</Route>
						<Route path="/testArea" exact>
							<Grid container spacing={2} direction="column">
								<Grid item>
									<CardGrid />
								</Grid>
								<Grid item>
									<CardGrid />
								</Grid>
								<Grid item>
									<CardGrid />
								</Grid>
								<Grid item>
									<CardV1 />
								</Grid>
							</Grid>
						</Route>
						<Route path="/current/:location" exact>
							<NavigationTabs />
							<CurrentView />
						</Route>
						<Route path="/daily" exact>
							<NavigationTabs />
							Daily
						</Route>
						<Route path="/hourly" exact>
							<NavigationTabs />
							Hourly
						</Route>
					</Switch>
					{xsDevice && <BottomNavEdit />}
				</Container>
			</Router>
		</ThemeProvider>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedTheme: state.theme,
	};
};

export default connect(mapStateToProps)(App);
