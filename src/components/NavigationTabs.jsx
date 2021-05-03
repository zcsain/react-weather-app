import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		marginBottom: "24px",
	},
});

function NavigationTabs() {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box className={classes.root}>
			<Tabs></Tabs>
		</Box>
	);
}

export default NavigationTabs;
