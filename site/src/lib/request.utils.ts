import { error } from "@sveltejs/kit";

export function isNumberOrError(id: any): number{
    if(id == null || typeof id != 'string') return error(400, "invalid id");
    const idNumber = Number(id);
    if(Number.isNaN(idNumber)) return error(400, "invalid id")
    return idNumber;
};
