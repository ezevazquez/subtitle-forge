/**
 * Este archivo fuerza a Tailwind a incluir todas las clases usadas
 * en los componentes del paquete UI. Esto asegura que funcionen en producción.
 * 
 * Tailwind escaneará este archivo y encontrará todas las clases en las strings.
 */

import React from "react"

// Componente oculto que usa todas las clases - Tailwind las detectará
export function TailwindSafelist() {
  return (
    <div className="hidden">
      {/* Button classes */}
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 border border-input bg-background hover:bg-accent hover:text-accent-foreground bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 h-9 h-11 px-8 w-10" />
      
      {/* Card classes */}
      <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm flex flex-col space-y-1.5 p-6 pt-0 text-2xl font-semibold leading-none tracking-tight" />
      
      {/* FileInput classes */}
      <div className="w-full block text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-1 text-xs text-muted-foreground text-foreground mb-2 font-medium" />
      
      {/* Select classes */}
      <select className="px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
      
      {/* Page classes */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 max-w-md shadow-lg text-center text-3xl font-bold text-blue-600 text-slate-600 mt-2 space-y-6 p-3 bg-blue-50 rounded-md border border-blue-200 text-blue-900 bg-red-50 border-red-200 text-red-900 bg-green-50 border-green-200 text-green-900 gap-2 mt-6" />
    </div>
  )
}

