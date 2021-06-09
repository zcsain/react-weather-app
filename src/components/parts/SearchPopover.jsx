import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";

// Custom
import {
	fetchGeolocation,
	setSearchTerm,
	resetCurrent,
	resetOneCall,
	resetSearchTerm,
	resetGeolocation,
} from "../../actions";

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
	},
	progress: {
		minWidth: "20ch",
		minHeight: "50px",
		display: "grid",
		justifyContent: "center",
		alignItems: "center",
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
			// width: "88ch",
			// width: "18ch",
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

function SearchPopover({
	barStyle,
	fetchGeolocation,
	geolocation,
	setSearchTerm,
	resetCurrent,
	resetOneCall,
	resetSearchTerm,
	match,
	resetGeolocation,
}) {
	const classes = useStyles();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);
	const [searchValue, setSearchValue] = useState("");
	const [debouncedValue, setDebouncedValue] = useState(searchValue);

	useEffect(() => {
		const timerId = setTimeout(() => {
			// Run only if "searchValue" is not empty
			if (searchValue) {
				setDebouncedValue(searchValue);
			}
		}, 500);

		// Clear timer if user continues to write within timeout period
		return () => {
			clearTimeout(timerId);
		};
	}, [searchValue]);

	useEffect(() => {
		// Only fetch if "debouncedValue" is not empty
		if (debouncedValue) {
			fetchGeolocation(debouncedValue);
		}
	}, [debouncedValue, fetchGeolocation]);

	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleListItemClick = (event, searchText) => {
		handleClose();

		setSearchTerm(searchText);
		resetData();

		// Redirects to selected view
		const currentUrl = match.url;
		const currentLocation = match.params.location;
		const redirectTo = currentUrl.replace(currentLocation, searchValue);
		history.push(redirectTo);

		setSearchValue("");
		event.target.blur();
	};

	const resetData = () => {
		resetCurrent();
		resetOneCall();
		resetGeolocation();
		// resetSearchTerm();
	};

	const open = Boolean(anchorEl);
	const id = open ? "search-popover" : undefined;

	return (
		<div>
			<div className={classes.search} id={id}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					style={{ height: "45px", width: "100%" }}
					// style={barStyle}
					autoFocus={false}
					placeholder="Search"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ "aria-label": "search" }}
					value={searchValue}
					onChange={handleChange}
					onClick={handleClick}
					// onKeyDown={handlePress}
				/>
			</div>
			{/* <TextField
				value={value}
				onChange={handleChange}
				variant="outlined"
				id={id}
				onClick={handleClick}
				size="small"
			/> */}
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					// vertical: "bottom",
					// horizontal: "center",
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					// vertical: "top",
					// horizontal: "center",
					vertical: "top",
					horizontal: "left",
				}}
				disableAutoFocus={true}
				disableEnforceFocus={true}
			>
				{geolocation.length ? (
					<List component="nav" aria-label="secondary mailbox folder">
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
				) : (
					// <div className={classes.progress}>
					//   <CircularProgress size={28} />
					// </div>
					<List component="nav" aria-label="secondary mailbox folder">
						<ListItem button disabled>
							<ListItemText primary="No match" />
						</ListItem>
					</List>
				)}
			</Popover>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		geolocation: state.geolocation,
	};
};

export default connect(mapStateToProps, {
	fetchGeolocation,
	setSearchTerm,
	resetCurrent,
	resetOneCall,
	resetSearchTerm,
	resetGeolocation,
})(withRouter(SearchPopover));
