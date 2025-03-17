export function createRequest<T>(cb: () => Promise<T>): Request<T> {
  let request: Request<T> = $state({ state: 'loading' });
  cb()
    .then(result => (request = {state: 'success', value: result}))
    .catch(error => (request = {state: 'failed', message: error}))
  return request;
}


export type Request<T> = 
| SuccessRequest<T>
| FailedRequest
| LoadingRequest

type SuccessRequest<T> = {
  state: 'success', value: T
}

type LoadingRequest = {
  state: 'loading',
}

type FailedRequest = {
  state: 'failed',
  message: string,
}