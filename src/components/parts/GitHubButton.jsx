import React from "react";
import PropTypes from "prop-types";

// Material UI
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";

function GitHubButton(props) {
	return (
		<Tooltip title="GitHub repository">
			<IconButton
				edge={props.edgeType}
				href={props.href}
				color={props.color}
				target="_blank"
				aria-label="github repository"
			>
				<GitHubIcon />
			</IconButton>
		</Tooltip>
	);
}

GitHubButton.propTypes = {
	edgeType: PropTypes.string || PropTypes.bool,
	color: PropTypes.string,
};

GitHubButton.defaultProps = {
	edgeType: false,
	color: "inherit",
};

export default GitHubButton;
