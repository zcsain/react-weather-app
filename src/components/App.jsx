import React from "react";
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
import BottomNavigation from "./navigation/BottomNavigation";
import NavigationButton from "./parts/NavigationButton";
import ErrorView from "./views/ErrorView";

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
	error: {
		minHeight: "80vh",
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
							{/* Tthere is definitely a better way to do this, then repeating components for each route */}
							{!xsDevice && <NavigationTabs />}
							<CurrentView />
							{xsDevice && <BottomNavigation />}
						</Route>
						<Route path="/daily" exact>
							{!xsDevice && <NavigationTabs />}
							Daily
							{xsDevice && <BottomNavigation />}
						</Route>
						<Route path="/hourly" exact>
							{!xsDevice && <NavigationTabs />}
							Hourly
							{xsDevice && <BottomNavigation />}
						</Route>
						<Route path="/button" exact>
							<NavigationButton />
						</Route>
						<Route>
							<Grid
								container
								item
								direction="column"
								justify="center"
								alignItems="center"
								className={classes.error}
							>
								<ErrorView />
							</Grid>
						</Route>
					</Switch>
					{/* {xsDevice && <BottomNavigation />} */}
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
