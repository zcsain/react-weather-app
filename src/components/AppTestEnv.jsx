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
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

// Custom
// import Header from "./Header";
import { setUnits, setSearchTerm } from "../actions/index";
import CurrentView from "./CurrentView";
import history from "../history";
// import BottomNavigation from "./BottomNavigation";
import BottomNavEdit from "./navigation/BottomNavEdit";
import ExpandableSettings from "./ExpandableSettings";

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
	// const xsDevice = useMediaQuery(theme.breakpoints.down("xs"));

	const changeTheme = () => {
		setSelectedTheme(!selectedTheme);
	};

	return (
		<ThemeProvider theme={selectedTheme ? blueLight : dark}>
			<CssBaseline />
			<Router history={history}>
				<Container maxWidth="md" className={classes.container}>
					<Switch>
						<Route path="/" exact>
							<CurrentView />
						</Route>
						<Route path="/test" exact>
							<ExpandableSettings />
						</Route>
					</Switch>
				</Container>
				<BottomNavEdit onThemeChange={changeTheme} theme={selectedTheme} />
				<Box></Box>
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
