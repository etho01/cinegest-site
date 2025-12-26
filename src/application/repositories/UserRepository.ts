
import { User, UserLog, PasswordResetRequest, PasswordReset, RegisterUser } from "@/src/domain/User";
import { UpdateMePasswordProps } from "../useCases/User/updateMePassword";


export interface UserRepository {
    connect : (userLog : UserLog) => Promise<string>,
    logout : () => Promise<void>,
    me : () => Promise<User>,
    updateMe : (user : User) => Promise<User>,
    updateMePassword : (props : UpdateMePasswordProps) => Promise<void>,
    requestPasswordReset : (request: PasswordResetRequest) => Promise<void>,
    resetPassword : (reset: PasswordReset) => Promise<void>,
    registerUser : (user : RegisterUser) => Promise<User>,
}