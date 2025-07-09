import * as bcrypt from "bcrypt"

export async function hashPsswd(psswd: string): Promise<string> {
    try {
        const hashedPsswd = await bcrypt.hash(psswd, 10)

        return hashedPsswd
    } catch (error) {
        throw new Error(`Erro ao criar hash ${error}`)
    }
    
}

export async function verifyHash(oldPsswd: string, newPsswd:string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(oldPsswd, newPsswd)

        return match       
    } catch (error) {
        console.log(error)
        throw new Error(`Erro ao verificar hash ${error}`)
    }

}