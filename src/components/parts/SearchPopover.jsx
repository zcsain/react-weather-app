import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
	},
	progress: {
		minWidth: "20ch",
		minHeight: "50px",
		display: "grid",
		justifyContent: "center",
		alignItems: "center",
	},
	search: {
		marginRight: theme.spacing(1),
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

function SearchPopover() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [searchValue, setSearchValue] = useState("");
	const [showContentOrLoader, setShowContentOrLoader] = useState(false);

	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		// For test only
		setTimeout(function () {
			setShowContentOrLoader(true);
		}, 2000);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [options, setOptions] = useState([
		{
			name: "London",
			local_names: {
				af: "Londen",
				ar: "لندن",
				ascii: "London",
				az: "London",
				bg: "Лондон",
				ca: "Londres",
				da: "London",
				de: "London",
				el: "Λονδίνο",
				en: "London",
				eu: "Londres",
				fa: "لندن",
				feature_name: "London",
				fi: "Lontoo",
				fr: "Londres",
				gl: "Londres",
				he: "לונדון",
				hi: "लंदन",
				hr: "London",
				hu: "London",
				id: "London",
				it: "Londra",
				ja: "ロンドン",
				la: "Londinium",
				lt: "Londonas",
				mk: "Лондон",
				nl: "Londen",
				no: "London",
				pl: "Londyn",
				pt: "Londres",
				ro: "Londra",
				ru: "Лондон",
				sk: "Londýn",
				sl: "London",
				sr: "Лондон",
				th: "ลอนดอน",
				tr: "Londra",
				vi: "Luân Đôn",
				zu: "ILondon",
			},
			lat: 51.5085,
			lon: -0.1257,
			country: "GB",
		},
		{
			name: "London",
			local_names: {
				ar: "لندن",
				ascii: "London",
				bg: "Лондон",
				de: "London",
				en: "London",
				fa: "لندن، انتاریو",
				feature_name: "London",
				fi: "London",
				fr: "London",
				he: "לונדון",
				ja: "ロンドン",
				lt: "Londonas",
				nl: "London",
				pl: "London",
				pt: "London",
				ru: "Лондон",
				sr: "Лондон",
			},
			lat: 42.9834,
			lon: -81.233,
			country: "CA",
		},
		{
			name: "London",
			local_names: {
				ar: "لندن",
				ascii: "London",
				en: "London",
				fa: "لندن، اوهایو",
				feature_name: "London",
				sr: "Ландон",
			},
			lat: 39.8865,
			lon: -83.4483,
			country: "US",
			state: "OH",
		},
		{
			name: "London",
			local_names: {
				ar: "لندن",
				ascii: "London",
				en: "London",
				fa: "لندن، کنتاکی",
				feature_name: "London",
				sr: "Ландон",
			},
			lat: 37.129,
			lon: -84.0833,
			country: "US",
			state: "KY",
		},
		{
			name: "London",
			local_names: {
				ascii: "London",
				ca: "Londres",
				en: "London",
				feature_name: "London",
			},
			lat: 36.4761,
			lon: -119.4432,
			country: "US",
			state: "CA",
		},
	]);

	const handleListItemClick = (item) => {
		handleClose();
		setSearchValue(item);
	};

	const open = Boolean(anchorEl);
	const id = open ? "search-popover" : undefined;

	return (
		<div>
			<div className={classes.search} id={id}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					autoFocus={false}
					placeholder="Search"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ "aria-label": "search" }}
					value={searchValue}
					onChange={handleChange}
					onClick={handleClick}
					// onKeyDown={handlePress}
				/>
			</div>
			{/* <TextField
				value={value}
				onChange={handleChange}
				variant="outlined"
				id={id}
				onClick={handleClick}
				size="small"
			/> */}
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				disableAutoFocus={true}
				disableEnforceFocus={true}
			>
				{showContentOrLoader ? (
					<List
						component="nav"
						aria-label="secondary mailbox folder"
						// style={{ minWidth: "30ch" }}
					>
						{options.map(({ name, state, country }, index) => {
							const stateDef = state ? state + ", " : "";
							const searchText = name + ", " + stateDef + country;

							return (
								<ListItem
									key={index}
									button
									onClick={() => handleListItemClick(searchText)}
								>
									<ListItemText primary={searchText} />
								</ListItem>
							);
						})}
					</List>
				) : (
					// <div className={classes.progress}>
					//   <CircularProgress size={28} />
					// </div>
					<List
						component="nav"
						aria-label="secondary mailbox folder"
						// style={{ minWidth: "30ch" }}
					>
						<ListItem button disabled>
							<ListItemText primary="No match" />
						</ListItem>
					</List>
				)}
			</Popover>
		</div>
	);
}

export default SearchPopover;
