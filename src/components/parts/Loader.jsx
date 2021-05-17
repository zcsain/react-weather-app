import React from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

function Loader() {
	return (
		<Grid
			container
			item
			direction="column"
			justify="center"
			alignItems="center"
			style={{ minHeight: "80vh" }}
		>
			<CircularProgress />
		</Grid>
	);
}

export default Loader;
