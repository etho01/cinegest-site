
import { RegisterUser, User } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";


export const registerUser = async (repo: UserRepository, user: RegisterUser) : Promise<User> => {
    const createdUser = await repo.registerUser(user);
    return createdUser;
}