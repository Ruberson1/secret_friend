import { getToday } from "../utils/get_today"

export const validatePassword =  (password: string): boolean => {
    const currentPass = getToday().split('/').join('');
    return password === currentPass;
}

export const createToken = () => {
    
}