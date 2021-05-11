import React, { useState } from "react";
import { connect } from "react-redux";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";

// Custom
import { setSearchTerm } from "../../actions";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	container: {
		marginTop: "33%",
	},
	[theme.breakpoints.only("xs")]: {
		container: {
			marginTop: "auto",
			position: "fixed",
			top: "45%",
			left: "50%",
			transform: "translate(-50%, -50%)",
		},
	},
	content: {
		display: "grid",
		justifyContent: "center",
		fontWeight: "bold",
		fontSize: "4.6rem",
		marginBottom: "5%",
		textAlign: "center",
	},
	[theme.breakpoints.down("sm")]: {
		content: {
			fontSize: "3.6rem",
		},
	},
	[theme.breakpoints.down("xs")]: {
		content: {
			fontSize: "2.6rem",
		},
	},
}));

function HomeSearchField(props) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [searchValue, setSearchValue] = useState("");

	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handlePress = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			console.log("Enter was pressed, the search term is: " + searchValue);
			props.setSearchTerm(searchValue);
			setSearchValue("");
		}
	};

	return (
		<Container className={classes.container}>
			<Typography varinat="h1" className={classes.content} color="primary">
				Simple Weather
			</Typography>
			<Paper component="form" className={classes.root}>
				<IconButton className={classes.iconButton} aria-label="menu">
					<SearchIcon />
				</IconButton>
				<InputBase
					className={classes.input}
					placeholder="Search"
					inputProps={{ "aria-label": "search" }}
					value={searchValue}
					onChange={handleChange}
					onKeyDown={handlePress}
				/>
			</Paper>
		</Container>
	);
}

export default connect(null, { setSearchTerm })(HomeSearchField);