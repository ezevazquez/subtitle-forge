/**
 * Este archivo fuerza a Tailwind a incluir todas las clases usadas
 * en los componentes del paquete UI. Esto asegura que funcionen en producción.
 * 
 * IMPORTANTE: Este componente debe ser importado y renderizado para que Tailwind
 * escanee las clases durante el build.
 */

import React from "react"

// Componente oculto que usa todas las clases - Tailwind las detectará
// Separamos las clases en elementos individuales para mejor detección
// Usamos className en cada elemento para que Tailwind las detecte
export function TailwindSafelist() {
  return (
    <div className="sr-only" aria-hidden="true" style={{ display: 'none' }}>
      {/* Button classes - separadas para mejor detección */}
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium" />
      <button className="ring-offset-background transition-colors focus-visible:outline-none" />
      <button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
      <button className="disabled:pointer-events-none disabled:opacity-50" />
      <button className="bg-blue-600 text-white hover:bg-blue-700" />
      <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground" />
      <button className="bg-destructive text-destructive-foreground hover:bg-destructive/90" />
      <button className="h-10 px-4 py-2" />
      <button className="h-9 rounded-md px-3" />
      <button className="h-11 rounded-md px-8" />
      <button className="w-10 h-10" />
      
      {/* Card classes */}
      <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm" />
      <div className="flex flex-col space-y-1.5 p-6" />
      <div className="pt-0" />
      <div className="text-2xl font-semibold leading-none tracking-tight" />
      
      {/* FileInput classes */}
      <div className="w-full block text-sm text-slate-500" />
      <input className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0" />
      <input className="file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700" />
      <input className="hover:file:bg-blue-100" />
      <div className="mt-1 text-xs text-muted-foreground" />
      <label className="text-foreground mb-2 font-medium" />
      
      {/* Select classes */}
      <select className="px-3 py-2 border border-input rounded-md" />
      <select className="bg-background text-foreground placeholder-muted-foreground" />
      <select className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
      
      {/* Page classes */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4" />
      <div className="w-full max-w-md" />
      <div className="shadow-lg" />
      <div className="text-center text-3xl font-bold text-blue-600" />
      <div className="text-slate-600 mt-2" />
      <div className="space-y-6" />
      <div className="p-3 bg-blue-50 rounded-md border border-blue-200" />
      <div className="text-blue-900" />
      <div className="bg-red-50 border-red-200 text-red-900" />
      <div className="bg-green-50 border-green-200 text-green-900" />
      <div className="gap-2 mt-6" />
      
      {/* Clases adicionales críticas */}
      <div className="rounded-md" />
      <div className="border-0" />
      <div className="hover:bg-blue-100" />
      <div className="focus-visible:outline-none" />
      <div className="focus-visible:ring-2" />
      <div className="focus-visible:ring-ring" />
      <div className="focus-visible:ring-offset-2" />
      <div className="transition-colors" />
      <div className="ring-offset-background" />
      <div className="disabled:pointer-events-none" />
      <div className="disabled:opacity-50" />
      <div className="hover:bg-accent" />
      <div className="hover:text-accent-foreground" />
      <div className="hover:bg-destructive/90" />
      <div className="placeholder-muted-foreground" />
      <div className="bg-background" />
      <div className="border-input" />
      <div className="text-destructive-foreground" />
      <div className="bg-destructive" />
      <div className="h-9" />
      <div className="h-11" />
      <div className="px-8" />
      <div className="w-10" />
      <div className="h-10" />
      <div className="px-3" />
      <div className="py-2" />
      <div className="border-input" />
      <div className="rounded-md" />
      <div className="file:mr-4" />
      <div className="file:py-2" />
      <div className="file:px-4" />
      <div className="file:rounded-md" />
      <div className="file:border-0" />
      <div className="file:text-sm" />
      <div className="file:font-semibold" />
      <div className="file:bg-blue-50" />
      <div className="file:text-blue-700" />
      <div className="hover:file:bg-blue-100" />
    </div>
  )
}

