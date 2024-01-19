export interface NavItem {
  label: string
  href: string
  active?: boolean
  subItems?: NavItem[]
}
