import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

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

function NavigationTabs() {
	const theme = useTheme();
	const classes = useStyles();
	const smallDevice = useMediaQuery(theme.breakpoints.down("xs"));
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box className={classes.root}>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
				variant={smallDevice && "fullWidth"}
			>
				<Tab label="Current" component={RouterLink} to="/currentTest/Zagreb" />
				<Tab label="Daily" component={RouterLink} to="/daily" />
				<Tab label="Houry" component={RouterLink} to="/hourly" />
			</Tabs>
		</Box>
	);
}

export default NavigationTabs;
