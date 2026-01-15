import { file } from 'bun';

const PACKAGE_JSON_FILE = 'package.json';

const { version } = await file(PACKAGE_JSON_FILE).json();

await Bun.write(
	'types/version.ts',
	`// Auto-generated in build (DO NOT edit)\nexport const version = '${version}' as const;\n\n// Current AbacatePay API version - https://docs.abacatepay.com/pages/introduction\nexport const API_VERSION = '1' as const;\n`,
);
