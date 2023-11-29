module.exports = {
  // Function to format a date as MM/DD/YYYY
    format_date: (date) => {
      // Use toLocaleDateString() to format the date as MM/DD/YYYY
      return date.toLocaleDateString();
    }
  };
