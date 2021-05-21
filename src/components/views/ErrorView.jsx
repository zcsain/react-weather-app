import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

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

function ErrorView(props) {
	const classes = useStyles();
	const { title, message, buttonText } = props.location.state || props;

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar className={classes.avatar}>
						<PriorityHighIcon />
					</Avatar>
				}
				title={<Typography variant="h4">{title}</Typography>}
			/>
			<CardContent>
				<Typography variant="body1">{message}</Typography>
			</CardContent>
			<CardActions>
				<Grid container item justify="flex-end">
					<Button
						variant="contained"
						color="primary"
						component={RouterLink}
						to="/"
						// startIcon={<ReplayIcon />}
						disableElevation
					>
						{buttonText}
					</Button>
				</Grid>
			</CardActions>
		</Card>
	);
}

ErrorView.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	buttonText: PropTypes.string,
};

ErrorView.defaultProps = {
	title: "Page Not Found",
	message:
		"The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place.",
	buttonText: "Return home",
};

export default withRouter(ErrorView);
