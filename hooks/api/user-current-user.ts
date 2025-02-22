import { getCurrentUserQueryFn } from '@/lib/fetcher'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

function useCurrentUser() {

    return useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUserQueryFn,
        staleTime: 0,
    });
}

export default useCurrentUser