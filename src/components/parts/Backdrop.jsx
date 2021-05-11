import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import MUIBackdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

function Backdrop() {
	const classes = useStyles();

	return (
		<MUIBackdrop className={classes.backdrop} open={true}>
			<CircularProgress color="inherit" />
		</MUIBackdrop>
	);
}

export default Backdrop;
