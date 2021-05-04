import React, { useState } from "react"
import { Post } from "@fider/models"
import { Button, Icon } from "@fider/components"
import { actions } from "@fider/services"
import { useFider } from "@fider/hooks"
import IconVolumeOn from "@fider/assets/images/heroicons-volume-on.svg"
import IconVolumeOff from "@fider/assets/images/heroicons-volume-off.svg"
import { VStack } from "@fider/components/layout"

interface NotificationsPanelProps {
  post: Post
  subscribed: boolean
}

export const NotificationsPanel = (props: NotificationsPanelProps) => {
  const fider = useFider()
  const [subscribed, setSubscribed] = useState(props.subscribed)

  const subscribeOrUnsubscribe = async () => {
    const action = subscribed ? actions.unsubscribe : actions.subscribe

    const response = await action(props.post.number)
    if (response.ok) {
      setSubscribed(!subscribed)
    }
  }

  if (!fider.session.isAuthenticated) {
    return null
  }

  const button = subscribed ? (
    <Button className="w-full" onClick={subscribeOrUnsubscribe}>
      <Icon sprite={IconVolumeOff} /> <span>Abbestellen</span>
    </Button>
  ) : (
    <Button className="w-full" onClick={subscribeOrUnsubscribe}>
      <Icon sprite={IconVolumeOn} /> <span>Abbonieren</span>
    </Button>
  )

  const text = subscribed ? (
    <span className="text-muted">Du erhälst Benachrichtigungen über Aktivitäten an diesem Beitrag.</span>
  ) : (
    <span className="text-muted">Du erhälst keine Benachrichtigungen über Aktivitäten an diesem Beitrag.</span>
  )

  return (
    <VStack>
      <span className="text-category">Benachrichtigungen</span>
      {button}
      {text}
    </VStack>
  )
}
