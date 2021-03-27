export {}

declare global {
  // These open interfaces may be extended in an application-specific manner via
  // declaration merging / interface augmentation.
  namespace Inertia {
    interface PagePropsBeforeTransform {}

    interface PageProps {
      auth: {
        email: string
        first_name: string
        last_name: string
        profile_photo_url: string
        profile_photo_path: string
        two_factor_enabled: boolean
        is_valid: boolean
      }
      appLang: string
      appName: string
      errors?: Object<{
        [key: string]: string
      }>
      status?: string
      flash: {
        error?: string
        success?: string
      }
    }
  }
}
