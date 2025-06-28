/**
 * Generates a cat avatar URL using RoboHash API
 * @param userId - The user ID to generate the avatar for
 * @returns A URL to a cat avatar image
 */
export function getCatAvatarUrl(userId: string): string {
  return `https://robohash.org/${encodeURIComponent(userId)}?set=set4&size=200x200`;
}

/**
 * Generates a random avatar URL using RoboHash API
 * @param userId - The user ID to generate the avatar for
 * @returns A URL to a random avatar image
 */
export function getRandomAvatarUrl(userId: string): string {
  return `https://robohash.org/${encodeURIComponent(userId)}?size=200x200`;
}

/**
 * Generates a monster avatar URL using RoboHash API
 * @param userId - The user ID to generate the avatar for
 * @returns A URL to a monster avatar image
 */
export function getMonsterAvatarUrl(userId: string): string {
  return `https://robohash.org/${encodeURIComponent(userId)}?set=set2&size=200x200`;
} 