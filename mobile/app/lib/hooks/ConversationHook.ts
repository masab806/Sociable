import conversationService from "@/app/services/conversation.service";
import { useQuery } from "@tanstack/react-query";

export const useConversationSearch = ()=> {
    return useQuery({
        queryKey: ['get-conversation'],
        queryFn: ()=> conversationService.getAllUserConversation()
    })
}

export const useConvoSearch = (query: string)=> {
    return useQuery({
        queryKey: ['search-conversations', query],
        queryFn: ()=> conversationService.searchConversations(query),
        enabled: query.trim().length > 0,
        staleTime: 1000 * 60 * 5
    })
}

export const FetchConvoById = (conversationId: number)=> {
    return useQuery({
        queryKey: ['fetch-conversation', conversationId],
        queryFn: ()=> conversationService.fetchConversationById(conversationId),
        enabled: !!conversationId
    })
}