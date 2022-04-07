function toCamelCase(str) {
  return `${str[0].toUpperCase()}${str.slice(1, str.length).toLowerCase()}`
}

export { toCamelCase }