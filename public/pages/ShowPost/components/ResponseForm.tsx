import React from "react"

import { Modal, Button, DisplayError, Select, Form, TextArea, Field, SelectOption, Icon } from "@fider/components"
import { Post, PostStatus } from "@fider/models"

import { actions, Failure } from "@fider/services"
import { PostSearch } from "./PostSearch"
import IconSpeakerPhone from "@fider/assets/images/heroicons-speakerphone.svg"

interface ResponseFormProps {
  post: Post
}

interface ResponseFormState {
  showModal: boolean
  status: string
  text: string
  originalNumber: number
  error?: Failure
}

export class ResponseForm extends React.Component<ResponseFormProps, ResponseFormState> {
  constructor(props: ResponseFormProps) {
    super(props)

    this.state = {
      showModal: false,
      status: this.props.post.status,
      originalNumber: 0,
      text: this.props.post.response ? this.props.post.response.text : "",
    }
  }

  private submit = async () => {
    const result = await actions.respond(this.props.post.number, this.state)
    if (result.ok) {
      location.reload()
    } else {
      this.setState({
        error: result.error,
      })
    }
  }

  private showModal = async () => {
    this.setState({ showModal: true })
  }

  private closeModal = async () => {
    this.setState({ showModal: false })
  }

  private setStatus = (opt?: SelectOption) => {
    if (opt) {
      this.setState({ status: opt.value })
    }
  }

  private setOriginalNumber = (originalNumber: number) => {
    this.setState({ originalNumber })
  }

  private setText = (text: string) => {
    this.setState({ text })
  }

  public render() {
    const button = (
      <Button className="w-full" onClick={this.showModal}>
        <Icon sprite={IconSpeakerPhone} /> <span>Antworten</span>
      </Button>
    )

    const options = PostStatus.All.map((s) => ({
      value: s.value.toString(),
      label: s.title,
    }))

    const modal = (
      <Modal.Window isOpen={this.state.showModal} onClose={this.closeModal} center={false} size="large">
        <Modal.Content>
          <Form error={this.state.error} className="c-response-form">
            <Select field="status" label="Status" defaultValue={this.state.status} options={options} onChange={this.setStatus} />
            {this.state.status === PostStatus.Duplicate.value ? (
              <>
                <Field>
                  <PostSearch exclude={[this.props.post.number]} onChanged={this.setOriginalNumber} />
                </Field>
                <DisplayError fields={["originalNumber"]} error={this.state.error} />
                <span className="text-muted">Stimmen von diesem Beitrag werden in den originalen Beitrag gemerged.</span>
              </>
            ) : (
              <TextArea
                field="text"
                onChange={this.setText}
                value={this.state.text}
                minRows={5}
                placeholder="Was passiert mit diesem Beitrag? Lass die Benutzer wissen, was passiert..."
              />
            )}
          </Form>
        </Modal.Content>

        <Modal.Footer>
          <Button variant="primary" onClick={this.submit}>
            Abschließen
          </Button>
          <Button variant="tertiary" onClick={this.closeModal}>
            Abbrechen
          </Button>
        </Modal.Footer>
      </Modal.Window>
    )

    return (
      <>
        {button}
        {modal}
      </>
    )
  }
}
