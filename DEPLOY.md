# Guía de Deploy en Vercel

Esta guía te ayudará a deployar SubtitleForge en Vercel.

## Estructura del Proyecto

Este es un monorepo con dos aplicaciones:
- **apps/web**: Frontend (Next.js)
- **apps/api**: Backend API (Next.js)

## Pasos para Deploy

### 1. Deploy del Backend (API)

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Clic en "Add New Project"
3. Conecta tu repositorio de GitHub
4. Configura el proyecto:
   - **Root Directory**: `apps/api`
   - **Framework Preset**: Next.js
   - **Build Command**: `cd ../.. && pnpm install && pnpm build --filter=@subtitleforge/api`
   - **Output Directory**: `.next`
   - **Install Command**: `cd ../.. && pnpm install`

5. **Variables de Entorno** (Settings → Environment Variables):
   ```
   OPENROUTER_API_KEY=tu_api_key_aqui
   SITE_URL=https://subtitle-forge-web.vercel.app
   NEXT_PUBLIC_WEB_URL=https://subtitle-forge-web.vercel.app
   ```

6. **Nombre del Proyecto**: `subtitle-forge-api` (o déjalo que Vercel lo genere automáticamente)
7. Deploy y copia la URL de la API (ej: `https://subtitle-forge-api.vercel.app`)

### 2. Deploy del Frontend (Web)

1. Crea un nuevo proyecto en Vercel
2. Configura el proyecto:
   - **Root Directory**: `apps/web`
   - **Framework Preset**: Next.js
   - **Build Command**: `cd ../.. && pnpm install && pnpm build --filter=@subtitleforge/web`
   - **Output Directory**: `.next`
   - **Install Command**: `cd ../.. && pnpm install`

3. **Nombre del Proyecto**: `subtitle-forge-web` (o déjalo que Vercel lo genere automáticamente)

4. **Variables de Entorno**:
   ```
   NEXT_PUBLIC_API_URL=https://subtitle-forge-api.vercel.app
   ```

5. Deploy

### 3. Actualizar URLs después del Deploy

Una vez que tengas ambas URLs (ejemplo):
- **API**: `https://subtitle-forge-api.vercel.app`
- **Web**: `https://subtitle-forge-web.vercel.app`

1. **En el proyecto API** (`subtitle-forge-api`), actualiza las variables de entorno:
   - `SITE_URL` → `https://subtitle-forge-web.vercel.app`
   - `NEXT_PUBLIC_WEB_URL` → `https://subtitle-forge-web.vercel.app`

2. **En el proyecto Web** (`subtitle-forge-web`), actualiza:
   - `NEXT_PUBLIC_API_URL` → `https://subtitle-forge-api.vercel.app`

3. Haz un redeploy de ambos proyectos

## Configuración Alternativa con Vercel CLI

### API (subtitle-forge-api)
```bash
cd apps/api
vercel --prod --name subtitle-forge-api
```

### Web (subtitle-forge-web)
```bash
cd apps/web
vercel --prod --name subtitle-forge-web
```

## Notas Importantes

- Los paquetes locales (`@subtitleforge/ui` y `@subtitleforge/utils`) se resuelven automáticamente gracias a `workspace:*` y `transpilePackages` en Next.js
- Asegúrate de que `OPENROUTER_API_KEY` esté configurada correctamente
- Las URLs de CORS se configuran automáticamente para dominios `*.vercel.app`
- Si usas dominios personalizados, actualiza `NEXT_PUBLIC_WEB_URL` en la API

## Troubleshooting

### Error: Module not found
- Verifica que `transpilePackages` esté configurado en `next.config.mjs`
- Asegúrate de que el build command incluya `pnpm install` en la raíz

### Error: CORS
- Verifica que `NEXT_PUBLIC_WEB_URL` esté configurado en la API
- Asegúrate de que la URL del frontend coincida exactamente

### Error: OPENROUTER_API_KEY
- Verifica que la variable de entorno esté configurada en Vercel
- Asegúrate de que esté disponible en todos los ambientes (Production, Preview, Development)

