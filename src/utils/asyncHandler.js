const asyncHandler = (fn) =>{
    return (req,res,next) =>{
        Promise.resolve(fn(req,res,next))
        .catch((err)=>next(err))
    }
}



// This is the method used by controllers for many time and it helps and esy the proess in communication with db.
// const asyncHandler = (fn) => async(req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message: err.message
//         })
//     }
// }

export {asyncHandler}