import React from "react";
import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import InputBase from "@material-ui/core/InputBase";
// import IconButton from "@material-ui/core/IconButton";
// import SearchIcon from "@material-ui/icons/Search";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
// import Tooltip from "@material-ui/core/Tooltip";

// Custom
import { setSearchTerm } from "../../actions";
import PopoverSearch from "./PopoverSearch";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
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
	// const [searchValue, setSearchValue] = useState("");
	// const history = useHistory();

	// const handleChange = (event) => {
	// 	setSearchValue(event.target.value);
	// };

	// const handlePress = (event) => {
	// 	if (event.key === "Enter") {
	// 		event.preventDefault();
	// 		props.setSearchTerm(searchValue);
	// 		history.push(`/current/${searchValue}`);
	// 	}
	// };

	return (
		<Container className={classes.container}>
			<Typography
				varinat="h1"
				className={classes.content}
				style={{ opacity: "93%" }}
				color="primary"
			>
				Simple Weather
			</Typography>
			{/* <Paper ref={props.reference} component="form" className={classes.root}>
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
					<PopoverSearch />
				</Paper> */}
			<PopoverSearch customHeight={"45px"} />
		</Container>
	);
}

export default connect(null, { setSearchTerm })(HomeSearchField);
