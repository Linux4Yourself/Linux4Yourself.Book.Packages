const packages = require('../src/core-packages.json');
const fs = require('fs');
const cp = require('child_process');

const updatedPkgs = [];

packages.forEach(pkg => {
	if (pkg !== 'undefined') {

		const distination = `downloads/${pkg.fileName}`;
		const patchDistination = `download/patches/${pkg.fileName}`;
		let command = `curl -L ${pkg.url} --output ${distination} --silent`;

		if (pkg.url.endsWith('.patch')) {
			command = `curl -L ${pkg.url} --output ${patchDistination} --silent`;
		}

		if (!fs.existsSync(`downloads/${pkg.fileName}`) && !pkg.url.endsWith('.patch')) {
			const res = cp.execSync(command);
		}

		if (!fs.existsSync(`download/patches/${pkg.fileName}`) && pkg.url.endsWith('.patch')) {
			const res = cp.execSync(command);
		}

		const stats = fs.statSync(distination);
		const md5 = cp.execSync(`md5sum ${distination}`, 'utf-8').toString().split(' ')[0];

		pkg.size = (stats.size / (1024 * 1024)).toFixed(2);
		pkg.md5 = md5;

		console.log(`${pkg.fileName} (${pkg.size} Mb): (${pkg.md5})`);

		updatedPkgs.push(pkg);
	}
});

fs.writeFileSync(`src/core-packages.json`, JSON.stringify(updatedPkgs, null, '\t'), 'utf-8');
fs.writeFileSync(`src/wget-list`, updatedPkgs.map(x => `${x.url}`).join('\n'), 'utf-8');
fs.writeFileSync(`src/md5sums`, String(updatedPkgs.map(x => `${x.md5} ${x.fileName}`).join('\n')), 'utf-8');
fs.writeFileSync(`src/pkg-list`, String(updatedPkgs.map(x => x.fileName).join('\n')), 'utf-8');