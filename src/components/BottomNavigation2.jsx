import React from "react";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GitHubIcon from "@material-ui/icons/GitHub";
import Grid from "@material-ui/core/Grid";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
	root: {
		// width: 500,
		position: "fixed",
		bottom: "0px",
		// left: "0px",
		// right: "0px",
		width: "100%",
		// height: "60px",
		// backgroundColor: "#24242D",
	},
}));

function BottomNavBar() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [value, setValue] = React.useState(0);

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction
				label="Current"
				icon={<TodayIcon fontSize="small" />}
			/>
			<BottomNavigationAction
				label="Hourly"
				icon={<QueryBuilderIcon fontSize="small" />}
			/>
			<BottomNavigationAction
				label="Daily"
				icon={<DateRangeIcon fontSize="small" />}
			/>
			<BottomNavigationAction
				label="Settings"
				icon={<SettingsIcon fontSize="small" />}
			/>
			{/* <BottomNavigationAction
				label="Repo"
				icon={<GitHubIcon fontSize="small" />}
			/> */}
		</BottomNavigation>
	);
}

export default BottomNavBar;
