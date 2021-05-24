import React from "react";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
	iconSize: {
		fontSize: "1.5em",
	},
}));

function InfoBoxLarge({
	iconOne,
	titleOne,
	dataOne,
	iconTwo,
	titleTwo,
	dataTwo,
}) {
	const theme = useTheme();
	const classes = useStyles();

	// Dark theme - opacity adjust (there should be a way to do this with useStyles)
	const darkThemeOpacity =
		theme.palette.type === "dark" ? classes.darkTheme : null;

	return (
		<Card variant="outlined">
			<List dense>
				<ListItem className={darkThemeOpacity}>
					<ListItemIcon className={[iconOne, classes.iconSize].join(" ")} />
					<ListItemText
						disableTypography
						primary={
							<Typography variant="body2" color="textSecondary">
								{titleOne}
							</Typography>
						}
						secondary={<Typography varaint="body1">{dataOne}</Typography>}
					/>
				</ListItem>
				<ListItem className={darkThemeOpacity}>
					<ListItemIcon className={[iconTwo, classes.iconSize].join(" ")} />
					<ListItemText
						disableTypography
						primary={
							<Typography variant="body2" color="textSecondary">
								{titleTwo}
							</Typography>
						}
						secondary={<Typography variant="body1">{dataTwo}</Typography>}
					/>
				</ListItem>
			</List>
		</Card>
	);
}

export default InfoBoxLarge;
