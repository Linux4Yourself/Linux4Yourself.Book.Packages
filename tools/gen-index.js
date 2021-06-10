const corePackages = require('../src/packages/core/packages.json');
const extraPackages = require('../src/packages/extra/packages.json');
const fs = require('fs');

const allPackages = []
corePackages.forEach(pkg => {
	pkg.isExtra = false;
	allPackages.push(pkg);
});

extraPackages.forEach(pkg => {
	pkg.isExtra = true;
	allPackages.push(pkg);
});

let res = [];

allPackages.forEach(pkg => {
	const type = pkg.isExtra ? 'extra': 'core';
	res.push(`${type}/${pkg.name}`);
});


fs.writeFileSync(`src/packages/index`, res.join('\n'), 'utf-8');

// fs.writeFileSync(`src/packages/core/wget-list`, updatedPkgs.map(x => `${x.downloadUrl}`).join('\n'), 'utf-8');
// fs.writeFileSync(`src/packages/core/wget-list.orig`, updatedPkgs.map(x => `${x.url}`).join('\n'), 'utf-8');
// fs.writeFileSync(`src/packages/core/md5sums`, String(updatedPkgs.map(x => `${x.md5} ${x.fileName}`).join('\n')), 'utf-8');
// fs.writeFileSync(`src/packages/core/pkg-list`, String(updatedPkgs.map(x => x.fileName).join('\n')), 'utf-8');