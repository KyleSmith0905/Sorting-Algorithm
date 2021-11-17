/**
 * Sets a cookie to a value. Cookie will expire after 14 days.
 * @param {string} name - Name of cookie.
 * @param {string} value - Value to set cookie to.
 */
export const SetCookie = (name: string, value: string) => {
	const expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + 14);
	document.cookie = name + '=' + (value || '')  + '; expires=' + expireDate.toUTCString() + '; path=/';
};

/**
 * Gets a cookie's value.
 * @param name - Name of cookie.
 * @returns {string | null} - Returns the value of the cookie if it exists, otherwise returns null.
 */
export const GetCookie = (name: string): string | null => {
	const nameLookup = name + '=';
	const cookieArray = document.cookie.split(';');
	for(let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];
		while (cookie.charAt(0) === ' ') cookie = cookie.substring(1,cookie.length);
		if (cookie.indexOf(nameLookup) === 0) return cookie.substring(nameLookup.length, cookie.length);
	}
	return null;
};