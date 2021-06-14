import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

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
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// Custom
import Header from "./navigation/Header";
import CurrentView from "./views/CurrentView";
import DailyView from "./views/DailyView";
import HourlyView from "./views/HourlyView";
import history from "../history";
import HomeSearchField from "./parts/HomeSearchField";
import NavigationTabs from "./navigation/NavigationTabs";
import BottomNavigation from "./navigation/BottomNavigation";
import ErrorView from "./views/ErrorView";
import ScrollTop from "./parts/ScrollTop";
import { setSearchHistory, setTheme, setUnits } from "../actions";
import { SIMPLE_WEATHER } from "../utils/types";

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
		secondary: {
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

function App({
	selectedTheme,
	selectedUnits,
	searchHistory,
	setTheme,
	setUnits,
	setSearchHistory,
	// searchTerm,
}) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const xsDevice = useMediaQuery(theme.breakpoints.down("xs"));
	// const cookies = new Cookies();
	// This doesn't do much, but react stops complaining
	const cookies = useMemo(() => new Cookies(), []);

	useEffect(() => {
		// Load cookies
		const cookie = cookies.get(SIMPLE_WEATHER);

		// Set state
		if (cookie !== undefined) {
			setTheme(cookie.preferredTheme);
			setUnits(cookie.preferredUnits);

			console.log(cookie);

			if (cookie.searchHistory !== undefined) {
				setSearchHistory(cookie.searchHistory);
			}
		}
	}, [cookies, setTheme, setUnits, setSearchHistory]);

	useEffect(() => {
		// Save cookies
		cookies.set(
			SIMPLE_WEATHER,
			{
				preferredTheme: selectedTheme,
				preferredUnits: selectedUnits,
				searchHistory: searchHistory,
			},
			{ path: "/" }
		);
		// Again not sure why react wants "cookies" as a dependency
	}, [selectedTheme, selectedUnits, searchHistory, cookies]);

	return (
		<ThemeProvider theme={selectedTheme ? blueLight : dark}>
			<CssBaseline />
			<Router history={history}>
				<Container maxWidth="md" className={classes.container}>
					{/* {!xsDevice && <Header searchFieldInAppBar={true} />} */}
					<Switch>
						{/* If no location is provide redirect to home */}
						<Redirect exact from="/current" to="/" />
						<Redirect exact from="/daily" to="/" />
						<Redirect exact from="/hourly" to="/" />
						<Route path="/" exact>
							{!xsDevice && <Header searchFieldInAppBar={false} />}
							<HomeSearchField />
						</Route>
						{/* There is definitely a better way to do this, then repeating components for each route */}
						<Route path="/current/:location" exact>
							{!xsDevice && <Header searchFieldInAppBar={true} />}
							{!xsDevice && <NavigationTabs />}
							<CurrentView />
							{xsDevice && <BottomNavigation />}
						</Route>
						<Route path="/daily/:location" exact>
							{!xsDevice && <Header searchFieldInAppBar={true} />}
							{!xsDevice && <NavigationTabs />}
							<DailyView />
							{xsDevice && <BottomNavigation />}
						</Route>
						<Route path="/hourly/:location" exact>
							{!xsDevice && <Header searchFieldInAppBar={true} />}
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
					{useMediaQuery(theme.breakpoints.up("sm")) && (
						<ScrollTop>
							<Fab color="primary" size="small" aria-label="scroll back to top">
								<KeyboardArrowUpIcon />
							</Fab>
						</ScrollTop>
					)}
				</Container>
			</Router>
		</ThemeProvider>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedTheme: state.theme,
		selectedUnits: state.units,
		searchHistory: state.searchHistory,
		// searchTerm: state.location, // For some reason this causes a bug in NavigationTabs component, no clue why
	};
};

export default connect(mapStateToProps, {
	setTheme,
	setUnits,
	setSearchHistory,
})(App);
