import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Brightness7Icon from "@material-ui/icons/Brightness7"; //light
import Brightness4Icon from "@material-ui/icons/Brightness4"; //dark
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

// Custom
import {
	setUnits,
	toggleTheme,
	resetCurrent,
	resetOneCall,
} from "../../actions";
import { metric, imperial, scientific } from "../../actions/unitsPayload";

const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: 14,
	},
}));

function ExpandableSettings(props) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [anchorEl, setAnchorEl] = useState(null);
	const options = [
		"Metric (°C, km/h, mm)",
		"Imperial (°F, mph, in)",
		"Scientific (°K, m/s, mm)",
	];
	// Again useMemo doesn't do much here, just stop react from complaining
	const mapUnitsToIndex = useMemo(() => {
		return {
			metric: 0,
			imperial: 1,
			scientific: 2,
		};
	}, []);
	const unitsList = [metric, imperial, scientific];
	const { selectedUnits } = props;
	const [selectedIndex, setSelectedIndex] = useState(
		mapUnitsToIndex[selectedUnits.type]
	);

	useEffect(() => {
		// When units are set from cookies, the component does not update, so this is needed
		// Maybe re-write this component
		setSelectedIndex(mapUnitsToIndex[selectedUnits.type]);
	}, [selectedUnits, mapUnitsToIndex]);

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index, preferedUnits) => {
		props.setUnits(preferedUnits);
		props.resetCurrent();
		props.resetOneCall();
		setSelectedIndex(index);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleThemeChange = () => {
		handleClose();
		props.toggleTheme();
	};

	return (
		<React.Fragment>
			<Tooltip title={props.viewOptions ? "Settings" : "Change units"}>
				<IconButton color="inherit" onClick={handleClickListItem}>
					<SettingsIcon />
				</IconButton>
			</Tooltip>

			<Menu
				id="lock-menu"
				anchorEl={anchorEl}
				// keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{props.viewOptions && (
					<List dense={props.denseList}>
						<ListItem>
							<Typography
								className={classes.title}
								color="textSecondary"
								gutterBottom
								variant="subtitle2"
							>
								View Options
							</Typography>
						</ListItem>

						<ListItem button onClick={handleThemeChange}>
							<ListItemIcon>
								{props.selectedTheme ? (
									<Brightness4Icon />
								) : (
									<Brightness7Icon />
								)}
							</ListItemIcon>
							<ListItemText>
								{props.selectedTheme ? "Dark Mode" : "Light Mode"}
							</ListItemText>
						</ListItem>
					</List>
				)}

				<List dense={props.denseList}>
					{props.viewOptions && (
						<ListItem>
							<Typography
								className={classes.title}
								color="textSecondary"
								gutterBottom
								variant="subtitle2"
							>
								Units
							</Typography>
						</ListItem>
					)}
					{options.map((option, index) => (
						<MenuItem
							key={option}
							selected={index === selectedIndex}
							onClick={(event) =>
								handleMenuItemClick(event, index, unitsList[index])
							}
						>
							{option}
						</MenuItem>
					))}
				</List>
			</Menu>
		</React.Fragment>
	);
}

ExpandableSettings.propTypes = {
	viewOptions: PropTypes.bool,
	denseList: PropTypes.bool,
};

ExpandableSettings.defaultProps = {
	viewOptions: true,
	denseList: true,
};

const mapStateToProps = (state) => {
	return {
		selectedUnits: state.units,
		selectedTheme: state.theme,
	};
};

export default connect(mapStateToProps, {
	setUnits,
	toggleTheme,
	resetCurrent,
	resetOneCall,
})(ExpandableSettings);
