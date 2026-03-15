/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard feature.
 */
import { defineMessages } from 'react-intl'

export const scope = 'app.features.dashboard'

export default defineMessages({
  welcomeHeader: {
    id: `${scope}.welcome.header`,
    defaultMessage: 'Welcome to Dashboard',
  },
  welcomeMessage: {
    id: `${scope}.welcome.message`,
    defaultMessage: 'Here you can manage your account and view analytics',
  },
  statsTitle: {
    id: `${scope}.stats.title`,
    defaultMessage: 'Statistics',
  },
})
