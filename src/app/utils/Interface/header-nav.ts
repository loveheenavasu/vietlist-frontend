interface navItem {
    label: string;
    href: string;
    active?: boolean;
    subItems?: navItem[]
}

export {
    navItem
}