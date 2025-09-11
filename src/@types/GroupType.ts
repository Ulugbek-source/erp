import type { ReactNode } from 'react'

export interface GroupsType {
	id: number
	stackId: number
	name: string
	status: boolean
	roomId: number
	createdAt: string
	stack: {
		id: number
		name: string
		image: string
		createdAt: string
	}
	room: {
		id: number
		numberId: number
		name: string
		cratedAt: string
	}
	key: number
	roomName?: string
	stackName?: string
	action: ReactNode
	label?: string
	value?: number
}
