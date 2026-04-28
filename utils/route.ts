export type RouteSlugValue = string | string[] | undefined

export function resolveRouteSlug(value: RouteSlugValue): string | null {
  if (typeof value === 'string') {
    return value.trim() || null
  }

  if (Array.isArray(value)) {
    const [firstValue] = value

    return typeof firstValue === 'string' && firstValue.trim() ? firstValue.trim() : null
  }

  return null
}
