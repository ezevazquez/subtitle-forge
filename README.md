# SubtitleForge

Convierte transcripciones de YouTube a archivos SRT y tradúcelos automáticamente usando IA.

## Estructura del Monorepo

\`\`\`
subtitleforge/
├── apps/
│   ├── web/              # Frontend Next.js 15
│   └── api/              # Backend API Next.js 15
├── packages/
│   ├── utils/            # Funciones de parsing y conversión
│   └── ui/               # Componentes compartidos (shadcn)
├── package.json          # Configuración de workspaces con pnpm
├── turbo.json           # Configuración de Turborepo
└── README.md
\`\`\`

## Requisitos Previos

- Node.js 18+
- pnpm 8+

## Instalación

\`\`\`bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp apps/api/.env.example apps/api/.env.local
# Editar apps/api/.env.local y añadir OPENROUTER_API_KEY
\`\`\`

## Desarrollo Local

\`\`\`bash
# Iniciar todos los servidores en paralelo
pnpm dev
\`\`\`

- **Web**: http://localhost:3000
- **API**: http://localhost:3001

## Build y Producción

\`\`\`bash
# Compilar todos los packages y apps
pnpm build

# Iniciar en producción
pnpm start
\`\`\`

## Deploy

### Vercel

**Deploy de apps/web:**
\`\`\`bash
vercel deploy --cwd=apps/web
\`\`\`

**Deploy de apps/api:**
\`\`\`bash
vercel deploy --cwd=apps/api
\`\`\`

## Variables de Entorno

### apps/api/.env.local

\`\`\`
OPENROUTER_API_KEY=your_key_here
SITE_URL=http://localhost:3000
\`\`\`

## Uso

1. Sube un archivo .txt o .vtt con la transcripción
2. Selecciona el idioma destino
3. El archivo SRT traducido se descargará automáticamente

## Características

- Parsea transcripciones de YouTube (VTT y texto plano)
- Convierte a formato SRT válido
- Traduce usando deepseek-chat-v3.1:free
- UI moderna con shadcn
- Deploy independiente de cada app
\`\`\`

## Arquitectura

- **Turborepo**: Monorepo management y caching
- **pnpm Workspaces**: Gestión de dependencias
- **Next.js 15 App Router**: Frontend y Backend
- **OpenRouter API**: Acceso a modelos IA
- **shadcn/ui**: Componentes reutilizables
