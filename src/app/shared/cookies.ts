export const setCookie = (name: string, value: string) => {
	const expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + 10);
	document.cookie = name + '=' + (value || '')  + '; expires=' + expireDate.toUTCString() + '; path=/';
}

export const getCookie = (name: string) => {
	const nameLookup = name + '=';
	const cookieArray = document.cookie.split(';');
	for(let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];
		while (cookie.charAt(0) === ' ') cookie = cookie.substring(1,cookie.length);
		if (cookie.indexOf(nameLookup) === 0) return cookie.substring(nameLookup.length, cookie.length);
	}
	return null;
}