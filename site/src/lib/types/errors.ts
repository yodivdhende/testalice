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
