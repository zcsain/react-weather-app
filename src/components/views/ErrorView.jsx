import React from "react";
import { Link as RouterLink } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import ReplayIcon from "@material-ui/icons/Replay";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "600px",
	},
	avatar: {
		backgroundColor: red[600],
	},
}));

function ErrorView() {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar className={classes.avatar}>
						<PriorityHighIcon />
					</Avatar>
				}
				title={<Typography variant="h4">Error</Typography>}
			/>
			<CardContent>
				<Typography variant="body1">
					Oops! Something went wrong. Please reload the page and try again, or
					come back later.
				</Typography>
			</CardContent>
			<CardActions>
				<Grid container item justify="flex-end">
					<Button
						variant="contained"
						color="primary"
						component={RouterLink}
						to="/"
						startIcon={<ReplayIcon />}
						disableElevation
					>
						Reload Page
					</Button>
				</Grid>
			</CardActions>
		</Card>
	);
}

export default ErrorView;
