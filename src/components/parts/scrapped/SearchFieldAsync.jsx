// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

function Asynchronous({ selectedTheme }) {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState("");

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
			await sleep(1e3); // For demo purposes.
			const pokemon = response.data;
			console.log(pokemon.results);

			if (active) {
				setOptions(
					pokemon.results.map((pok, index) => {
						return pok.name;
					})
				);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<AppBar
			position="fixed"
			color={selectedTheme ? "primary" : "inherit"}
			style={{ marginTop: "100px" }}
		>
			<Toolbar>
				<Autocomplete
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					inputValue={inputValue}
					onInputChange={(event, newInputValue) => {
						setInputValue(newInputValue);
					}}
					id="asynchronous-demo"
					style={{ width: 300 }}
					open={open}
					onOpen={() => {
						setOpen(true);
					}}
					onClose={() => {
						setOpen(false);
					}}
					options={options}
					loading={loading}
					renderInput={(params) => (
						<TextField
							{...params}
							placeholder="Search"
							variant="outlined"
							size="small"
							color="secondary"
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{loading ? (
											<CircularProgress color="inherit" size={20} />
										) : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								),
							}}
						/>
					)}
				/>
			</Toolbar>
		</AppBar>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedTheme: state.theme,
	};
};

export default connect(mapStateToProps)(Asynchronous);
