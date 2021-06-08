import React, { useState } from "react";
import { connect } from "react-redux";

// Material UI
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function PopoverSearch({ targetWidth, targetId, geolocation }) {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? targetId : undefined;

	return (
		<Popover
			id={id}
			style={{ width: targetWidth + "px" }}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			anchorOrigin={{
				vertical: "top",
				horizontal: "left",
			}}
			disableAutoFocus
			disableEnforceFocus
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
		>
			{geolocation.length ? (
				<List>
					{geolocation.map(({ name, state, country }, index) => {
						const stateDef = state ? state + ", " : "";
						const searchText = name + ", " + stateDef + country;

						return (
							<ListItem key={index} button>
								<ListItemText primary={searchText} />
							</ListItem>
						);
					})}
				</List>
			) : (
				<List>
					<ListItem button disabled>
						<ListItemText primary="No match" />
					</ListItem>
				</List>
			)}
		</Popover>
	);
}

const mapStateToProps = (state) => {
	return {
		geolocation: state.geolocation,
	};
};

export default connect(mapStateToProps)(PopoverSearch);
