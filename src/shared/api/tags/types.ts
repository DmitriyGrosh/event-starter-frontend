export type Tag = {
    id: number;
    name: string;
    createdAt: string;
    description: string;
    _count: {
        events: number;
    };
}

export type TagsResponse = Tag[];