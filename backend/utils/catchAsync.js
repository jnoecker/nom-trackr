/*
 * Helper function to catch errors from async function calls
 */
module.exports = (fn) => (req, res, next) => fn(req, res, next).catch(next);
