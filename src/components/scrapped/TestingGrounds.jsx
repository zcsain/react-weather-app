import React from "react";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

// Custom
import DateTimeBadge from "../parts/DateTimeBadge";

const useStyles = makeStyles((theme) => ({
	temp: {
		flexGrow: 1,
	},
	container: {
		alignItems: "center",
	},
	content: {
		"&:last-child": {
			paddingBottom: theme.spacing(2),
		},
	},
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
	table: {
		minWidth: 650,
	},
	rightText: {
		fontWeight: "bold",
	},
	icon: {
		fontSize: "2.5rem",
	},
}));

function TestingGrounds() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showShortDescription = useMediaQuery(theme.breakpoints.up("sm"));

	return (
		<Card>
			<CardContent className={classes.content}>
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<DateTimeBadge
							dt={1619085600}
							timezoneOffset={7200}
							viewType="daily"
						/>
					</Grid>
					<Grid item>
						<i
							className={[classes.icon, "wi wi-day-storm-showers"].join(" ")}
							style={{ opacity: "87%" }}
						/>
					</Grid>
					<Tooltip title="Day / Night">
						<Grid item>
							<Typography variant="h4" component="p" display="inline">
								291°C
							</Typography>
							<Typography
								variant="body1"
								component="p"
								display="inline"
								color="textSecondary"
							>
								/242°
							</Typography>
						</Grid>
					</Tooltip>
					{showShortDescription && (
						<Grid item>
							{/* <Typography variant="body2">Clouds, Scatterd Clouds</Typography> */}
							<Typography variant="body2">
								Heavy shower rain and drizzle
							</Typography>
						</Grid>
					)}
					<Grid item>
						<IconButton>
							<ExpandMoreIcon />
						</IconButton>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default TestingGrounds;
