import React from "react";

// Material UI
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Brightness7Icon from "@material-ui/icons/Brightness7"; //light
import Brightness4Icon from "@material-ui/icons/Brightness4"; //dark
import GitHubIcon from "@material-ui/icons/GitHub";

function MoreCard() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<IconButton
				// edge="end"
				color="inherit"
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreIcon />
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<List>
					<MenuItem onClick={handleClose}>
						<Button
							href="https://github.com/zcsain"
							target="_blank"
							style={{ textTransform: "capitalize" }}
						>
							<ListItemIcon>
								<Brightness4Icon />
							</ListItemIcon>
							<ListItemText>Dark Mode</ListItemText>
						</Button>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Button
							href="https://github.com/zcsain"
							target="_blank"
							style={{ textTransform: "capitalize" }}
						>
							<ListItemIcon>
								<GitHubIcon />
							</ListItemIcon>
							<ListItemText>GitHub repo</ListItemText>
						</Button>
					</MenuItem>
				</List>
			</Menu>
		</React.Fragment>
	);
}

export default MoreCard;
