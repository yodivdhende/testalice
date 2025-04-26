import type { PageServerLoad } from './$types';
import { handleRequest } from '$lib/utils/request';
import { RequestError } from '$lib/types/errors';
import { getConnections } from '../../api/connections/+server';
import { getConnectionToken } from '$lib/utils/cookies';

export const load: PageServerLoad = async ({request, cookies}) => {
	return handleRequest(async () => {
		const  token = request.headers.get('authentication') ?? getConnectionToken(cookies);
		console.log('connection server', {token});
		if (typeof token !== 'string') throw new RequestError(403, 'not authenticated');
		const connections =  await getConnections(token);
		return {connections};;
	});
};

