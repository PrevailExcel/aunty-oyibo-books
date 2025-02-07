export function formatMoney(amount, removeCents = false) {
  // Format the amount using Intl.NumberFormat
  let formattedAmount = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);

  // Check if the amount is an integer
  const isInteger = Number.isInteger(amount);

  // Split the formatted amount to check for existing decimal places
  const parts = formattedAmount.split('.');
  
  // If the amount is an integer and removeCents is true, ensure it has '.00'
  if (removeCents && isInteger) {
    // Remove any existing fractional part
    formattedAmount = parts[0];
    // formattedAmount += '.00';
  }

  return formattedAmount;
}
