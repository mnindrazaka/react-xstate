import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import Courses from "./Courses"

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>Welcome</div>
            <Courses />
        </QueryClientProvider>
    )
}