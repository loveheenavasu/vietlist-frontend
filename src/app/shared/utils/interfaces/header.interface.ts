export interface NavItem {
  label: string
  href: string
  active?: boolean
  subItems?: NavItem[]
}

export interface ProfileMenu {
  label: string
  icon: any
  url: any
}
