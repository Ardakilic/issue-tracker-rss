const querystring = require('querystring');
const Feed = require('feed').Feed;
const axios = require('axios').default;


module.exports = async (req, res) => {
    let { repo, ...params } = req.query;

    let response = await axios.get(`https://api.github.com/repos/${repo}/issues?${querystring.encode(params)}`);

    const feed = new Feed({
        title: `${repo} Issues`,
    });

    response.data.forEach((data) => {
        feed.addItem({
            title: data.title,
            id: data.url,
            url: data.url,
            date: new Date(Date.parse(data.created_at)),
        })
    });

    res.send(feed.rss2())
}