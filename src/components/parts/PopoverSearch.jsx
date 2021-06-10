import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

// Material UI
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

// Custom
import useTargetDimensions from "../../hooks/useTargetDimensions";
import {
	fetchGeolocation,
	resetCurrent,
	resetOneCall,
	resetGeolocation,
	setSearchTerm,
} from "../../actions";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
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
		// width: "400px",
		// width: "100%",
		// [theme.breakpoints.up("sm")]: {
		// 	width: "20ch",
		// 	// width: "12ch",
		// 	// "&:focus": {
		// 	// 	width: "20ch",
		// 	// },
		// },
	},
}));

function PopoverSearch({
	geolocation,
	fetchGeolocation,
	customHeight,
	setSearchTerm,
	resetCurrent,
	resetOneCall,
	resetGeolocation,
	match,
}) {
	const classes = useStyles();
	const history = useHistory();
	const componentRef = useRef();
	const { width } = useTargetDimensions(componentRef);
	const [value, setValue] = useState("");
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
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleListItemClick = (event, searchText) => {
		handleClose();

		setSearchTerm(searchText);
		resetData();

		history.push(`/current/${searchText}`);
	};

	const resetData = () => {
		resetCurrent();
		resetOneCall();
		resetGeolocation();
		// resetSearchTerm();
	};

	const open = Boolean(anchorEl);
	const id = open ? "popover-search" : undefined;

	const renderSearchResults = () => {
		if (false) {
			console.log("empty");
			return (
				<List style={{ width: width, paddingLeft: "16px", paddingTop: "14px" }}>
					<CircularProgress size={20} />
				</List>
			);
		} else if (
			geolocation[0] === "no match found" ||
			geolocation.length === 0
		) {
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

	return (
		<>
			<Paper ref={componentRef} className={classes.search} id={id}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					style={{ width: width, height: customHeight || null }}
					autoFocus={false}
					placeholder="Search"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					value={value}
					onChange={handleChange}
					onClick={handleClick}
					// onKeyDown={handlePress}
				/>
			</Paper>
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
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		geolocation: state.geolocation,
		selectedTheme: state.theme,
	};
};

export default connect(mapStateToProps, {
	fetchGeolocation,
	resetCurrent,
	resetGeolocation,
	resetOneCall,
	setSearchTerm,
})(withRouter(PopoverSearch));
