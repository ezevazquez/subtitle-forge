#!/usr/bin/env node

/**
 * Script de diagnóstico para verificar que Tailwind esté generando las clases correctamente
 * Ejecutar: node scripts/check-tailwind.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de Tailwind...\n');

// Verificar que globals.css existe
const globalsPath = path.join(__dirname, '../app/globals.css');
if (fs.existsSync(globalsPath)) {
  console.log('✅ globals.css encontrado');
  const content = fs.readFileSync(globalsPath, 'utf8');
  
  // Verificar directivas @source
  const sourceDirectives = content.match(/@source\s+[^\n]+/g);
  if (sourceDirectives) {
    console.log(`✅ ${sourceDirectives.length} directivas @source encontradas`);
    sourceDirectives.forEach((dir, i) => {
      console.log(`   ${i + 1}. ${dir.trim()}`);
    });
  } else {
    console.log('⚠️  No se encontraron directivas @source');
  }
  
  // Verificar @import tailwindcss
  if (content.includes('@import "tailwindcss"')) {
    console.log('✅ @import "tailwindcss" encontrado');
  } else {
    console.log('❌ @import "tailwindcss" NO encontrado');
  }
} else {
  console.log('❌ globals.css NO encontrado');
}

// Verificar postcss.config.mjs
const postcssPath = path.join(__dirname, '../postcss.config.mjs');
if (fs.existsSync(postcssPath)) {
  console.log('✅ postcss.config.mjs encontrado');
} else {
  console.log('❌ postcss.config.mjs NO encontrado');
}

// Verificar safelist
const safelistPath = path.join(__dirname, '../app/tailwind-safelist.tsx');
if (fs.existsSync(safelistPath)) {
  console.log('✅ tailwind-safelist.tsx encontrado');
} else {
  console.log('❌ tailwind-safelist.tsx NO encontrado');
}

console.log('\n📝 Para ver los logs de build en Vercel:');
console.log('   1. Ve a tu proyecto en vercel.com');
console.log('   2. Clic en el deployment que falló');
console.log('   3. Revisa la sección "Build Logs"');
console.log('   4. Busca errores relacionados con "tailwind", "postcss", o "@source"');

