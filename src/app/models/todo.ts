export interface todoModel {
  title: string
  description: string
  colour: number
  priority: number
  tagIds : number[]
}

export interface todo {
  id: number
  created_at: string
  updated_at: string
  is_deleted: boolean
  deleted_at: string
  is_completed: boolean
  title: string
  description: string
  priority: string
  color: string
}

export interface editTodoModel {
  id: number
  title: string
  description: string
  colour: number | null
  priority: number | null
}
