export function Request<T>(): Request<T> {
  return $state({ state: 'loading' });
}
export function SuccessRequest<T>(value: T): SuccessRequest<T> {
  return {state: 'success', value} 
}
export function FailedRequest(message: string): FailedRequest {
  return {state: 'Failed', message} 
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
  state: 'Failed',
  message: string,
}