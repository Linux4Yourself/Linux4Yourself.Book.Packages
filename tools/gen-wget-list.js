const http = require("http");
const fs = require("fs");

// run node tools/gen-wget-list.js

var options = {
	host: 'linuxfromscratch.org',
	port: 80,
	path: '/lfs/view/development/wget-list'
};

var request = http.request(options, function (res) {
	var result = '';

	res.on('data', function (chunk) {
		result += chunk;
	});

	res.on('end', function () {
		generateWget(result);
	});
});
request.end();

generateWget = (data) => fs.writeFile('src/wget-list', data, () => {
	data.split('\n').forEach(pkg => {
		parsePackage(pkg);
	});
})

parsePackage = (pkg) => {
	const arr = pkg.split('/');
	const length = arr.length;
	const name = arr[length - 1].split('.')[0].split('-')[0].trim();
	console.dir('name: ' + name)
}