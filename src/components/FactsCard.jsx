import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Custom
import weatherFacts from "../utils/weatherFacts";
import getRandom from "../utils/getRandom";

const useStyles = makeStyles({
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

function FactsCards(props) {
	const classes = useStyles();
	const randomList = getRandom(weatherFacts, props.n);

	const renderCard = (fact) => {
		return (
			<Card>
				<CardContent>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Interesting weather information
					</Typography>
					<Typography variant="h5" component="h2" style={{ fontSize: "1.5em" }}>
						{fact.title}
					</Typography>
					<Typography
						className={classes.pos}
						color="textSecondary"
					></Typography>
					<Typography variant="body2" component="p">
						{fact.description}
						{/* <br />
					{'"a benevolent smile"'} */}
					</Typography>
				</CardContent>
				{fact.url && (
					<CardActions>
						<Button
							size="small"
							color="inherit"
							href={fact.url}
							target="_blank"
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
