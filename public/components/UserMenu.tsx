import React from "react"
import { useFider } from "@fider/hooks"
import { Avatar, Dropdown } from "./common"

export const UserMenu = () => {
  const fider = useFider()

  return (
    <div className="c-menu-user">
      <Dropdown position="left" renderHandle={<Avatar user={fider.session.user} />}>
        <div className="p-2 text-medium uppercase">{fider.session.user.name}</div>
        <Dropdown.ListItem href="/settings">Einstellungen</Dropdown.ListItem>
        <Dropdown.Divider />

        {fider.session.user.isCollaborator && (
          <>
            <div className="p-2 text-medium uppercase">Administration</div>
            <Dropdown.ListItem href="/admin">Seiteneinstellungen</Dropdown.ListItem>
            <Dropdown.Divider />
          </>
        )}
        <Dropdown.ListItem href="/signout?redirect=/">Logout</Dropdown.ListItem>
      </Dropdown>
    </div>
  )
}
