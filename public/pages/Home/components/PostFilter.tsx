import React, { useState } from "react"
import { PostStatus } from "@fider/models"
import { Dropdown } from "@fider/components"
import { HStack } from "@fider/components/layout"
import { useFider } from "@fider/hooks"

interface PostFilterProps {
  activeView: string
  countPerStatus: { [key: string]: number }
  viewChanged: (name: string) => void
}

interface OptionItem {
  value: string
  label: string
  count?: number
}

export const PostFilter = (props: PostFilterProps) => {
  const fider = useFider()
  const [view, setView] = useState<string>(props.activeView)

  const handleChangeView = (item: OptionItem) => () => {
    setView(item.value)
    props.viewChanged(item.value)
  }

  const options: OptionItem[] = [
    { value: "trending", label: "Angesagt" },
    { value: "recent", label: "Neuste" },
    { value: "most-wanted", label: "Meiste Stimmen" },
    { value: "most-discussed", label: "Meiste Kommentare" },
  ]

  if (fider.session.isAuthenticated) {
    options.push({ value: "my-votes", label: "Meine Stimmen" })
  }

  PostStatus.All.filter((s) => s.filterable && props.countPerStatus[s.value]).forEach((s) => {
    options.push({
      label: s.title,
      value: s.value,
      count: props.countPerStatus[s.value],
    })
  })

  const selectedItem = options.filter((x) => x.value === view)
  const label = selectedItem.length > 0 ? selectedItem[0].label : options[0].label

  return (
    <HStack>
      <span className="text-category">Zeige</span>
      <Dropdown renderHandle={<div className="text-medium text-xs uppercase rounded-md uppercase bg-gray-100 px-2 py-1">{label}</div>}>
        {options.map((o) => (
          <Dropdown.ListItem onClick={handleChangeView(o)} key={o.value}>
            <HStack spacing={2}>
              <span className={view === o.value ? "text-semibold" : ""}>{o.label}</span>
              <div>{o.count && o.count > 0 && <span className="bg-gray-200 inline-block rounded-full px-1 w-min-4 text-2xs text-center">{o.count}</span>}</div>
            </HStack>
          </Dropdown.ListItem>
        ))}
      </Dropdown>
    </HStack>
  )
}
