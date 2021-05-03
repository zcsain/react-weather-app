import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

// Material UI
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { blue } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// Custom
import Header from "./Header";
import { setUnits, setSearchTerm } from "../actions/index";
import CardV1 from "./CardV1";
import CardGrid from "./CardGrid";
import CurrentView from "./CurrentView";
import CurrentViewEdit from "./CurrentViewEdit";
import history from "../history";
import SearchField from "./SearchField";

const dark = createMuiTheme({
	palette: {
		type: "dark",
		// primary: {
		// 	main: "#1976d2",
		// },
		// primary: {
		// 	main: "#424242",
		// },
	},
});

const light = createMuiTheme({
	palette: {
		type: "light",
	},
});

const blueLight = createMuiTheme({
	palette: {
		type: "light",
		primary: {
			main: "#1976d2",
		},
		// secondary: blue,
	},
});

const blueDark = createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#333333",
		},
		secondary: {
			main: "#222222",
		},
	},
});

class App extends React.Component {
	state = { theme: true };

	changeTheme = () => {
		this.setState({ theme: !this.state.theme });
	};

	render() {
		return (
			<ThemeProvider theme={this.state.theme ? blueLight : dark}>
				<CssBaseline />
				<Router history={history}>
					<Container maxWidth="md" style={{ marginTop: "20px" }}>
						<Switch>
							<Route path="/" exact>
								<Header
									searchFieldInAppBar={false}
									onThemeChange={this.changeTheme}
									theme={this.state.theme}
								/>
								<SearchField />
							</Route>
							<Route path="/testArea" exact>
								<Header
									onThemeChange={this.changeTheme}
									theme={this.state.theme}
								/>
								<Grid container spacing={2} direction="column">
									<Grid item>
										<CardGrid />
									</Grid>
									<Grid item>
										<CardV1 />
									</Grid>
								</Grid>
							</Route>
							<Route path="/currentTest/:location" exact>
								<Header
									onThemeChange={this.changeTheme}
									theme={this.state.theme}
								/>
								<CurrentViewEdit />
							</Route>
							<Route path="/current/:location" exact>
								<Header
									onThemeChange={this.changeTheme}
									theme={this.state.theme}
								/>
								<CurrentView />
							</Route>
						</Switch>
					</Container>
				</Router>
			</ThemeProvider>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		units: state.units,
		location: state.location,
	};
};

export default connect(mapStateToProps, { setUnits, setSearchTerm })(App);
