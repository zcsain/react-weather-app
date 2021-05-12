import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

// Custom
import { setSearchTerm, toggleTheme } from "../../actions";
import GitHubButton from "../parts/GitHubButton";
import ExpandableSettings from "../parts/ExpandableSettings";

const useStyles = makeStyles((theme) => ({
	spacing: {
		flex: 1,
	},
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
		display: "none",
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

function Header(props) {
	const classes = useStyles();

	const [searchValue, setSearchValue] = useState("");

	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handlePress = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			console.log(
				"Enter was pressed, the search term is (from header): " + searchValue
			);
			props.setSearchTerm(searchValue);
			setSearchValue("");
			event.target.blur();
		}
	};

	return (
		<React.Fragment>
			{/* <AppBar position="fixed" color={props.theme ? "primary" : "inherit"}> */}
			<AppBar
				position="fixed"
				color={props.selectedTheme ? "primary" : "inherit"}
			>
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						Simple Weather
					</Typography>

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

					<ExpandableSettings viewOptions={false} />
					<Tooltip title="Toggle light/dark theme">
						<IconButton
							aria-label="toggle light/dark theme"
							color="inherit"
							// onClick={() => props.onThemeChange()}
							onClick={() => props.toggleTheme()}
						>
							{/* {!props.theme ? <Brightness7Icon /> : <Brightness4Icon />} */}
							{!props.selectedTheme ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Tooltip>
					<GitHubButton href="https://github.com/zcsain" edge="end" />
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
	};
};

export default connect(mapStateToProps, { setSearchTerm, toggleTheme })(Header);
