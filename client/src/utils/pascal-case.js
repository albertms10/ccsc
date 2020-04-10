import { upperCaseFirst } from './';

/**
 * Converts the given string into Pascal case.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => s.toLowerCase().split(/[ _-]/g).map(upperCaseFirst).join('');
