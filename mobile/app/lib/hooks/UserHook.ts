import { useQuery } from "@tanstack/react-query";
import userService from "@/app/services/user.service";

export const useSearchUsers = (query: string)=> {
    return useQuery({
        queryKey: ["search-users", query],
        queryFn: ()=> userService.searchUsers(query),
        enabled: query.trim().length > 0,
        staleTime: 1000 * 60 * 5
    })
}