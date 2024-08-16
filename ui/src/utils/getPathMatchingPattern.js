export function isPathMatchingPattern(path, patternSelection) {
  // Define the patterns to match
  const patterns = [
    /^\/admin-dashboard\/brands\/\d+$/, // '/admin-dashboard/brands/{id}'
    /^\/admin-dashboard\/my-brands\/\d+$/, // '/admin-dashboard/my-brands/{id}'
    /^\/admin-dashboard\/brands\/\d+\/\w+$/, // '/admin-dashboard/brands/{id}/...'
    /^\/admin-dashboard\/my-brands\/\d+\/\w+$/, // '/admin-dashboard/my-brands/{id}/...'
  ];

  // Check if the path matches any of the defined patterns

  return patterns.some((pattern) => pattern.test(path));
}
