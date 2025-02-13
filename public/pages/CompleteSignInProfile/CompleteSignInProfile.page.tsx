import React from "react"

import HomePage, { HomePageProps } from "../Home/Home.page"
import SignInPage from "../SignIn/SignIn.page"
import { Modal, Button, Form, Input, LegalFooter } from "@fider/components"
import { actions, Failure, querystring, Fider } from "@fider/services"

interface CompleteSignInProfilePageState {
  name: string
  error?: Failure
}

export default class CompleteSignInProfilePage extends React.Component<HomePageProps, CompleteSignInProfilePageState> {
  private key: string

  constructor(props: HomePageProps) {
    super(props)
    this.key = querystring.get("k")
    this.state = {
      name: "",
    }
  }

  private submit = async () => {
    const result = await actions.completeProfile(this.key, this.state.name)
    if (result.ok) {
      location.href = "/"
    } else if (result.error) {
      this.setState({ error: result.error })
    }
  }

  private setName = (name: string) => {
    this.setState({ name })
  }

  private noop = () => {
    // do nothing
  }

  public render() {
    return (
      <>
        <Modal.Window canClose={false} isOpen={true} onClose={this.noop}>
          <Modal.Header>Dein Profil</Modal.Header>
          <Modal.Content>
            <p>Du meldest dich zum ersten Mal an. Bitte gib deinen Namen ein.</p>
            <Form error={this.state.error}>
              <Input
                field="name"
                onChange={this.setName}
                maxLength={100}
                placeholder="Name"
                suffix={
                  <Button type="submit" onClick={this.submit} variant="primary" disabled={this.state.name === ""}>
                    Abschicken
                  </Button>
                }
              />
            </Form>
          </Modal.Content>
          <LegalFooter />
        </Modal.Window>
        {Fider.session.tenant.isPrivate ? React.createElement(SignInPage, this.props) : React.createElement(HomePage, this.props)}
      </>
    )
  }
}
