/**
 * Formats standard date strings into clean visual templates.
 * Mimics Jonas's date formatting pipeline.
 */
export const formatTourDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });
};

/**
 * Strips raw float digits into human-readable currency.
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};
