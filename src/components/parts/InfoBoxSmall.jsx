import React from "react";
import PropTypes from "prop-types";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	iconSize: {
		fontSize: "1.5em",
	},
	listSpacing: {
		marginLeft: -theme.spacing(1.5),
	},
	darkTheme: {
		opacity: "87%",
	},
}));

function InfoBoxSmall({
	iconOne,
	titleOne,
	dataOne,
	iconTwo,
	titleTwo,
	dataTwo,
	iconStylingOne,
	iconStylingTwo,
}) {
	const theme = useTheme();
	const classes = useStyles(theme);

	// Dark theme - opacity adjust (there should be a way to do this with useStyles)
	const darkThemeOpacity =
		theme.palette.type === "dark" ? classes.darkTheme : null;

	return (
		<Card variant="outlined">
			<List dense>
				<ListItem>
					<ListItemIcon
						className={[
							iconOne,
							classes.iconSize,
							iconStylingOne,
							darkThemeOpacity,
						].join(" ")}
					/>
					<ListItemText
						disableTypography
						className={classes.listSpacing}
						primary={
							<Typography variant="body2" color="textSecondary">
								{titleOne}
							</Typography>
						}
					/>
					<ListItemSecondaryAction className={darkThemeOpacity}>
						<Typography varaint="body1">{dataOne}</Typography>
					</ListItemSecondaryAction>
				</ListItem>

				<ListItem>
					<ListItemIcon
						className={[
							iconTwo,
							classes.iconSize,
							iconStylingTwo,
							darkThemeOpacity,
						].join(" ")}
					/>
					<ListItemText
						disableTypography
						className={classes.listSpacing}
						primary={
							<Typography variant="body2" color="textSecondary">
								{titleTwo}
							</Typography>
						}
					/>
					<ListItemSecondaryAction className={darkThemeOpacity}>
						<Typography variant="body1">{dataTwo}</Typography>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
		</Card>
	);
}

InfoBoxSmall.propTypes = {
	iconStylingOne: PropTypes.string,
	conStylingTwo: PropTypes.string,
};

InfoBoxSmall.defaultProps = {
	iconStylingOne: "",
	conStylingTwo: "",
};

export default InfoBoxSmall;
