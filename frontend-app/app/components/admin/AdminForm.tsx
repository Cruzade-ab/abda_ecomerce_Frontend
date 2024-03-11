"use client"
function AdminForm(){


    return(
        <div>
            <form>
                <input type="file" onChange={(e) => {
                    console.log(e)
                }} name="" id="" />
            </form>
        </div>
    )
}

export default AdminForm