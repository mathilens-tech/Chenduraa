/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_CONTACT_PHONE?: string
  readonly VITE_CONTACT_PHONE_E164?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_WHATSAPP_E164?: string
  readonly VITE_OFFICE_CHENNAI_ENABLED?: string
  readonly VITE_SOCIAL_LINKEDIN?: string
  readonly VITE_SOCIAL_FACEBOOK?: string
  readonly VITE_SOCIAL_INSTAGRAM?: string
  readonly VITE_SOCIAL_YOUTUBE?: string
  readonly VITE_LEAD_ENDPOINT?: string
  readonly VITE_LEAD_ACCESS_KEY?: string
  readonly VITE_LEAD_FORMAT?: 'form' | 'json'
  readonly VITE_BASE_PATH?: string
  readonly VITE_SOLUTION_INDUSTRIAL_ENABLED?: string
  readonly VITE_GOOGLE_MAPS_EMBED_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
