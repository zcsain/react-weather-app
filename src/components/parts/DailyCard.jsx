import React, { useState } from "react";
import { connect } from "react-redux";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom
import DateTimeBadge from "./DateTimeBadge";
import capitalize from "../../utils/capitalize";
import iconsMapper from "../../utils/iconsMapper";

const useStyles = makeStyles((theme) => ({
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	icon: {
		fontSize: "2.5rem",
	},
	darkTheme: {
		opacity: "87%",
		[theme.palette.type === "dark"]: {
			color: "	#FF0000",
		},
	},
}));

const loremIpsum =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra";

function DailyCard({ day, timezoneOffset, selectedUnits }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showShortDescription = useMediaQuery(theme.breakpoints.up("sm"));
	const [expanded, setExpanded] = useState(false);

	console.log(theme.palette.type);

	const handleExpandeClick = () => {
		setExpanded(!expanded);
	};

	const renderActionArea = () => {
		const { dt, sunrise, sunset, temp, weather } = day;
		const { id, description } = weather[0];
		const { day: dayTemp, night: nightTemp } = temp;
		const icon = iconsMapper(id, sunrise, sunset, dt, timezoneOffset);

		// Dark theme - opacity adjust (could not find how to do this with useStyles)
		const darkThemeOpacity =
			theme.palette.type === "dark" ? classes.darkTheme : null;

		return (
			<CardActionArea onClick={handleExpandeClick}>
				<CardContent>
					<Grid container justify="space-between" alignItems="center">
						<Grid item>
							<DateTimeBadge
								dt={dt}
								timezoneOffset={timezoneOffset}
								viewType="daily"
							/>
						</Grid>
						<Grid item>
							<i className={[classes.icon, darkThemeOpacity, icon].join(" ")} />
						</Grid>
						<Grid item>
							<Typography
								variant="h4"
								component="p"
								display="inline"
								className={darkThemeOpacity}
							>
								{dayTemp.toFixed(0)}
								{selectedUnits.units.deg}
							</Typography>
							<Typography
								variant="body1"
								color="textSecondary"
								display="inline"
								component="p"
							>
								/{nightTemp.toFixed(0)}
								{selectedUnits.units.deg}
							</Typography>
						</Grid>
						{showShortDescription && (
							<Grid item>
								<Typography variant="body2" className={darkThemeOpacity}>
									{capitalize(description)}
								</Typography>
							</Grid>
						)}
						<Grid item>
							<IconButton
								className={clsx(classes.expand, {
									[classes.expandOpen]: expanded,
								})}
							>
								<ExpandMoreIcon />
							</IconButton>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		);
	};

	const renderCollapseArea = () => {
		return (
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>{loremIpsum}</CardContent>
			</Collapse>
		);
	};

	return (
		<Card raised>
			{renderActionArea()}
			{renderCollapseArea()}
		</Card>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedUnits: state.units,
	};
};

export default connect(mapStateToProps)(DailyCard);
