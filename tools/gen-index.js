const corePackages = require('../src/packages/core/packages.json');
const extraPackages = require('../src/packages/extra/packages.json');
const fs = require('fs');

const allPackages = []
corePackages.forEach(pkg => {
	allPackages.push({
		...pkg,
		isExtra: false
	});
});

extraPackages.forEach(pkg => {
	pkg.isExtra = true;

	allPackages.push({
		...pkg,
		isExtra: true
	});
});

let res = [];

allPackages.forEach(pkg => {
	const type = pkg.isExtra ? 'extra': 'core';
	const url = (pkg.downloadUrl ? pkg.downloadUrl: pkg.url).trim();
	const dir = `src/packages/${type}/${pkg.name}`;

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	fs.writeFileSync(`${dir}/.url`, url, 'utf-8');
	fs.writeFileSync(`${dir}/.version`, pkg.version, 'utf-8');
	fs.writeFileSync(`${dir}/.name`, `${pkg.name}-${pkg.version}`, 'utf-8');

	const scripts = [];
	
	fs.readdirSync(dir).forEach(file => {
		if (!file.startsWith('.')) {
			scripts.push(file);
		}
	});

	fs.writeFileSync(`${dir}/.scripts`, scripts.join('\n'), 'utf-8');

	res.push(`${type}/${pkg.name}`);
});


fs.writeFileSync(`src/packages/index`, res.join('\n'), 'utf-8');