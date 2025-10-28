import atdModel from "../models/AtdSchema.js";



//adds attendance data 
const atdController = async (req, res) => {
    const { date, isPresent } = req.body;
    try {

        if (!date) {
            return res.status(400).json({ success: false, msg: "Data not found" })
        }
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
                    periods: 1
                }]
            })
            await newUser.save();
            return res.status(200).json({ newUser })
        }

        const dailyData = user.daily.find(a => a.date.toISOString().slice(0, 10) == date)
        if (dailyData) {
            if (dailyData.periods >= 7) {
                return res.json({ success: false, msg: "You have marked all periods today" })
            }
        }

        if (!dailyData) {

            user.daily.push({
                date: date,
                presents: isPresent ? 1 : 0,
                periods: 1
            })

        } else if (isPresent) {
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

        res.status(200).json({ success: true, user })



    } catch (err) {
        console.log("Error in atdController", err);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }


}

//adds previous attendance data
const addPreviousDataController = async (req, res) => {
    const { periods, presents } = req.body;
    try {
        const user = await atdModel.findOne({ userId: req.user.id })

        if (!presents || !periods <= 0) {
            return res.status(400).json({ success: false, msg: "Invalid input data" })
        }
        user.totalPeriods = periods;
        user.totalPresents = presents;
        user.result = parseFloat((user.totalPresents / user.totalPeriods) * 100).toFixed(2);


        await user.save();
        res.status(200).json({ success: true, msg: "Previous data added Successfully" })

    } catch (err) {
        console.log("Error in addPreviousDataController", err);
        res.status(500).json({ msg: "Internal Server Error" })

    }
}

//fetching totalPeriods and totalPresents
const fetchAtdController = async (req, res) => {
    try {
        const user = await atdModel.findOne({ userId: req.user.id })

        if (!user) {
            return res.status(200).json({success:true, periods: 0, presents: 0, result: 0 })
        }

        let details = {
            periods: user.totalPeriods || 0,
            presents: user.totalPresents || 0,
            result: user.result||0
        }
        return res.status(200).json(details)




    } catch (err) {
        console.log("Error in fetchAtdController", err);
        res.status(500).json({ msg: "Internal Server Error" })

    }
}

//fetching today's periods and presents
const fetchTodayAtdController = async (req, res) => {
    const { date } = req.body;
    try {
        if (!date) {
            return res.status(400).json({ success: false, msg: "Pass Today's date " })
        }
        const user = await atdModel.findOne({ userId: req.user.id })

        if (!user) {
            return res.json({ presents: 0, periods: 0 })
        }

    
            const daily = await user?.daily?.find(a => a.date.toISOString().slice(0, 10) == date)
            let dailydata = {
                presents: daily?.presents||0,
                periods: daily?.periods||0
            }
            res.status(200).json({ success: true, dailydata })
        






    } catch (err) {
        console.log("Error in fetchTodayAtdController", err);
        res.status(500).json({ msg: "Internal Server Error" })

    }
}

const resetAtdDataController = async (req, res) => {
    try {
        await atdModel.updateOne(
            { userId: req.user.id },
            {
                $set: {
                    totalPeriods: 0,
                    totalPresents: 0,
                    result:0,
                    daily:[]
                }
            }
        
        )
        res.status(200).json({success:true,msg:"Reset Done Successfully"})
    } catch (err) {
        console.log("Error in resetAtdDataController", err);
        res.status(500).json({ msg: "Internal Server Error" })

    }
}






export { atdController, addPreviousDataController, fetchAtdController, fetchTodayAtdController,resetAtdDataController }