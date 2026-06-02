const authService=require('../services/authService')


module.exports={
    register: async function(req,res){
        try {
            const user= await authService.register(req.body);
            res.status(200).json({
                message: 'utilisateur créer',
                user
            })
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    },
    login: async function(res, req){
        try {
            const result=await authService.login(req.body);
            res.status(200).json({
                result
            })
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
}