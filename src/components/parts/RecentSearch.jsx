import classes from "*.module.css";
import React from "React";
import { connect } from "react-redux";

// Material UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	listRoot: {},
}));

function RecentSearch({ searchHistory, width }) {
	const classes = useStyles();

	return (
		<List
			style={{ width: width }}
			className={classes.listRoot}
			subheader={<ListSubheader>Recent</ListSubheader>}
		>
			{searchHistory.map((item, index) => {
				return (
					<ListItem
						key={index}
						button
						onClick={(event) => handleListItemClick(event, item)}
					>
						<ListItemText primary={item} />
					</ListItem>
				);
			})}
		</List>
	);
}

const mapStateToProps = (state) => {
	return {
		searchHistory: state.searchHistory,
	};
};

export default connect(mapStateToProps)(RecentSearch);
