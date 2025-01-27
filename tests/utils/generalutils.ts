import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

const csvWriter = createObjectCsvWriter({
    path: 'C:/Users/amaln/Desktop/Spendflo/reports/customreports.csv',
    header: [
      { id: 'testName', title: 'Test Name' },
      { id: 'duration', title: 'Duration (s)' },
      { id: 'status', title: 'Status' },
      { id : "dateandtime", title : "DateAndTime"}
    ],
    append: true,
  });

export async function logTestExecutionData(testName: string, duration: number, status: string) {
    await csvWriter.writeRecords([
      {
        testName: testName,
        duration: duration,
        status: status,
        dateandtime: getFormattedDateTime()
      },
    ]);
  }

  // Function to handle test execution
export async function handleTestExecution(testName: string, testFunction: () => Promise<boolean>) {
    const startTime = Date.now();
    const success = await testFunction();
    const duration = (Date.now() - startTime) / 1000;
    const status = success ? 'Pass' : 'Fail';
    return await logTestExecutionData(testName, duration, status);
    }

  export function getFormattedDateTime() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours().toString().padStart(2, '0');  // Ensure 2 digits
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');  // Ensure 2 digits
    let seconds = currentDate.getSeconds().toString().padStart(2, '0');  // Ensure 2 digits
    
    return `${month}/${date}/${year} ${hours}:${minutes}:${seconds}`;
  }
  