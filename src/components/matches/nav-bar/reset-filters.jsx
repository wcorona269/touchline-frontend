import React from 'react'

const ResetFilters = ({resetFilters}) => {
	return (
		<div className='reset-filters' onClick={() => resetFilters()}>
			<i class="fa-solid fa-rotate-right"></i>
			Reset Filters
		</div>
	)
}

export default ResetFilters;