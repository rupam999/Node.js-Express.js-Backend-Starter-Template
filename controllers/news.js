const axios = require('axios');
const cheerio = require('cheerio');

const getRequest = async (req, res) => {
	const body = await axios.get(
		'https://economictimes.indiatimes.com/topic/fundraising'
	);

	const $ = cheerio.load(body.data);
	const mainTag = $('div#categorywiseTop div a');

	const response = [];

	for (let i = 0; i < mainTag.length; i++) {
		response.push({
			title: mainTag[`${i}`].attribs.title,
			href: `https://economictimes.indiatimes.com/${mainTag[i].attribs.href}`,
		});
		i++;
	}

	res.send({
		message: 'success',
		response,
	});
};

module.exports = {
	getRequest,
};
