"use client"

import { toast, Toaster } from "sonner"

import { Button } from "@/components/ui/button"

export function SonnerTypes() {
    return (
        <div className="flex flex-wrap gap-2">
            <Toaster richColors position="top-center"/>
            <Button
                variant="outline"
                onClick={() => toast.success("Event has been created")}
            >
                Success
            </Button>
           
            
            <Button
                variant="outline"
                onClick={() => toast.error("Event has not been created")}
            >
                Error
            </Button>
          
        </div>
    )
}
