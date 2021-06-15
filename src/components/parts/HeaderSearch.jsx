import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";
import { InputBase, ListSubheader } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

// Custom
import useTargetDimensions from "../../hooks/useTargetDimensions";
import {
	fetchGeolocation,
	resetCurrent,
	resetOneCall,
	resetGeolocation,
	resetSearchTerm,
	setSearchTerm,
	addToSearchHistory,
} from "../../actions";
import RecentSearch from "./RecentSearch";

const useStyles = makeStyles((theme) => ({
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
		// [theme.breakpoints.up("sm")]: {
		// 	width: "20ch",
		// 	// width: "12ch",
		// 	// "&:focus": {
		// 	// 	width: "20ch",
		// 	// },
		// },
	},
	popoverRoot: {
		[theme.breakpoints.down("xs")]: {
			maxHeight: "300px",
		},
	},
	listRoot: {
		overflow: "auto",
	},
}));

function HeaderSearch({
	geolocation,
	setSearchTerm,
	resetOneCall,
	resetGeolocation,
	resetCurrent,
	fetchGeolocation,
	match,
	closeDialog,
	customHeight,
	selectedTheme,
	enablePaper,
	// enableAutoFocus,
	addToSearchHistory,
}) {
	const classes = useStyles();
	const [value, setValue] = useState("");
	const history = useHistory();
	const componentRef = useRef();
	const { width } = useTargetDimensions(componentRef);
	const searchRef = useRef();
	const [debouncedValue, setDebouncedValue] = useState(value);
	const [anchorEl, setAnchorEl] = useState(null);

	// Use Effects
	useEffect(() => {
		const timerId = setTimeout(() => {
			// Run only if "value" is not empty
			if (value) {
				setDebouncedValue(value);
			}
		}, 500);

		// Clear timer if user continues to write withing 500 ms
		return () => {
			clearTimeout(timerId);
		};
	}, [value]);

	useEffect(() => {
		// Only fetch if "debouncedValue" is not empty
		if (debouncedValue) {
			fetchGeolocation(debouncedValue);
		}
	}, [debouncedValue, fetchGeolocation]);

	// Handle functions
	const handleListItemClick = (event, searchText) => {
		handleClose();
		setSearchTerm(searchText);
		addToSearchHistory(searchText);
		resetData();

		// Redirect to selected view
		const currentUrl = match.url;
		const currentLocation = match.params.location;
		const redirectTo = currentUrl.replace(currentLocation, searchText);

		history.push(redirectTo);

		setValue("");

		if (closeDialog) {
			closeDialog();
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const resetData = () => {
		resetCurrent();
		resetOneCall();
		resetGeolocation();
	};

	const renderSearchResults = () => {
		if (geolocation[0] === "no match found" || geolocation.length === 0) {
			return (
				<ListItem button disabled>
					<ListItemText primary="No match" />
				</ListItem>
			);
		} else if (geolocation[0] !== "no match found") {
			return geolocation.map(({ name, state, country }, index) => {
				const stateDef = state ? state + ", " : "";
				const searchText = name + ", " + stateDef + country;

				return (
					<ListItem
						key={index}
						button
						onClick={(event) => handleListItemClick(event, searchText)}
					>
						<ListItemText primary={searchText} />
					</ListItem>
				);
			});
		}
	};

	const renderInputBase = () => {
		return (
			<div ref={componentRef} className={classes.search} id={id}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					style={{ height: customHeight || null }}
					id="header-input-base"
					ref={searchRef}
					// autoFocus={enableAutoFocus}
					placeholder="Search"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					value={value}
					onChange={handleChange}
					onClick={handleClick}
					inputProps={{
						autoComplete: "off",
					}}
				/>
			</div>
		);
	};

	const open = Boolean(anchorEl);
	const id = open ? "popover-search" : undefined;

	return (
		<React.Fragment>
			{selectedTheme && enablePaper ? (
				<Paper>{renderInputBase()}</Paper>
			) : (
				renderInputBase()
			)}

			<Popover
				className={classes.popoverRoot}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				disableAutoFocus
				disableEnforceFocus
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<List
					style={{ width: width }}
					className={classes.listRoot}
					subheader={<ListSubheader>Search</ListSubheader>}
				>
					{renderSearchResults()}
				</List>
				<RecentSearch width={width} handleListItemClick={handleListItemClick} />
			</Popover>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedTheme: state.theme,
		geolocation: state.geolocation,
	};
};

export default connect(mapStateToProps, {
	setSearchTerm,
	resetCurrent,
	resetOneCall,
	resetSearchTerm,
	fetchGeolocation,
	resetGeolocation,
	addToSearchHistory,
})(withRouter(HeaderSearch));
