import React, { useState } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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
	const { match } = props;
	const { url } = match;
	const mapIndexToName = {
		0: "/current/Zagreb",
		1: "/daily",
		2: "/hourly",
	};
	const mapNameToIndex = {
		"/current/Zagreb": 0,
		"/daily": 1,
		"/hourly": 2,
	};
	const [selectedTab, setSelectedTab] = useState(mapNameToIndex[url]);

	console.log(props);
	console.log(url);

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
				<Tab label="Current" component={RouterLink} to="/current/Zagreb" />
				<Tab label="Daily" component={RouterLink} to="/daily" />
				<Tab label="Houry" component={RouterLink} to="/hourly" />
			</Tabs>
		</Box>
	);
}

export default withRouter(NavigationTabs);
