import { Skeleton } from 'antd'

const StackSkeleton = () => {
	return (
		<div className='flex flex-wrap justify-center gap-5'>
			<div className='w-[260px] h-[356px]'>
				<Skeleton.Button className='!w-full !h-full' active />
			</div>
			<div className='w-[260px] h-[356px]'>
				<Skeleton.Button className='!w-full !h-full' active />
			</div>
			<div className='w-[260px] h-[356px]'>
				<Skeleton.Button className='!w-full !h-full' active />
			</div>
			<div className='w-[260px] h-[356px]'>
				<Skeleton.Button className='!w-full !h-full' active />
			</div>
			<div className='w-[260px] h-[356px]'>
				<Skeleton.Button className='!w-full !h-full' active />
			</div>
			<div className='w-[260px] h-[356px]'>
				<Skeleton.Button className='!w-full !h-full' active />
			</div>
		</div>
	)
}

export default StackSkeleton
