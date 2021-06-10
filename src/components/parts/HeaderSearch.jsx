import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// Custom
import useTargetDimensions from "../../hooks/useTargetDimensions";
import {
	fetchGeolocation,
	resetCurrent,
	resetOneCall,
	resetGeolocation,
	resetSearchTerm,
	setSearchTerm,
} from "../../actions";

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
}));

function HeaderSearch({
	geolocation,
	setSearchTerm,
	resetOneCall,
	resetGeolocation,
	resetCurrent,
	fetchGeolocation,
	match,
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
		resetData();

		// Redirect to selected view
		const currentUrl = match.url;
		const currentLocation = match.params.location;
		const redirectTo = currentUrl.replace(currentLocation, searchText);

		history.push(redirectTo);

		setValue("");
		// event.target.blur();
		// document.getElementById("input-base").blur();
		// searchRef.current.blur();
		// window.focus();
		// document.activeElement.blur();
		// console.log(document.activeElement);
		// event.target.focus();
		// console.log(searchRef);
		console.log(document.getElementById("header-input-base"));
		document.getElementById("header-input-base").blur();
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
		// resetSearchTerm();
	};

	const renderSearchResults = () => {
		if (geolocation[0] === "no match found" || geolocation.length === 0) {
			return (
				<List style={{ width: width }}>
					<ListItem button disabled>
						<ListItemText primary="No match" />
					</ListItem>
				</List>
			);
		} else if (geolocation[0] !== "no match found") {
			return (
				<List style={{ width: width }}>
					{geolocation.map(({ name, state, country }, index) => {
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
					})}
				</List>
			);
		}
	};

	const open = Boolean(anchorEl);
	const id = open ? "popover-search" : undefined;

	return (
		<React.Fragment>
			<div ref={componentRef} className={classes.search} id={id}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					id="header-input-base"
					ref={searchRef}
					autoFocus={false}
					placeholder="Search"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ "aria-label": "search" }}
					value={value}
					onChange={handleChange}
					onClick={handleClick}
					// onKeyDown={handlePress}
				/>
			</div>
			<Popover
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
				{renderSearchResults()}
			</Popover>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
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
})(withRouter(HeaderSearch));
