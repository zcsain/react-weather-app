import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";

// Material UI
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";

// Custom
import {
	setSearchTerm,
	resetCurrent,
	resetOneCall,
	fetchGeolocation,
} from "../../../actions";

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
		// width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "250px",
			// width: "auto",
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
		// padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		// paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "30ch",
			"&:focus": {
				width: "100ch",
			},
		},
	},
}));

function AutoCompleSearchField({
	selectedTheme,
	geolocation,
	fetchGeolocation,
	setSearchTerm,
	resetCurrent,
	resetOneCall,
	whenClicked,
}) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [options, setOptions] = useState([""]);
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const [debouncedValue, setDebouncedValue] = useState(inputValue);

	useEffect(() => {
		const timerId = setTimeout(() => {
			// Run only if "inputValue" is not empty
			if (inputValue) {
				setDebouncedValue(inputValue);
			}
		}, 500);

		// Clear timer if user continues to write within timeout period
		return () => {
			clearTimeout(timerId);
		};
	}, [inputValue]);

	useEffect(() => {
		// Only fetch if "debouncedValue" is not empty
		if (debouncedValue) {
			fetchGeolocation(debouncedValue);
		}
	}, [debouncedValue, fetchGeolocation]);

	// Update "options" when geolocation data changes
	useEffect(() => {
		setOptions(
			geolocation.map((item) => {
				const name = item.name + ", ";
				const state = item.state ? item.state + ", " : "";
				const country = item.country;

				return name + state + country;
			})
		);
	}, [geolocation]);

	useEffect(() => {
		if (value) {
			resetCurrent();
			resetOneCall();
			setSearchTerm(value);
			setValue(null);
			setInputValue("");
		}
	}, [value, resetCurrent, resetOneCall, setSearchTerm]);

	return (
		<Autocomplete
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
				whenClicked();
			}}
			inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			id="controllable-states-demo"
			options={options}
			openOnFocus
			blurOnSelect
			// style={{ width: 300 }}
			renderInput={(params) => (
				<TextField
					{...params}
					// label="Search"
					placeholder="Search"
					variant="outlined"
					// className={classes.search}
					classes={{
						root: clsx(classes.inputRoot, classes.inputInput),
						// input: classes.inputInput,
					}}
				/>
			)}
			size="small"
		/>
		// {/* <br />
		// <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
		// <div>{`inputValue: '${inputValue}'`}</div> */}
	);
}

const mapStateToProps = (state) => {
	return {
		selectedTheme: state.theme,
		selectedUnits: state.units,
		geolocation: state.geolocation,
	};
};

export default connect(mapStateToProps, {
	fetchGeolocation,
	setSearchTerm,
	resetCurrent,
	resetOneCall,
})(withRouter(AutoCompleSearchField));
