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
import CurrentView from "./views/CurrentView";
import CurrentViewV2 from "./views/CurrentViewV2";
import DailyView from "./views/DailyView";
import HourlyView from "./views/HourlyView";
import history from "../history";
import SearchField from "./parts/HomeSearchField";
import NavigationTabs from "./navigation/NavigationTabs";
import BottomNavigation from "./navigation/BottomNavigation";
import ErrorView from "./views/ErrorView";

const dark = createMuiTheme({
	palette: {
		type: "dark",
		// makes text white, or anything with the "primary" keyword
		primary: {
			main: "#fff",
		},
	},
	overrides: {
		MuiTableCell: {
			root: {
				//This can be referred from Material UI API documentation.
				padding: "12px 8px",
			},
		},
		MuiTableRow: {
			root: {
				"&:last-child td": {
					borderBottom: 0,
				},
			},
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
	overrides: {
		MuiTableCell: {
			root: {
				//This can be referred from Material UI API documentation.
				padding: "12px 8px",
			},
		},
		MuiTableRow: {
			root: {
				"&:last-child td": {
					borderBottom: 0,
				},
			},
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
		minHeight: "90vh",
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
						<Redirect exact from="/daily" to="/" />
						<Redirect exact from="/hourly" to="/" />
						<Route path="/" exact>
							<SearchField />
						</Route>
						{/* Tthere is definitely a better way to do this, then repeating components for each route */}
						<Route path="/current/:location" exact>
							{!xsDevice && <NavigationTabs />}
							<CurrentView />
							{/* <CurrentViewV2 /> */}
							{xsDevice && <BottomNavigation />}
						</Route>
						<Route path="/daily/:location" exact>
							{!xsDevice && <NavigationTabs />}
							<DailyView />
							{xsDevice && <BottomNavigation />}
						</Route>
						<Route path="/hourly/:location" exact>
							{!xsDevice && <NavigationTabs />}
							<HourlyView />
							{xsDevice && <BottomNavigation />}
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
