export interface TaskResponse {
    tks_deadline_date: string;
    tsk_color: string
    tsk_creation_date: string
    tsk_description: string
    tsk_id:	number
    tsk_name: string
    tsk_update_date: string
    tskpr_id: number
    tsksk_id: number
    usr_id:	number
}

export interface TaskRequest {
    tks_deadline_date: string;
    tsk_color: string
    tsk_description: string
    tsk_name: string
    tskpr_id: number
    tsksk_id: number
    usr_id:	number
}