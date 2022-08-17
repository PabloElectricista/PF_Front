
export default function Pagination({currentPage, postPerPage, totalPosts, paginate}) {
  
  let pages = []
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i)
  }
  
  return (
    <nav>
      <ul>
        {pages.map(e => <li key={e} onClick={()=>paginate(e)} >{e}</li>)}
      </ul>
    </nav>
  )
}



