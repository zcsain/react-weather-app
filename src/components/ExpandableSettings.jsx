import React from "react";
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
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Brightness7Icon from "@material-ui/icons/Brightness7"; //light
import Brightness4Icon from "@material-ui/icons/Brightness4"; //dark
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "@material-ui/icons/Settings";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Custom
import { setUnits } from "../actions";
import { metric, imperial, scientific } from "../actions/unitsPayload";

const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: 14,
	},
}));

function ExpandableSettings(props) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const options = [
		"Metric (°C, km/h, mm)",
		"Imperial (°F, mph, in)",
		"Scientific (°K, m/s, mm)",
	];
	const options2 = [
		{
			type: "metric",
			description: "Metric (°C, km/h, mm)",
		},
		{
			type: "imperial",
			description: "Imperial (°F, mph, in)",
		},
		{
			type: "scientific",
			description: "Scientific (°K, m/s, mm)",
		},
	];
	const mapUnitsToIndex = {
		metric: 0,
		imperial: 1,
		scientific: 2,
	};
	const unitsList = [metric, imperial, scientific];
	const { selectedUnits } = props;
	const [selectedIndex, setSelectedIndex] = React.useState(
		mapUnitsToIndex[selectedUnits.type]
	);

	console.log(props);

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index, preferedUnits) => {
		props.setUnits(preferedUnits);
		setSelectedIndex(index);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<IconButton color="inherit" onClick={handleClickListItem}>
				<SettingsIcon />
			</IconButton>

			<Menu
				id="lock-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{props.viewOptions && (
					<List dense>
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

						<ListItem button>
							<ListItemIcon>
								<Brightness4Icon />
							</ListItemIcon>
							<ListItemText>Dark Mode</ListItemText>
						</ListItem>
					</List>
				)}

				<List dense>
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
};

ExpandableSettings.defaultProps = {
	viewOptions: true,
};

const mapStateToProps = (state) => {
	return {
		selectedUnits: state.units,
	};
};

export default connect(mapStateToProps, { setUnits })(ExpandableSettings);
