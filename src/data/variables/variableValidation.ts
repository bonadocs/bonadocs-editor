export const validateString = (input: string) => {
  // Regular expression to check if the string has at least one non-space character
  const regex = /\S/;

  // Check if the string matches the regular expression
  if (regex.test(input)) {
    return true; // String has at least one non-space character
  } else {
    return false; // String is empty or contains only spaces
  }
};
