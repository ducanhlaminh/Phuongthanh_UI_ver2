

const BreadCrumb=({parent,current})=>{
    return <div>
        {parent?.map((url,i)=>{
            return <div>
                <p>{url.name}</p>
            </div>
        })}
    </div>
}

export default BreadCrumb;