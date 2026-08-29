# Plan de Integración: Meta Commerce Manager, Meta Pixel & Conversions API (CAPI)
## Proyecto: Tradicional Coffee (Vite + React 19 + Cloudflare Pages Functions)

Este documento define la arquitectura técnica completa para sincronizar el catálogo de productos y rastrear eventos de comercio electrónico mediante un esquema **Híbrido Redundante (Meta Pixel en Navegador + Conversions API en el Edge de Cloudflare)** con **Deduplicación Automática de Eventos**.

---

## 1. Arquitectura del Sistema

```text
[ Usuario / Navegador ]
     │
     ├── 1. Pixel (Client-Side) ────► fbq('track', eventName, data, { eventID }) ────► [ Meta Pixel Collector ]
     │                                                                                         │
     └── 2. CAPI (Server-Side) ─────► POST /api/capi { event_name, event_id, ... }            │ (Deduplicación
                                            │                                                  │  vía eventID)
                                            ▼                                                  ▼
                                [ Cloudflare Pages Function ] ──────────────► [ Meta Conversions API (Graph API) ]
                                (Inyecta IP real, User-Agent,
                                 Cookies _fbp/_fbc y META_ACCESS_TOKEN)
```

---

## 2. Catálogo de Productos (Meta Commerce Manager)

### 2.1 Generación Automática del Feed (`catalog.csv`)
- **Script:** `app/scripts/generate-catalog.mjs`
- **Hook:** `"prebuild": "npm run generate:catalog"` en `package.json`.
- **Salida:** `app/public/catalog.csv` (accesible públicamente en `https://tradicional-coffee.shop/catalog.csv`).
- **Campos incluidos:** `id`, `title`, `description`, `availability`, `condition`, `price` (ej. `12000 COP`), `link`, `image_link`, `brand`, `item_group_id`.

### 2.2 Configuración en Meta Commerce Manager
1. Ir a **Meta Commerce Manager > Catálogos > Añadir artículos > Data Feeds**.
2. Elegir **Scheduled Feed (Lista programada)**.
3. URL: `https://tradicional-coffee.shop/catalog.csv`.
4. Frecuencia: Diaria (ej. 04:00 AM COT).

---

## 3. Integración Híbrida: Pixel + Conversions API (CAPI)

### 3.1 Cloudflare Pages Function (`app/functions/api/capi.ts`)
- Recibe los eventos desde el cliente por el endpoint interno `POST /api/capi`.
- Extrae la IP real del usuario de las cabeceras Edge de Cloudflare (`cf-connecting-ip`).
- Extrae el User-Agent y las cookies de Meta (`_fbp` y `_fbc`).
- Envía el payload a `https://graph.facebook.com/v19.0/{PIXEL_ID}/events` usando el `META_ACCESS_TOKEN` secreto.

### 3.2 Deduplicación de Eventos (`eventID`)
- Cada acción del usuario genera un `event_id` único mediante `crypto.randomUUID()`.
- Se envía el **mismo `event_id`** tanto al Pixel del navegador como a la API de Conversiones.
- Meta unifica ambos eventos, alcanzando el mayor puntaje de *Event Match Quality (EMQ)* y evitando duplicar métricas de conversión.

### 3.3 Mapeo de Eventos en la Aplicación
| Evento Meta | Disparador en la App | Archivo de Integración |
| :--- | :--- | :--- |
| `PageView` | Cambio de ruta virtual | `app/src/App.tsx` |
| `ViewContent` | Apertura de modal de producto en la carta o cambio de frappe en el carrusel de pedidos | `ProductModal.tsx` & `OrderPage.tsx` |
| `AddToCart` | Clic en "AGREGAR AL PEDIDO" / "AGREGAR" | `DesktopConfigPanel.tsx` & `ProductDetails.tsx` |
| `InitiateCheckout` | Apertura del Cart Drawer con productos en el carrito | `CartDrawer.tsx` |
| `Contact` / `Lead` | Clic en "HACER PEDIDO POR WHATSAPP" | `CartDrawer.tsx`, `OrderBar.tsx`, `DesktopConfigPanel.tsx` |

---

## 4. Configuración de Variables de Entorno

### 4.1 En el Frontend Local (`app/.env`):
```env
VITE_META_PIXEL_ID=TU_PIXEL_ID_AQUI
```

### 4.2 En Cloudflare Pages Dashboard (Producción):
Ir a **Cloudflare Dashboard > Workers & Pages > Tu Proyecto Pages > Settings > Environment variables**:
1. `META_PIXEL_ID` = `TU_PIXEL_ID`
2. `META_ACCESS_TOKEN` = `EAAG...` (Token de usuario de sistema generado en Meta Events Manager > Configuración > API de Conversiones)
3. `META_TEST_EVENT_CODE` = *(Opcional, código de prueba para la pestaña "Probar eventos")*
4. `VITE_META_PIXEL_ID` = `TU_PIXEL_ID`

---

## 5. Verificación y Diagnóstico

1. **Meta Pixel Helper (Chrome Extension):**
   - Validar que cada evento del navegador se reciba en verde y muestre el parámetro `eventID`.
2. **Meta Events Manager (Test Events):**
   - Enviar eventos desde la web y verificar que en la pestaña de pruebas aparezcan como recibidos por **Navegador y Servidor**, mostrando la etiqueta **Deduplicado**.
