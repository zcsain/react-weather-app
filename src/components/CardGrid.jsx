import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
	temp: {
		flexGrow: 1,
	},
	container: {
		alignItems: "center",
	},
	content: {
		"&:last-child": {
			paddingBottom: "16px",
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
}));

function CardGrid() {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(true);

	const handleExpandeClick = () => {
		setExpanded(!expanded);
	};

	const date = () => {
		return (
			<Grid container direction="column" spacing={1} align="center">
				<Grid item>
					<Chip label="WED" />
				</Grid>
				<Grid item>
					<Typography color="textSecondary">21/4</Typography>
				</Grid>
			</Grid>
		);
	};

	const temperature = () => {
		return (
			<React.Fragment>
				<Typography variant="h3" component="p" display="inline">
					17°
				</Typography>
				<Typography
					variatn="h5"
					component="p"
					display="inline"
					color="textSecondary"
				>
					/4°
				</Typography>
			</React.Fragment>
		);
	};

	const content = () => {
		return (
			<CardContent className={classes.content}>
				<Grid container spacing={3} className={classes.container}>
					<Grid item>
						<Grid container direction="column" spacing={1} align="center">
							<Grid item>
								<Chip label="WED" />
							</Grid>
							<Grid item>
								<Typography color="textSecondary">21/4</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Icon
							className="fa fa-cloud-sun"
							fontSize="large"
							color="disabled"
							style={{ display: "inline-table" }}
						/>
					</Grid>
					<Grid item className={classes.temp}>
						<Typography variant="h3" component="p" display="inline">
							17°
						</Typography>
						<Typography
							variatn="h5"
							component="p"
							display="inline"
							color="textSecondary"
						>
							/4°
						</Typography>
					</Grid>
					<Grid item>
						<IconButton
							className={clsx(classes.expand, {
								[classes.expandOpen]: expanded,
							})}
							onClick={handleExpandeClick}
							aria-expanded={expanded}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</Grid>
				</Grid>
			</CardContent>
		);
	};

	const dataGrid = () => {
		return (
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TableContainer>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>Dessert</TableCell>
									<TableCell align="right">Calories</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Dessert</TableCell>
									<TableCell align="right">Calories</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Dessert</TableCell>
									<TableCell align="right">Calories</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Dessert</TableCell>
									<TableCell align="right">Calories</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TableContainer>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>
										<Typography variant="body1">Dessert</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography variant="body1" className={classes.rightText}>
											Calories
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Typography variant="body1">Precipitation</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography variant="body1" className={classes.rightText}>
											0%
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Typography variant="body1">Dessert</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography variant="body1" className={classes.rightText}>
											Calories
										</Typography>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		);
	};

	const collapse = () => {
		return (
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Method:</Typography>
					<Typography paragraph>
						Heat 1/2 cup of the broth in a pot until simmering, add saffron and
						set aside for 10 minutes.
					</Typography>
					<Typography paragraph>
						Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
						over medium-high heat. Add chicken, shrimp and chorizo, and cook,
						stirring occasionally until lightly browned, 6 to 8 minutes.
						Transfer shrimp to a large plate and set aside, leaving chicken and
						chorizo in the pan.
					</Typography>
					{dataGrid()}
				</CardContent>
			</Collapse>
		);
	};

	return (
		<Card>
			{content()}
			{collapse()}
		</Card>
	);
}

export default CardGrid;
