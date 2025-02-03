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
  jsonFile: "reports/cucumber_report.json",
  output: reportFilePath,
  reportSuiteAsScenarios: true,
  launchReport: true, // Set to true if you want it to open in the browser automatically
};
reporter.generate(options);
console.log(`Report saved as: ${reportFilePath}`);