import { useState, useEffect } from "react";

const useTargetDimensions = (myRef) => {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	// const getDimensions = () => ({
	// 	width: myRef.current.offsetWidth,
	// 	height: myRef.current.offsetHeight,
	// });

	useEffect(() => {
		const getDimensions = () => ({
			width: myRef.current.offsetWidth,
			height: myRef.current.offsetHeight,
		});

		const handleResize = () => {
			setDimensions(getDimensions);
		};

		// To return initial size
		if (myRef.current) {
			setDimensions(getDimensions);
		}

		// Resize events are only fired on the window
		window.addEventListener("resize", handleResize);

		// Cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
		};

		// Update when reference element changes
	}, [myRef]);

	return dimensions;
};

export default useTargetDimensions;
