/**
 * Shared listing constants.
 *
 * These live outside the client component on purpose: a `"use client"` module
 * only exposes client references to the server, so plain values such as the
 * page size cannot be imported from it by a server component.
 */

/** Articles rendered in the grid and fetched per "View More Articles" click. */
export const POSTS_PER_PAGE = 9;

/** Articles highlighted in the Featured section. */
export const FEATURED_POSTS = 2;
