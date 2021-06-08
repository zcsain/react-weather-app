const createLocalDate = (timestamp, offset) => {
	return new Date((timestamp + offset) * 1000);
};

export default createLocalDate;
