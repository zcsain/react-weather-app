import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		marginBottom: "24px",
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

	const linkSource = searchTerm || match.params.location;
	var currentLink = `/current/${linkSource}`;
	var mapNameToIndex = {
		[currentLink]: 0,
		"/daily": 1,
		"/hourly": 2,
	};
	const [selectedTab, setSelectedTab] = useState(mapNameToIndex[url]);
	console.log(url);
	console.log(mapNameToIndex);

	// Set appropriate tab to "selected" state
	const handleChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	return (
		<Box className={classes.root}>
			<Tabs
				value={selectedTab}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
				variant={xsDevice ? "fullWidth" : "standard"}
			>
				{/* <Tab label="Current" component={RouterLink} to="/current/Zagreb" /> */}
				<Tab label="Current" component={RouterLink} to={currentLink} />
				<Tab label="Daily" component={RouterLink} to="/daily" />
				<Tab label="Houry" component={RouterLink} to="/hourly" />
			</Tabs>
		</Box>
	);
}

const mapStateToProps = (state) => {
	return {
		searchTerm: state.location,
	};
};

export default connect(mapStateToProps)(withRouter(NavigationTabs));
