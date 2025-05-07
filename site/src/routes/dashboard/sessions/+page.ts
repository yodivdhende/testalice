import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch}) => {
	const response = await fetch('/api/sessions', {method: 'GET'});
	const sessions = await response.json();
	return {sessions} 
};

