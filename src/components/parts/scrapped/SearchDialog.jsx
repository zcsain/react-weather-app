import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

// Material UI
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

// Custom
import {
	setSearchTerm,
	resetCurrent,
	resetOneCall,
	resetSearchTerm,
} from "../../../actions";

function SearchDialog() {
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const history = useHistory();

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
				{/* <DialogTitle id="form-dialog-title">Search</DialogTitle> */}
				<DialogContent>
					<TextField
						value={searchValue}
						onChange={handleChange}
						onKeyDown={handlePress}
						autoFocus
						variant="outlined"
						margin="dense"
						id="name"
						label="Search"
						type="search"
						fullWidth
						inputProps={{
							autoComplete: "off",
						}}
					/>
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
				<DialogActions>
					<Button onClick={handleClose} color="inherit">
						Search
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

export default SearchDialog;
