import * as reporter from "cucumber-html-reporter";
import * as fs from "fs";
import * as path from "path";

// Create reports directory if not exists
const reportsDir = "reports";
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

// Generate unique filename
const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Format timestamp
const reportFileName = `cucumber-report-${timestamp}.html`;
const reportFilePath = path.join(reportsDir, reportFileName);

const options: reporter.Options = {
  theme: "bootstrap",
  jsonFile: "reports/cucumber-report.json",
  output: reportFilePath,
  reportSuiteAsScenarios: true,
  launchReport: true,  // Set to true if you want it to open in the browser automatically
  metadata: {
    "Test Run Timestamp": timestamp,
    "Project": "Automation Test Status",
    "Execution Environment": "Staging",  // Change to Production, Dev, etc.
    "Platform": process.platform,  // Automatically detects OS (Windows, Mac, Linux)
    "Node.js Version": process.version,
    "Cucumber Version": "^11.2.0",  // Replace with actual version
    "Playwright Version": "^1.49.1", // Replace with actual version
    "Browser": "Chromium", // Adjust as needed
    "Executed By": process.env.USER || process.env.USERNAME || "Unknown"
  }
};

reporter.generate(options);
console.log(`Report saved as: ${reportFilePath}`);

