import type { ReactNode } from 'react'

export interface StudentType {
	id: number
	studentId: number
	name: string
	surname: string
	age: number
	groupId: number
	regionId: number
	district: string
	study: string
	phone: string
	email: string
	status: false
	createdAt: string
	group: {
		id: number
		stackId: number
		name: string
		status: true
		roomId: number
		createdAt: string
	}
	region: {
		id: number
		name: string
		createdAt: string
	}
	key?: number
	label?: string
	value?: number
	groupName?: string
	action?: ReactNode
	regionName?: string
}
