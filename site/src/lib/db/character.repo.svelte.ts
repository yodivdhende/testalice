import { mysqlconnFn } from "./mysql"

class CharacterRepo {
    private characterSelector = `SELECT Id as id, Name as name, Owner as ownerId, CurrentHP as currentHp, MaxHp as maxHp FROM Characters`

    public async getCharacterById(id: number): Promise<Character> {
        try {
            const [result] = await (
                await mysqlconnFn()
            ).execute(`${this.characterSelector} WHERE id = ?`, [id]);
            const [firstCharacter] = result as any;
            console.log(firstCharacter);
            if(isCharacter(firstCharacter)) {
                return {
                    id: firstCharacter.id,
                    name: firstCharacter.name,
                    ownerId: firstCharacter.ownerId,
                    currentHp: firstCharacter.currentHp,
                    maxHp: firstCharacter.maxHp,
                }
            } else {
			    throw new Error(`character not found with id: ${id}`);
            }
        } catch (error) {
            throw error;
        }
    }
}

export const characterRepo = new CharacterRepo();

export type Character  = {
    id: number,
    name: string,
    ownerId: number,
    currentHp: number,
    maxHp: number,
}

export function isCharacter(character: any): character is Character {
    return (
        typeof character?.id === 'number' &&
        typeof character?.name === 'string' &&
        typeof character?.ownerId === 'number' &&
        typeof character?.currentHp === 'number' &&
        typeof character?.maxHp === 'number' 
    )
}