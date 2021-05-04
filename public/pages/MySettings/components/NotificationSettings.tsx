import React, { useState } from "react"

import { UserSettings } from "@fider/models"
import { Toggle, Field } from "@fider/components"
import { useFider } from "@fider/hooks"
import { HStack, VStack } from "@fider/components/layout"

interface NotificationSettingsProps {
  userSettings: UserSettings
  settingsChanged: (settings: UserSettings) => void
}

type Channel = number
const WebChannel: Channel = 1
const EmailChannel: Channel = 2

export const NotificationSettings = (props: NotificationSettingsProps) => {
  const fider = useFider()
  const [userSettings, setUserSettings] = useState(props.userSettings)

  const isEnabled = (settingsKey: string, channel: Channel): boolean => {
    if (settingsKey in userSettings) {
      return (parseInt(userSettings[settingsKey], 10) & channel) > 0
    }
    return false
  }

  const toggle = async (settingsKey: string, channel: Channel) => {
    const nextSettings = {
      ...userSettings,
      [settingsKey]: (parseInt(userSettings[settingsKey], 10) ^ channel).toString(),
    }
    setUserSettings(nextSettings)
    props.settingsChanged(nextSettings)
  }

  const icon = (settingsKey: string, channel: Channel) => {
    const active = isEnabled(settingsKey, channel)
    const label = channel === WebChannel ? "Web" : "Mail"
    const onToggle = () => toggle(settingsKey, channel)
    return <Toggle key={`${settingsKey}_${channel}`} active={active} label={label} onToggle={onToggle} />
  }

  const info = (settingsKey: string, aboutForVisitors: string, aboutForCollaborators: string) => {
    const about = fider.session.user.isCollaborator ? aboutForCollaborators : aboutForVisitors
    const webEnabled = isEnabled(settingsKey, WebChannel)
    const emailEnabled = isEnabled(settingsKey, EmailChannel)

    if (!webEnabled && !emailEnabled) {
      return (
        <p className="text-muted">
          Du wirst <strong>keine</strong> Benachrichtigungen über dieses Event erhalten.
        </p>
      )
    } else if (webEnabled && !emailEnabled) {
      return (
        <p className="text-muted">
          Du erhälst <strong>Web</strong> Benachrichtigungen über {about}.
        </p>
      )
    } else if (!webEnabled && emailEnabled) {
      return (
        <p className="text-muted">
          Du erhälst <strong>Mail</strong> Benachrichtigungen über {about}.
        </p>
      )
    } else if (webEnabled && emailEnabled) {
      return (
        <p className="text-muted">
          Du erhälst <strong>Mail</strong> und <strong>Web</strong> Benachrichtigungen über {about}.
        </p>
      )
    }
    return null
  }

  return (
    <>
      <Field label="Benachrichtigungen">
        <p className="text-muted">Benutze die folgenden Einstellungen um zu steuern, über welche Events du benachrichtigt werden möchtest.</p>

        <div className="notifications-settings">
          <VStack spacing={4} divide={true} className="p-2 bg-gray-50 rounded">
            <div>
              <div className="mb-1">Neuer Beitrag</div>
              {info("event_notification_new_post", "neue Beiträge auf dieser Seite", "neue Beiträge auf dieser Seite")}
              <HStack spacing={6}>
                {icon("event_notification_new_post", WebChannel)}
                {icon("event_notification_new_post", EmailChannel)}
              </HStack>
            </div>
            <div>
              <div className="mb-1">Diskussion</div>
              {info("event_notification_new_comment", "Kommentare an Beiträgen zu denen du abboniert bist", "Kommentare an allen Beiträgen, außer von denen, die du explizit abbestellt hast")}
              <HStack spacing={6}>
                {icon("event_notification_new_comment", WebChannel)}
                {icon("event_notification_new_comment", EmailChannel)}
              </HStack>
            </div>
            <div>
              <div className="mb-1">Statusänderung</div>
              {info(
                "event_notification_change_status",
                "Statusänderungen von Beiträgen zu denen du abboniert bist",
                "Statusänderungen von allen Beiträgen, außer von denen, die du explizit abbestellt hast"
              )}
              <HStack spacing={6}>
                {icon("event_notification_change_status", WebChannel)}
                {icon("event_notification_change_status", EmailChannel)}
              </HStack>
            </div>
          </VStack>
        </div>
      </Field>
    </>
  )
}
