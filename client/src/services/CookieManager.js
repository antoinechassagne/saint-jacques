export default {
  /**
   *
   * @param {*} name The name of the cookie
   * @returns {null|String} The value of the cookie
   */
  get(name) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (!match) return null;
    return match[2];
  },
  /**
   *
   *
   * @param {String} name
   * @param {String} value
   */
  set(name, value) {
    document.cookie = `${name}=${value}`;
  },
  /**
   *
   * @param {*} name The name of the cookie
   */
  delete(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/saint-jacques`;
  },
};
