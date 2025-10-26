import atdModel from "../models/AtdSchema.js";


const atdController = async (req, res) => {
    const { date, isPresent } = req.body;
    try {
        //check if user is already exit or not
        const user = await atdModel.findOne({ userId: req.user.id })
        if (!user) {

            const newUser = new atdModel({
                userId: req.user.id,
                totalPeriods: 1,
                totalPresents: isPresent ? 1 : 0,
                result: isPresent ? 100 : 0,
                daily: [{
                    date: date,
                    presents: isPresent ? 1 : 0,
                    periods:1
                }]
            })
            await newUser.save();
           return res.status(200).json({ newUser })
        }

        const dailyData = user.daily.find(a => a.date.toISOString().slice(0, 10) == date)
        if (dailyData.periods >= 7) {
            return res.json({success:false,msg:"You have marked all periods today"})
        }

        if (!dailyData) {

            user.daily.push({
                date: date,
                presents: isPresent ? 1 : 0,
                periods:1
            })

        } else if(isPresent) {
            dailyData.presents += 1;
            dailyData.periods += 1;

        } else {
            dailyData.periods += 1;
        }


        user.totalPeriods++;
        if (isPresent) {
            user.totalPresents++;
        }
       
        user.result = parseFloat((user.totalPresents / user.totalPeriods) * 100).toFixed(2);

        await user.save();

        res.status(200).json({success:true,user})



    } catch (err) {
        console.log("Error in atdController", err);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }


}

export { atdController }