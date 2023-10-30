export interface PostType { //this Needs to be maintained manually
    created_at: string
    description: string | null
    post_id: string
    user_id: string | null
    view_aspect_ratio: number
}

export interface ProfileType { //this Needs to be maintained manually
    avatar_url: string | null
    full_name: string | null
    id: string
    updated_at: string | null
    username: string | null
    website: string | null
}