import { getProfile } from '@/service/apiUrls';
import { createContext, useContext, useEffect, useState } from 'react';

const User = createContext<any>(null)
export const useUser = () => useContext(User)

export const UserContext = ({ children }: any) => {
    const [userData, setUserData] = useState<any>({})

    useEffect(() => {
        getProfile().then((res) => {
            setUserData(res?.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const value = {
        userData,
        setUserData
    }

    return (
        <User.Provider value={value}>
            {children}
        </User.Provider>
    )

}