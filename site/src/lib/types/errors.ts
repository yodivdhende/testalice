import { error } from "@sveltejs/kit";

export class RequestError extends Error {
	public code: number;
	public message: string;
	constructor(code: number, message: string) {
		super();
		this.code = code;
		this.message = message;
	}
    public getError() {
        return error(this.code, this.message)
    }
}

export class UnAutherizedRequestError extends RequestError {
	constructor(message: string = 'not autherized') {super(401, message)}
 }

export class NoAccesRequest extends RequestError {
	constructor(message: string = 'not autherized') {super(403, message)}
 }

