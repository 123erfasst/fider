import React from "react"
import { Button } from "@fider/components"
import { actions } from "@fider/services"

interface APIKeyFormState {
  apiKey?: string
}

export class APIKeyForm extends React.Component<any, APIKeyFormState> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  private regenerate = async () => {
    const result = await actions.regenerateAPIKey()
    if (result.ok) {
      this.setState({ apiKey: result.data.apiKey })
    }
  }

  private showAPIKey() {
    return (
      <>
        <p className="text-muted">
          Dein neuer API Key ist: <code>{this.state.apiKey}</code>
        </p>
        <p className="text-muted">Speichere ihn sicher auf deinem Server. Niemals auf dem Client oder der App.</p>
      </>
    )
  }

  public render() {
    return (
      <div>
        <h4 className="text-title mb-1">API Key</h4>
        <p className="text-muted">
          Der API Key wird nur beim Generieren gezeigt. Erzeuge einen neuen, wenn der aktuelle kompromitiert oder verloren wurde.
        </p>
        <p className="text-muted">
          Eine Anleitung, wie du den API Key benutzt, findest du in der {" "}
          <a className="text-link" rel="noopener" href="https://getfider.com/docs/api" target="_blank">
            offiziellen Dokumentation
          </a>
          .
        </p>
        <p>
          <Button size="small" onClick={this.regenerate}>
            API Key generieren
          </Button>
        </p>
        {this.state.apiKey && this.showAPIKey()}
      </div>
    )
  }
}
