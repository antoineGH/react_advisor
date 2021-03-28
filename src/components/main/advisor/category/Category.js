import React, { useRef } from 'react'
import { Image, Button } from 'react-bootstrap'

// Component to Display Category as Button, onClick would trigger handleClick
// Require props: category, filterCategories, city
export default function Category({ category, filterCategories, latLng, setActiveCategory, activeCategory }) {
	// Use as Reference in handleClick function
	const buttonCategory = useRef()

	// Store in variables categories information from object properties
	const categoryName = category.categoryName
	const categoryID = category.id
	const categoryIconPrefix = category.categoryIconPrefix
	const categoryIconSuffix = category.categoryIconSuffix
	const categoryIcon = categoryIconPrefix + '32' + categoryIconSuffix

	// handleClick function feeding filterCategories event handler with city and categoryName
	function handleClick() {
		filterCategories(latLng, categoryName, categoryID)
		setActiveCategory(categoryName)
	}

	return (
		<>
			<Button
				ref={buttonCategory}
				onClick={handleClick}
				className={activeCategory === categoryName ? 'category_active mx-1 my-1 button_category' : 'category mx-1 my-1 button_category'}
				variant='outline-dark'
				size='sm'
				style={{ fontFamily: 'poppinsregular', color: 'white' }}>
				{categoryName} <Image className='mb-1 ml-3' src={categoryIcon} rounded />
			</Button>
		</>
	)
}
