const { fetchUserByName } = require("../services/user.service")

async function FetchUsersByNames(req,res) {
    try {
        const {q} = req.query
        const {userId} = req.user

        if(!q){
            return res.status(400).json({
                success: false,
                message: "No Search Query!"
            })
        }

        const result = await fetchUserByName(q, userId)

        if(!result.success){
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("Error In User Controller Fetch User: ", error)
    }
}

module.exports = {
    FetchUsersByNames
}