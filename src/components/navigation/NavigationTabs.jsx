import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ScheduleIcon from "@material-ui/icons/Schedule";
import TodayIcon from "@material-ui/icons/Today";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Typography from "@material-ui/core/Typography";

// Custom
import { resetCurrent, resetOneCall } from "../../actions";

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		marginBottom: "24px",
	},
	tabIcon: {
		verticalAlign: "top",
	},
	tabTypography: {
		paddingLeft: "10px",
		display: "inline",
	},
});

function NavigationTabs(props) {
	const theme = useTheme();
	const classes = useStyles();
	const xsDevice = useMediaQuery(theme.breakpoints.down("xs"));
	const { match, searchTerm } = props;
	const { url } = match;

	// If url changed, adjust tab selection accordingly
	useEffect(() => {
		setSelectedTab(mapNameToIndex[url]);
	}, [url]);

	// Prefer redux state over params from url (params is for direct
	// acces to parts of website from the address bar)
	const linkSource = searchTerm || match.params.location;
	var currentLink = `/current/${linkSource}`;
	var dailyLink = `/daily/${linkSource}`;
	var hourlLink = `/hourly/${linkSource}`;
	var mapNameToIndex = {
		[currentLink]: 0,
		[dailyLink]: 1,
		[hourlLink]: 2,
	};

	const [selectedTab, setSelectedTab] = useState(mapNameToIndex[url]);

	// Set appropriate tab to "selected" state
	const handleTabChange = (event, newValue) => {
		props.resetCurrent();
		props.resetOneCall();
		setSelectedTab(newValue);
	};

	return (
		<Box className={classes.root}>
			<Tabs
				value={selectedTab}
				onChange={handleTabChange}
				indicatorColor="primary"
				textColor="primary"
				centered
				variant={xsDevice ? "fullWidth" : "standard"}
			>
				{/* <Tab label="Current" component={RouterLink} to="/current/Zagreb" /> */}
				<Tab
					label={
						<div>
							<TodayIcon className={classes.tabIcon} />
							<Typography variant="button" className={classes.tabTypography}>
								Current
							</Typography>
						</div>
					}
					component={RouterLink}
					to={currentLink}
				/>
				<Tab
					label={
						<div>
							<EventNoteIcon className={classes.tabIcon} />
							<Typography variant="button" className={classes.tabTypography}>
								Daily
							</Typography>
						</div>
					}
					component={RouterLink}
					to={dailyLink}
				/>
				<Tab
					label={
						<div>
							<ScheduleIcon className={classes.tabIcon} />
							<Typography variant="button" className={classes.tabTypography}>
								Hourly
							</Typography>
						</div>
					}
					component={RouterLink}
					to={hourlLink}
				/>
			</Tabs>
		</Box>
	);
}

const mapStateToProps = (state) => {
	return {
		searchTerm: state.location,
	};
};

export default connect(mapStateToProps, { resetOneCall, resetCurrent })(
	withRouter(NavigationTabs)
);
