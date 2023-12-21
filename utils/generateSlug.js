function generateSlug(str) {
  // Remove special characters
  const cleanedStr = str.replace(/[^\w\s-]/g, "");

  // Convert spaces to hyphens
  const slug = cleanedStr.replace(/\s+/g, "-").toLowerCase();

  return slug;
}

module.exports = generateSlug;
