export class Validators {
  static isValidBoardName(input: string): boolean {
    const trimmed = input.trim();
    
    if (trimmed.length === 0) {
      throw new Error("Board name cannot be empty");
    }
    
    if (trimmed.length < 3) {
      throw new Error("Board name must be at least 3 characters");
    }
    
    if (trimmed.length > 50) {
      throw new Error("Board name cannot exceed 50 characters");
    }
    
    return true;
  }

  static isValidDate(dateStr: string): boolean {
    if (!dateStr.trim()) {
      return true;
    }
    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateStr)) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    
    return true;
  }

  static isValidNumber(input: string, min?: number, max?: number): boolean {
    const num = parseInt(input);
    
    if (isNaN(num)) {
      throw new Error("Please enter a valid number");
    }
    
    if (min !== undefined && num < min) {
      throw new Error(`Number must be at least ${min}`);
    }
    
    if (max !== undefined && num > max) {
      throw new Error(`Number cannot exceed ${max}`);
    }
    
    return true;
  }

  static isValidChoice(input: string, allowed: string[]): boolean {
    if (!allowed.includes(input.toLowerCase().trim())) {
      throw new Error(`Please enter one of: ${allowed.join(", ")}`);
    }
    
    return true;
  }

  static isOptionalString(input: string): boolean {
    return true;
  }
}