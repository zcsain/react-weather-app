import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link as RouterLink, useHistory, withRouter } from "react-router-dom";
import clsx from "clsx";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Brightness7Icon from "@material-ui/icons/Brightness7"; //light
import Brightness4Icon from "@material-ui/icons/Brightness4"; //dark
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

// Custom
import {
	setSearchTerm,
	toggleTheme,
	resetCurrent,
	resetOneCall,
	resetSearchTerm,
} from "../../actions";
import GitHubButton from "../parts/GitHubButton";
import ExpandableSettings from "../parts/ExpandableSettings";
import titleCase from "../../utils/titleCase";

const useStyles = makeStyles((theme) => ({
	spacing: {
		flex: 1,
	},
	root: {
		flexGrow: 1,
	},
	title: {
		// flexGrow: 1,
		// display: "none",
		textDecoration: "none",
		color: "white",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		marginRight: theme.spacing(1),
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
	logo: {
		marginRight: theme.spacing(2),
		textDecoration: "none",
		color: "white",
	},
}));

function Header(props) {
	const classes = useStyles();
	const [searchValue, setSearchValue] = useState("");
	const history = useHistory();

	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handlePress = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			props.setSearchTerm(searchValue);
			resetData();

			// Redirects to selected view
			const currentUrl = props.match.url;
			const currentLocation = props.match.params.location;
			const redirectTo = currentUrl.replace(currentLocation, searchValue);
			history.push(redirectTo);

			setSearchValue("");
			event.target.blur();
		}
	};

	const resetData = () => {
		props.resetCurrent();
		props.resetOneCall();
		props.resetSearchTerm();
	};

	return (
		<React.Fragment>
			{/* <AppBar position="fixed" color={props.theme ? "primary" : "inherit"}> */}
			<AppBar
				position="fixed"
				color={props.selectedTheme ? "primary" : "inherit"}
			>
				<Toolbar>
					<Icon
						className={clsx(classes.logo, "wi wi-windy")}
						fontSize="large"
						component={RouterLink}
						to="/"
						onClick={resetData}
					/>
					{!props.searchTerm ? (
						<Typography
							className={classes.title}
							variant="h6"
							noWrap
							component={RouterLink}
							to="/"
							onClick={resetData}
						>
							Simple Weather
						</Typography>
					) : (
						<Typography className={classes.title} variant="h6" noWrap>
							{titleCase(props.searchTerm)}
						</Typography>
					)}
					<div style={{ flexGrow: 1 }} />

					{props.searchFieldInAppBar ? (
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								autoFocus={false}
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
								value={searchValue}
								onChange={handleChange}
								onKeyDown={handlePress}
							/>
						</div>
					) : null}
					{/* <SearchPopover /> */}
					{/* <AutoCompleSearchField /> */}
					<ExpandableSettings viewOptions={false} />
					<Tooltip title="Toggle light/dark theme">
						<IconButton
							aria-label="toggle light/dark theme"
							color="inherit"
							// onClick={() => props.onThemeChange()}
							onClick={() => props.toggleTheme()}
						>
							{!props.selectedTheme ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Tooltip>
					<GitHubButton
						href="https://github.com/zcsain/react-weather-app"
						edgeType="end"
					/>
				</Toolbar>
			</AppBar>
			{/* Here to offset AppBar postion so it does not obscure othere elemetns */}
			{/* <Toolbar /> */}
		</React.Fragment>
	);
}

Header.propTypes = {
	searchFieldInAppBar: PropTypes.bool,
};

Header.defaultProps = {
	searchFieldInAppBar: true,
};

const mapStateToProps = (state) => {
	return {
		selectedTheme: state.theme,
		searchTerm: state.location,
	};
};

export default connect(mapStateToProps, {
	setSearchTerm,
	toggleTheme,
	resetCurrent,
	resetOneCall,
	resetSearchTerm,
})(withRouter(Header));
