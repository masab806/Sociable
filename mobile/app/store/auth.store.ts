import {create} from "zustand"
import { UserType } from "../lib/types"

interface AuthStore {
    user: UserType | null,
    token: string | null,
    setUser: (user: UserType, token: string) => void
    logout: ()=> void
}

export const useAuthStore = create<AuthStore>((set)=> ({
    user: null,
    token: null,

    setUser: (user, token)=> set({user: user, token: token}),

    logout: ()=> set({user: null, token: null})
}))