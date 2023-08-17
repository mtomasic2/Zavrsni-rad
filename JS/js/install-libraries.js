const { execSync } = require('child_process');

const librariesToInstall = [
  'gpt-3-encoder',
  'openai',
  'normalize-space',
  'swagger-ui-express',
  'cors',
  'axios',
  'jsdom'
];

librariesToInstall.forEach(library => {
  console.log(`Installing ${library}...`);
  try {
    execSync(`npm install -g ${library}`, { stdio: 'inherit' });
    console.log(`${library} installed successfully.`);
  } catch (error) {
    console.error(`Failed to install ${library}.`);
  }
});


