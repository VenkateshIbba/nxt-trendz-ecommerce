import {BsSearch} from 'react-icons/bs'
import './index.css'

/* categoryData = {categoryOptions}
          sortData = {sortbyOptions}
          ratingData = {ratingsList}
          updateCategory = {updateCategory}
          updateSort = {updateSort}
          updateRating = {updateRating} */

const ProductsFilter = props => {
    const {categoryData, ratingData, updateCategory, updateRating, updateSearch, clearFilters} = props
   /*  console.log(ratingData); */
    let onClickcategory
    let onClickSort
    let onClickRating
    const onChangeSearch = (event) => {
        updateSearch(event.target.value)
    }
    const onClickClearFilters = () => {
        clearFilters()
    }
    return (
        <div className='filter-containerr'>
            <div className='search-container'>
             <input onChange={onChangeSearch} className='search-field' type="search" placeholder='Search' />
             <BsSearch />
            </div>
            <div className='category-container'>
                <h3>Category</h3>
                <ul className='category-list'>
                {categoryData.map(each => (
                     onClickcategory = () => updateCategory(each.categoryId),
                    <li onClick={onClickcategory} className='category-li' key={each.categoryId}>{each.name}</li>
                ))}
                </ul>
            </div>
            <div className='rating-container'>
                <h3>Rating</h3>
                <ul className='rating-list'>
                    {ratingData.map(each => (
                        onClickRating = () => updateRating(each.ratingId),
                        <li className='rating-li' key={each.ratingId}>
                            <img onClick={onClickRating} width={200} src={each.imageUrl} alt={each.ratingId} /> 
                        </li>
                    ))}
                </ul>
            </div>
            <div className='clear-filter-container'>
                <button onClick={onClickClearFilters} className='clear-filter-btn'>Clear Filters</button>
            </div>
        </div>
    )
}
export default ProductsFilter