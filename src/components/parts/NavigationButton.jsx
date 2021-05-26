import React, { useState, useEffect, useMemo } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ScheduleIcon from "@material-ui/icons/Schedule";
import TodayIcon from "@material-ui/icons/Today";
import EventNoteIcon from "@material-ui/icons/EventNote";

const useStyles = makeStyles((theme) => ({
	menu: {
		minWidth: "180px",
	},
	button: {
		paddingLeft: "8px",
		paddingRight: "2px",
		fontWeight: "bold",
		marginLeft: theme.spacing(-1),
	},
}));

function NavigationButton(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const { match, searchTerm } = props;
	const { url } = match;
	const linkSource = searchTerm || match.params.location;
	var currentLink = `/current/${linkSource}`;
	var dailyLink = `/daily/${linkSource}`;
	var hourlyLink = `/hourly/${linkSource}`;
	// const options = ["Current", "Daily", "Hourly"];
	const iconOptions = [<TodayIcon />, <EventNoteIcon />, <ScheduleIcon />];

	var mapNameToIndex = useMemo(() => {
		return {
			[currentLink]: 0,
			[dailyLink]: 1,
			[hourlyLink]: 2,
		};
	}, [currentLink, dailyLink, hourlyLink]);

	const [selectedView, setSelectedView] = useState(mapNameToIndex[url]);

	// var mapNameToIndex = {
	// 	[currentLink]: 0,
	// 	"/daily": 1,
	// 	"/hourly": 2,
	// };

	// If url changed, adjust tab selection accordingly
	useEffect(() => {
		setSelectedView(mapNameToIndex[url]);
		// React complains if "mapNameToIndex" is not a dependency
	}, [url, mapNameToIndex]);

	const handleMenuItemClick = (event, index) => {
		setSelectedView(index);
		setAnchorEl(null);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<Tooltip title="Weather views">
				<Button
					color="inherit"
					className={classes.button}
					onClick={handleClick}
				>
					{/* Text or just icons that is the question */}
					{iconOptions[selectedView]}
					{/* {options[selectedView]} */}
					<ExpandMoreIcon fontSize="small" />
				</Button>
			</Tooltip>

			<Menu
				id="nav-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuList className={classes.menu}>
					<ListItem>
						<Typography color="textSecondary" gutterBottom variant="subtitle2">
							Weather Views
						</Typography>
					</ListItem>
					{/* This could be done programmatically */}
					<MenuItem
						onClick={(event) => handleMenuItemClick(event, 0)}
						component={RouterLink}
						to={currentLink}
						selected={0 === selectedView}
					>
						<ListItemIcon>
							<TodayIcon fontSize="small" />
						</ListItemIcon>
						<Typography variant="inherit">Current</Typography>
					</MenuItem>

					<MenuItem
						onClick={(event) => handleMenuItemClick(event, 1)}
						component={RouterLink}
						to={dailyLink}
						selected={1 === selectedView}
					>
						<ListItemIcon>
							<EventNoteIcon fontSize="small" />
						</ListItemIcon>
						<Typography variant="inherit">Daily</Typography>
					</MenuItem>

					<MenuItem
						onClick={(event) => handleMenuItemClick(event, 2)}
						component={RouterLink}
						to={hourlyLink}
						selected={2 === selectedView}
					>
						<ListItemIcon>
							<ScheduleIcon fontSize="small" />
						</ListItemIcon>
						<Typography variant="inherit">Hourly</Typography>
					</MenuItem>
				</MenuList>
			</Menu>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		searchTerm: state.location,
	};
};

export default connect(mapStateToProps)(withRouter(NavigationButton));
