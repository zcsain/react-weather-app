import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Material UI
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

// Custom
import {
	setSearchTerm,
	resetCurrent,
	resetOneCall,
	resetSearchTerm,
} from "../../actions";
import HeaderSearch from "./HeaderSearch";

function FormDialog(props) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Fragment>
			<IconButton color="inherit" onClick={handleClickOpen}>
				<SearchIcon />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogContent>
					<HeaderSearch closeDialog={handleClose} customHeight="45px" />
				</DialogContent>
				<DialogContent>
					<DialogContentText>Search city by name.</DialogContentText>
					<DialogContentText>
						For more specificity use format: city name, state code (only for the
						US), country code.
					</DialogContentText>
					<DialogContentText>
						Example: "Memphis, TN, US" or "Paris" or "London, US"
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		searchTerm: state.location,
	};
};

export default connect(mapStateToProps, {
	setSearchTerm,
	resetCurrent,
	resetOneCall,
	resetSearchTerm,
})(withRouter(FormDialog));
