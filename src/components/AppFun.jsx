import React, { useState } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

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
import Header from "./Header";
import { setUnits, setSearchTerm } from "../actions/index";
import CardV1 from "./CardV1";
import CardGrid from "./CardGrid";
import CurrentView from "./CurrentView";
import history from "../history";
import SearchField from "./SearchField";
import NavigationTabs from "./NavigationTabs";
import BottomNavigation from "./BottomNavigation";
import BottomNavEdit from "./BottomNavEdit";

const dark = createMuiTheme({
	palette: {
		type: "dark",
		// makes text white, or anything with the "primary" keyword
		primary: {
			main: "#fff",
		},
		// primary: {
		// 	main: "#1976d2",
		// },
		// primary: {
		// 	main: "#424242",
		// },
	},
});

// const light = createMuiTheme({
// 	palette: {
// 		type: "light",
// 	},
// });

const blueLight = createMuiTheme({
	palette: {
		type: "light",
		primary: {
			main: "#1976d2",
		},
		// secondary: blue,
	},
});

// const blueDark = createMuiTheme({
// 	palette: {
// 		type: "dark",
// 		primary: {
// 			main: "#333333",
// 		},
// 		secondary: {
// 			main: "#222222",
// 		},
// 	},
// });

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
	const [selectedTheme, setSelectedTheme] = useState(true);
	const xsDevice = useMediaQuery(theme.breakpoints.down("xs"));

	const changeTheme = () => {
		setSelectedTheme(!selectedTheme);
	};

	const renderNavigation = () => {
		if (xsDevice) {
			return (
				<BottomNavigation onThemeChange={changeTheme} theme={selectedTheme} />
			);
		}

		return (
			<Header
				searchFieldInAppBar={true}
				onThemeChange={changeTheme}
				theme={selectedTheme}
			/>
		);
	};

	return (
		<ThemeProvider theme={selectedTheme ? blueLight : dark}>
			<CssBaseline />
			<Router history={history}>
				<Container maxWidth="md" className={classes.container}>
					{!xsDevice && (
						<Header
							searchFieldInAppBar={true}
							onThemeChange={changeTheme}
							theme={selectedTheme}
						/>
					)}
					<Switch>
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
					{xsDevice && (
						<BottomNavEdit onThemeChange={changeTheme} theme={selectedTheme} />
					)}
				</Container>
			</Router>
		</ThemeProvider>
	);
}

const mapStateToProps = (state) => {
	return {
		units: state.units,
		location: state.location,
	};
};

export default connect(mapStateToProps, { setUnits, setSearchTerm })(App);
