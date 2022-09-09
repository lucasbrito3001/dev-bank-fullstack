import { hashValue } from "src/services/crypt";
import { IUserDTO, IUserGenerator } from "src/interfaces/user.interface";

async function generateUserAccount(
    { name, email, password, accountPassword }: IUserDTO,
    idGenerator: () => string
): Promise<IUserGenerator> {
    try {
        const accountNumber: string = idGenerator();

        const { status: statusPass, hashedValue: hashedPass } = await hashValue(password);

        const { status: statusAccountPass, hashedValue: hashedAccountPass } = await hashValue(accountPassword);

        if (!statusPass || !statusAccountPass) return { status: false, error: "HASH_ERROR" };

        return {
            status: true,
            user: {
                name,
                email,
                password: hashedPass || "",
                account: {
                    bank: "1234",
                    agency: "0001",
                    number: accountNumber,
                    password: hashedAccountPass || "",
                },
            },
        };
    } catch (error) {
        return { status: false, error }
    }
}

export { generateUserAccount };
