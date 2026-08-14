### FRONTEND

# Design Tokens

Instead of hardcoding colors, spacing and font sizes throughout the application,
the project uses semantic design tokens.

Example:
background
surface
surface-secondary
primary
text-primary

- Easier maintenance
- Theme support
- Better consistency
- Scalable design system

# Aliases @

Allows file importing using an absolute path inside the project.

- Code more legible
- Moving files won't break the imports
- Common pattern in a lot of modern React apps

# Fontsource

Instead of depending on Google Fonts every time an user opens the website, the fonts are in the application bundle itself.

- Less requests
- Works offline
- Avoid third party dependencies
- Better version control

## Timezone strategy

Codemetry uses the user's current timezone when generating time-of-day analytics. Historical coding times are not retroactively recalculated when the user changes timezone. This is an intentional MVP trade-off and may be refined in future versions.
