import React from "react"

import { Button, Modal, ButtonClickEvent } from "@fider/components"
import { actions, notify, navigator } from "@fider/services"

interface DangerZoneState {
  clicked: boolean
}

export class DangerZone extends React.Component<any, DangerZoneState> {
  constructor(props: any) {
    super(props)
    this.state = {
      clicked: false,
    }
  }

  public onClickDelete = async () => {
    this.setState({ clicked: true })
  }

  public onCancel = async () => {
    this.setState({ clicked: false })
  }

  public onConfirm = async (e: ButtonClickEvent) => {
    const response = await actions.deleteCurrentAccount()
    if (response.ok) {
      e.preventEnable()
      navigator.goHome()
    } else {
      notify.error("Failed to delete your account. Try again later")
    }
  }

  public render() {
    return (
      <div>
        <Modal.Window isOpen={this.state.clicked} center={false} onClose={this.onCancel}>
          <Modal.Header>Account löschen</Modal.Header>
          <Modal.Content>
            <p>
              Wenn du deinen Account löschst, werden wir alle persönlichen Informationen dieses Accounts löschen. Deine Beiträge bleiben bestehen, werden aber anonymisiert.
            </p>
            <p>
              Dieser Prozess kann nicht rückgängig gemacht werden. <strong>Bist du sicher?</strong>
            </p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="danger" size="small" onClick={this.onConfirm}>
              Bestätigen
            </Button>
            <Button variant="tertiary" size="small" onClick={this.onCancel}>
              Abbrechen
            </Button>
          </Modal.Footer>
        </Modal.Window>

        <h4 className="text-title mb-1">Account löschen</h4>
        <p className="text-muted">
          Wenn du deinen Account löschst, werden wir alle persönlichen Informationen dieses Accounts löschen. Deine Beiträge bleiben bestehen, werden aber anonymisiert.
        </p>
        <p className="text-muted">Dieser Prozess kann nicht rückgängig gemacht werden. <strong>Bist du sicher?</strong></p>
        <Button variant="danger" size="small" onClick={this.onClickDelete}>
          Lösche meinen Account
        </Button>
      </div>
    )
  }
}
