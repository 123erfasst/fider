import React, { useState } from "react"
import { Comment, Post, ImageUpload } from "@fider/models"
import { Avatar, UserName, Moment, Form, TextArea, Button, Markdown, Modal, ImageViewer, MultiImageUploader, Dropdown, Icon } from "@fider/components"
import { HStack } from "@fider/components/layout"
import { formatDate, Failure, actions } from "@fider/services"
import { useFider } from "@fider/hooks"
import IconDotsHorizontal from "@fider/assets/images/heroicons-dots-horizontal.svg"

interface ShowCommentProps {
  post: Post
  comment: Comment
}

export const ShowComment = (props: ShowCommentProps) => {
  const fider = useFider()
  const [isEditing, setIsEditing] = useState(false)
  const [newContent, setNewContent] = useState("")
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false)
  const [attachments, setAttachments] = useState<ImageUpload[]>([])
  const [error, setError] = useState<Failure>()

  const canEditComment = (): boolean => {
    if (fider.session.isAuthenticated) {
      return fider.session.user.isCollaborator || props.comment.user.id === fider.session.user.id
    }
    return false
  }

  const clearError = () => setError(undefined)

  const cancelEdit = async () => {
    setIsEditing(false)
    setNewContent("")
    clearError()
  }

  const saveEdit = async () => {
    const response = await actions.updateComment(props.post.number, props.comment.id, newContent, attachments)
    if (response.ok) {
      location.reload()
    } else {
      setError(response.error)
    }
  }

  const closeModal = async () => {
    setIsDeleteConfirmationModalOpen(false)
  }

  const deleteComment = async () => {
    const response = await actions.deleteComment(props.post.number, props.comment.id)
    if (response.ok) {
      location.reload()
    }
  }

  const onActionSelected = (action: string) => () => {
    if (action === "edit") {
      setIsEditing(true)
      setNewContent(props.comment.content)
      clearError()
    } else if (action === "delete") {
      setIsDeleteConfirmationModalOpen(true)
    }
  }

  const modal = () => {
    return (
      <Modal.Window isOpen={isDeleteConfirmationModalOpen} onClose={closeModal} center={false} size="small">
        <Modal.Header>Delete Comment</Modal.Header>
        <Modal.Content>
          <p>
            Dieser Vorgang kann nicht rückgängig gemacht werden. <strong>Bist du sicher?</strong>
          </p>
        </Modal.Content>

        <Modal.Footer>
          <Button variant="danger" onClick={deleteComment}>
            Löschen
          </Button>
          <Button variant="tertiary" onClick={closeModal}>
            Abbrechen
          </Button>
        </Modal.Footer>
      </Modal.Window>
    )
  }

  const comment = props.comment

  const editedMetadata = !!comment.editedAt && !!comment.editedBy && (
    <span data-tooltip={`Dieser Kommentar wurde durch ${comment.editedBy.name} am ${formatDate(comment.editedAt)} gelöscht`}>· edited</span>
  )

  return (
    <HStack spacing={2} center={false} className="c-comment flex-items-baseline">
      {modal()}
      <div className="pt-4">
        <Avatar user={comment.user} />
      </div>
      <div className="flex-grow bg-gray-50 rounded-md p-2">
        <div className="mb-1">
          <HStack justify="between">
            <HStack>
              <UserName user={comment.user} />{" "}
              <div className="text-xs">
                · <Moment date={comment.createdAt} /> {editedMetadata}
              </div>
            </HStack>
            {!isEditing && canEditComment() && (
              <Dropdown position="left" renderHandle={<Icon sprite={IconDotsHorizontal} width="16" height="16" />}>
                <Dropdown.ListItem onClick={onActionSelected("edit")}>Bearbeiten</Dropdown.ListItem>
                <Dropdown.ListItem onClick={onActionSelected("delete")} className="text-red-700">
                  Löschen
                </Dropdown.ListItem>
              </Dropdown>
            )}
          </HStack>
        </div>
        <div>
          {isEditing ? (
            <Form error={error}>
              <TextArea field="content" minRows={1} value={newContent} placeholder={comment.content} onChange={setNewContent} />
              <MultiImageUploader field="attachments" bkeys={comment.attachments} maxUploads={2} onChange={setAttachments} />
              <Button size="small" onClick={saveEdit} variant="primary">
                Speichern
              </Button>
              <Button variant="tertiary" size="small" onClick={cancelEdit}>
                Abbrechen
              </Button>
            </Form>
          ) : (
            <>
              <Markdown text={comment.content} style="full" />
              {comment.attachments && comment.attachments.map((x) => <ImageViewer key={x} bkey={x} />)}
            </>
          )}
        </div>
      </div>
    </HStack>
  )
}
