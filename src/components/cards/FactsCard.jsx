import React from "react";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Custom
import weatherFacts from "../../utils/weatherFacts";
import getRandom from "../../utils/getRandom";

const useStyles = makeStyles((theme) => ({
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	info: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	darkTheme: {
		opacity: "87%",
	},
	title: {
		fontSize: "1.5em",
	},
}));

function FactsCards(props) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const randomList = getRandom(weatherFacts, props.n);

	// Dark theme - opacity adjust (there should be a way to do this with useStyles)
	const darkThemeOpacity =
		theme.palette.type === "dark" ? classes.darkTheme : null;

	const renderCard = (fact) => {
		return (
			<Card raised>
				<CardContent>
					<Typography
						className={classes.info}
						color="textSecondary"
						gutterBottom
					>
						Interesting weather information
					</Typography>
					<Typography
						variant="h5"
						component="h2"
						className={[darkThemeOpacity, classes.title].join(" ")}
					>
						{fact.title}
					</Typography>
					<Typography
						className={classes.pos}
						color="textSecondary"
					></Typography>
					<Typography
						variant="body2"
						component="p"
						className={darkThemeOpacity}
					>
						{fact.description}
					</Typography>
				</CardContent>
				{fact.url && (
					<CardActions>
						<Button
							size="small"
							color="inherit"
							href={fact.url}
							target="_blank"
							className={darkThemeOpacity}
						>
							Learn More
						</Button>
					</CardActions>
				)}
			</Card>
		);
	};

	return randomList.map((fact) => {
		return (
			<Grid item key={fact.title}>
				{renderCard(fact)}
			</Grid>
		);
	});
}

export default FactsCards;
