import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import clsx from "clsx";

// Materila UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Brightness7Icon from "@material-ui/icons/Brightness7"; //light
import Brightness4Icon from "@material-ui/icons/Brightness4"; //dark
import IconButton from "@material-ui/core/IconButton";
import { fade } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

// Custom
import ExpandableSettings from "./parts/ExpandableSettings";
import { toggleTheme } from "../actions";
import GitHubButton from "./parts/GitHubButton";

// Testing
import SearchPopover from "./parts/SearchPopover";
import useTargetDimensions from "../hooks/useTargetDimensions";
import HomeSearchField from "./parts/HomeSearchField";
import PopoverSearch from "./parts/PopoverSearch";

const useStyles = makeStyles((theme) => ({
	logo: {
		marginRight: theme.spacing(2),
		textDecoration: "none",
		color: "white",
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
}));

function TestComponent({ selectedTheme, toggleTheme }) {
	const classes = useStyles();
	const componentRef = useRef();
	const { width, height } = useTargetDimensions(componentRef);
	const searchRef = useRef();
	const { width: searchWidth, height: searchHeight } =
		useTargetDimensions(searchRef);

	console.log("TestComponent re-rendered");

	const renderSearchWithPopover = () => {
		return (
			<div ref={componentRef} className={classes.search}>
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

					// value={searchValue}
					// onChange={handleChange}
					// onKeyDown={handlePress}
				/>
			</div>
		);
	};

	return (
		<>
			<AppBar positon="fixed" color={selectedTheme ? "primary" : "default"}>
				<Toolbar>
					<Icon
						className={clsx(classes.logo, "wi wi-windy")}
						fontSize="large"
					/>
					<Typography className={classes.title} variant="h6" noWrap>
						Simple Weather
					</Typography>
					<div style={{ flexGrow: 1 }} />
					{renderSearchWithPopover()}
					<ExpandableSettings viewOptions={false} />
					<Tooltip title="Toggle light/dark theme">
						<IconButton
							aria-label="toggle light/dark theme"
							color="inherit"
							// onClick={() => props.onThemeChange()}
							onClick={() => toggleTheme()}
						>
							{!selectedTheme ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Tooltip>
					<GitHubButton
						href="https://github.com/zcsain/react-weather-app"
						edgeType="end"
					/>
				</Toolbar>
			</AppBar>
			<HomeSearchField id="search-popover" reference={searchRef} />
			<PopoverSearch targetWidth={searchWidth} id="search-popover" />
			<div>
				<p>Width: {width}</p>
				<p>Height: {height}</p>
				<p>Search Width: {searchWidth}</p>
				<p>Search Height: {searchHeight}</p>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedTheme: state.theme,
	};
};

export default connect(mapStateToProps, { toggleTheme })(TestComponent);
