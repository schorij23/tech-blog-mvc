module.exports = {
  // Function to format a date as MM/DD/YYYY
    format_date: (date) => {
      // Use toLocaleDateString() to format the date as MM/DD/YYYY
      return date.toLocaleDateString();
    }
  };


// module.exports = {
//     format_date: (date) => {
//         const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
//         return date.toLocaleDateString(undefined, options);
//     }
// };
