import * as fs from 'fs';
import * as path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

interface BuildConfig {
  exclude: string[];
}

// Simulate __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configPath = path.resolve(__dirname, 'build.config.json');
const config: BuildConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

config.exclude.forEach((dir) => {
  const fullPath = path.resolve(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  } else {
    console.log(`Directory not found: ${fullPath}`);
  }
});
