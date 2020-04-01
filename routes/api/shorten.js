const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');


const URL = require('../../models/Urls');

router.use((req,res,next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept")
	next();
});


router.post('/', (req,res) => {
	console.log(req.body);
	if (req.body.url) {
		urldata = req.body.url
	}

	console.log('URL is: '+urldata);

	URL.findOne({url: urldata},(err,doc) => {
		if (doc) {
			console.log('Entry found');
			res.send({
                url: urldata,
                hash: doc._id,
                status: 200,
                statusTxt: 'OK'
            });
		}
		else {
			console.log('new url');
			const webaddress = new URL ({
				_id:uniqid(),
				url:urldata
			});

			webaddress.save((err) => {
				if (err) {
					return console.error(err);
				}
				res.send({
					url:urldata,
					hash: webaddress._id,
					status:200,
					statusTxt: 'OK'
				})
			})
		}
	});

});


module.exports = router;