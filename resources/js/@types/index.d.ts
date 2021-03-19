type PaginationProps = {
  links: {
    first?: string
    last?: string
    prev?: string
    next?: string
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
    links: Array<{ url?: string; label: string; active: boolean }>
  }
}

type DataWithPaginationProps<T> = {
  data: Array<T>
} & PaginationProps
