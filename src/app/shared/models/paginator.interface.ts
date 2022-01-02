export interface PaginatorMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginatorLinkLabels[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginatorLinkLabels {
    active: boolean;
    label: string;
    url: string;
}

export interface PaginatorLinks {
    first: string;
    last: string;
    next: string;
    prev: string;
}
