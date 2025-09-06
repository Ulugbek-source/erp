import React from 'react'
import { Table } from 'antd'

const CustomTable: React.FC<{ columns: any[]; data: any[] }> = ({
	columns,
	data,
}) => <Table columns={columns} dataSource={data} />

export default CustomTable
