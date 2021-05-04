import React, { useState, useEffect } from "react"
import { Modal, SignInControl, LegalFooter } from "@fider/components"
import { Button } from "./common"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SignInModal: React.StatelessComponent<SignInModalProps> = (props) => {
  const [confirmationAddress, setConfirmationAddress] = useState("")

  useEffect(() => {
    if (confirmationAddress) {
      setTimeout(() => setConfirmationAddress(""), 5000)
    }
  }, [confirmationAddress])

  const onEmailSent = (email: string): void => {
    setConfirmationAddress(email)
  }

  const closeModal = () => {
    setConfirmationAddress("")
    props.onClose()
  }

  const content = confirmationAddress ? (
    <>
      <p>
        Wir haben einen Bestätigungslink an <b>{confirmationAddress}</b> geschickt. <br /> Klicke zum Einloggen auf den Link.
      </p>
      <p>
        <Button variant="tertiary" onClick={closeModal}>
          Verstanden
        </Button>
      </p>
    </>
  ) : (
    <SignInControl useEmail={true} onEmailSent={onEmailSent} />
  )

  return (
    <Modal.Window isOpen={props.isOpen} onClose={closeModal}>
      <Modal.Header>Melde dich an um Beiträge zu posten und abzustimmen.</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
      <LegalFooter />
    </Modal.Window>
  )
}
