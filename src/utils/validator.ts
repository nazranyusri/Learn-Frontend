// Utility functions for validating user input

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

export function isValidDisplayName(displayName: string): boolean {
  // Display name must be at least 3 characters long and contain only letters (no special characters, numbers, or spaces)
  const displayNameRegex = /^[A-Za-z]{3,}$/;
  return displayNameRegex.test(displayName);
}