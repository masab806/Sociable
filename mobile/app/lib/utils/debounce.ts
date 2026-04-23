import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay = 500){
    const [Debounced, setDebounced] = useState(value)

    useEffect(()=> {
        const timer = setTimeout(()=> {
            setDebounced(value)
        }, delay)

        return ()=> clearTimeout(timer)
    }, [value, delay])

    return Debounced
}