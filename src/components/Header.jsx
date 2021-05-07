import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Brightness7Icon from "@material-ui/icons/Brightness7"; //light
import Brightness4Icon from "@material-ui/icons/Brightness4"; //dark
import GitHubIcon from "@material-ui/icons/GitHub";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import CheckIcon from "@material-ui/icons/Check";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TuneIcon from "@material-ui/icons/Tune";
import Paper from "@material-ui/core/Paper";

// Custom
import { setUnits } from "../actions";
import { metric, imperial, scientific } from "../actions/unitsPayload";
import ExpandableSettings from "./ExpandableSettings";

const useStyles = makeStyles((theme) => ({
	spacing: {
		flex: 1,
	},
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
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
	settingsButton: {
		marginLeft: "8px",
	},
	menuDivider: {
		margin: "auto 10px auto 10px",
	},
	checkIcon: {
		marginLeft: "5px",
	},
	settingsButton: {
		marginLeft: "16px",
	},
	settingsButtonContent: {
		paddingLeft: "8px",
		paddingRight: "2px",
		fontWeight: "bold",
	},
}));

function Header(props) {
	const classes = useStyles();

	const { selectedUnits } = props;
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleUnitsSelect = (preferedUnits) => {
		props.setUnits(preferedUnits);

		setAnchorEl(null);
	};

	const renderCheckMark = (units) => {
		if (units === selectedUnits.type) {
			return <CheckIcon fontSize="small" className={classes.checkIcon} />;
		}

		return null;
	};

	const simpleSettings = () => {
		return (
			<Tooltip title="Change units">
				<IconButton
					aria-label="change units"
					color="inherit"
					className={classes.settingsButton}
					onClick={handleClick}
				>
					<SettingsIcon />
				</IconButton>
			</Tooltip>
		);
	};

	const complexSettings = () => {
		return (
			<Tooltip title="Change units">
				<Button
					aria-label="change units"
					color="inherit"
					className={classes.settingsButton}
					onClick={handleClick}
				>
					<Icon>
						<SettingsIcon />
					</Icon>
					<Typography variant="button" className={classes.settingsButton}>
						{selectedUnits.type} ({selectedUnits.units.temp})
					</Typography>
					<Icon>
						<ExpandMoreIcon />
					</Icon>
				</Button>
			</Tooltip>
		);
	};

	return (
		<React.Fragment>
			<AppBar position="fixed" color={props.theme ? "primary" : "inherit"}>
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						Breeze Weather
					</Typography>
					{props.searchFieldInAppBar ? (
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
							/>
						</div>
					) : null}
					<Tooltip title="Change units">
						<Button
							aria-label="change units"
							color="inherit"
							className={classes.settingsButton}
							onClick={handleClick}
						>
							<SettingsIcon />
							<Typography
								variant="button"
								className={classes.settingsButtonContent}
							>
								{selectedUnits.type} ({selectedUnits.units.temp})
							</Typography>
							<ExpandMoreIcon fontSize="small" />
						</Button>
						{/* <ExpandableSettings viewOptions={false} /> */}
					</Tooltip>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={() => handleUnitsSelect(metric)}>
							Metric (°C, km/h, mm){renderCheckMark("metric")}
						</MenuItem>
						<Divider className={classes.menuDivider} />
						<MenuItem onClick={() => handleUnitsSelect(imperial)}>
							Imperial (°F, mph, in){renderCheckMark("imperial")}
						</MenuItem>
						<Divider className={classes.menuDivider} />
						<MenuItem onClick={() => handleUnitsSelect(scientific)}>
							Scientific (°K, m/s, mm){renderCheckMark("scientific")}
						</MenuItem>
					</Menu>
					<Tooltip title="Toggle light/dark theme">
						<IconButton
							aria-label="toggle light/dark theme"
							color="inherit"
							onClick={() => props.onThemeChange()}
						>
							{!props.theme ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Tooltip>
					<Tooltip title="GitHub repository">
						<IconButton
							edge="end"
							aria-label="github repository"
							color="inherit"
							href="https://github.com/zcsain"
							target="_blank"
						>
							<GitHubIcon />
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
			{/* Here to offset AppBar postion so it does not obscure othere elemetns */}
			{/* <Toolbar /> */}
		</React.Fragment>
	);
}

Header.propTypes = {
	searchFieldInAppBar: PropTypes.bool,
};

Header.defaultProps = {
	searchFieldInAppBar: true,
};

const mapStateToProps = (state) => {
	return {
		selectedUnits: state.units,
	};
};

export default connect(mapStateToProps, { setUnits })(Header);
