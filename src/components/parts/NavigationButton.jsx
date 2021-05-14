import React, { useState } from "react";

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
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
	button: {
		paddingLeft: "8px",
		paddingRight: "2px",
		fontWeight: "bold",
		marginLeft: theme.spacing(-1),
	},
}));

function NavigationButton() {
	const theme = useTheme();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const options = ["Current", "Daily", "Hourly"];

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<Tooltip title="Weather view">
				<Button color="inherit" className={classes.button}>
					Current
					<ExpandMoreIcon fontSize="small" />
				</Button>
			</Tooltip>

			<Menu
				id="nav-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			></Menu>
		</React.Fragment>
	);
}

export default NavigationButton;
