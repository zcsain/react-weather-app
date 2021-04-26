import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import { useTheme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
	root: {
		// maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
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
	avatar: {
		backgroundColor: blue[500],
	},
}));

function WeatherCard() {
	// const theme = useTheme();

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					// <Avatar aria-label="recipe" className={classes.avatar}>
					// 	<CloudIcon />
					// </Avatar>
					<Chip label="MON" />
				}
				action={
					// <IconButton aria-label="settings">
					// 	<MoreVertIcon />
					// </IconButton>
					// <IconButton
					// 	className={clsx(classes.expand, {
					// 		[classes.expandOpen]: expanded,
					// 	})}
					// 	onClick={handleExpandClick}
					// 	aria-expanded={expanded}
					// 	aria-label="show more"
					// >
					// 	<ExpandMoreIcon />
					// </IconButton>
					<IconButton disabled>
						<Icon
							className="fa fa-cloud-sun"
							fontSize="large"
							style={{ display: "inline-table", marginRight: "10px" }}
							color="disabled"
						/>
					</IconButton>
				}
				// title="21/4"
				subheader="21/4"
			/>
			<CardContent>
				{/* <Icon
					className="fa fa-cloud-sun"
					fontSize="large"
					style={{ display: "inline-table", marginRight: "10px" }}
					color="disabled"
				/> */}
				<Typography variant="h3" component="p" display="inline">
					17°
				</Typography>
				<Typography
					variant="h5"
					component="p"
					display="inline"
					color="textSecondary"
				>
					/4°
				</Typography>
			</CardContent>
			{/* <CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions> */}
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
						chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
						onion, salt and pepper, and cook, stirring often until thickened and
						fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
						cups chicken broth; bring to a boil.
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}

export default WeatherCard;
