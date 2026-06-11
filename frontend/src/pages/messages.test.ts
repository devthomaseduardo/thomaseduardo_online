import { describe, it, expect } from 'vitest';
import { getErrorMessage, messages } from './messages';

describe('Messages Utility', () => {
  it('should return the correct message for a valid code', () => {
    const code = 'AUTH_INVALID_CREDENTIALS';
    expect(getErrorMessage(code)).toBe(messages[code]);
  });

  it('should return the generic error message for an invalid or missing code', () => {
    const invalidCode = 'NON_EXISTENT_CODE';
    expect(getErrorMessage(invalidCode)).toBe(messages.GENERIC_ERROR);
  });
});