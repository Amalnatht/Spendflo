//generate random text function
// Utility function to generate random text
export function generateRandomText(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate start and end date
// Function to generate dates based on a number of days or default to 6 months
export function dates(days = null) {
    const startDate = new Date();
    const startMinusOne = new Date();
    const startPlusOne = new Date();
  
    if (days === null) {
      // Default to 6 months (approximately 183 days)
      const sixMonthsInDays = 183; // 6 months average in days
      startMinusOne.setDate(startDate.getDate() + sixMonthsInDays - 1);
      startPlusOne.setDate(startDate.getDate() + sixMonthsInDays + 1);
    } else if (typeof days === 'number' && days >= 0) {
      // Use the provided number of days
      startMinusOne.setDate(startDate.getDate() + days - 1);
      startPlusOne.setDate(startDate.getDate() + days + 1);
    } else {
      throw new Error("Input must be a non-negative number.");
    }
    // Helper function to format a date as "DD/MM/YYYY"
  const formatDate = (date:Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return {
    startDate: formatDate(startDate),
    startMinusOne: formatDate(startMinusOne),
    startPlusOne: formatDate(startPlusOne),
  };
}
