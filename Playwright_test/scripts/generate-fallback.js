const fs = require('fs');
const path = require('path');

const siteDir = path.join(__dirname, '../site');
if (!fs.existsSync(siteDir)) {
  fs.mkdirSync(siteDir, { recursive: true });
}

const playwrightStatus = process.env.PLAYWRIGHT_STATUS || 'UNKNOWN';
const baseURL = process.env.BASE_URL || 'https://www.gov.uk/calculate-your-holiday-entitlement';

const html = `<!DOCTYPE html>
<html>
<head>
  <title>Test Results Dashboard</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>Test Results Dashboard</h1>
  <p>Playwright tests completed.</p>
  <p>Status: ${playwrightStatus}</p>
  <p>Target: ${baseURL}</p>
</body>
</html>`;

fs.writeFileSync(path.join(siteDir, 'index.html'), html);
console.log('Fallback dashboard generated');