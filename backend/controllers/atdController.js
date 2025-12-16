import atdModel from "../models/AtdSchema.js";




const atdController = async (req, res) => {
    const { date, isPresent, btnId } = req.body;
    try {
        const user = await atdModel.findOne({ userId: req.user.id });

        // If user doesn't exist, create new record
        if (!user) {
            const newUser = new atdModel({
                userId: req.user.id,
                totalPeriods: 1,
                totalPresents: isPresent ? 1 : 0,
                result: isPresent ? 100 : 0,
                daily: [
                    {
                        date,
                        presents: isPresent ? 1 : 0,
                        periods: 1,
                        btnIds: [{ [btnId]: isPresent ? 1 : 2 }],
                    },
                ],
            });
            await newUser.save();
            return res.status(200).json({
                success: true,
                user: newUser,
                result: { status: newUser.daily[0].btnIds }
            });
        }

        // Find today's data
        let dailyData = user.daily.find(
            (a) => a.date.toISOString().slice(0, 10) === date
        );

        // Case 1: No daily data for this date yet
        if (!dailyData) {
            user.totalPeriods += 1;
            if (isPresent) user.totalPresents += 1;

            user.daily.push({
                date,
                presents: isPresent ? 1 : 0,
                periods: 1,
                btnIds: [{ [btnId]: isPresent ? 1 : 2 }],
            });
        }
        // Case 2: Daily data exists - check if button already clicked
        else {
            let btnPresent = dailyData.btnIds.find((btn) =>
                btn.hasOwnProperty(btnId)
            );

            if (!btnPresent) {
                // Button not clicked yet - add new period
                dailyData.periods += 1;
                user.totalPeriods += 1;

                if (isPresent) {
                    dailyData.presents += 1;
                    user.totalPresents += 1;
                }

                dailyData.btnIds.push({ [btnId]: isPresent ? 1 : 2 });
            } else {
                // Button already clicked - toggle off
                const wasPresent = btnPresent[btnId] === 1;

                dailyData.btnIds = dailyData.btnIds.filter(
                    (obj) => !obj.hasOwnProperty(btnId)
                );

                dailyData.periods = Math.max(0, dailyData.periods - 1);
                user.totalPeriods = Math.max(0, user.totalPeriods - 1);

                if (wasPresent) {
                    dailyData.presents = Math.max(0, dailyData.presents - 1);
                    user.totalPresents = Math.max(0, user.totalPresents - 1);
                }
            }
        }

        // Update result percentage
        user.result = user.totalPeriods
            ? Number(((user.totalPresents / user.totalPeriods) * 100).toFixed(2))
            : 0;

        await user.save();

        // Find updated daily data
        let daily = user.daily.find(
            (a) => a.date.toISOString().slice(0, 10) === date
        );

        let result = {
            status: daily?.btnIds || [],
        };

        res.status(200).json({ success: true, user, result });
    } catch (err) {
        console.log("Error in atdController", err);
        res.status(500).json({
            success: false,
            msg: "Internal server error",
        });
    }
};

//adds previous attendance data
const addPreviousDataController = async (req, res) => {
    let { periods, presents } = req.body;
    periods = Number(periods)
    presents = Number(presents)


    try {
        const user = await atdModel.findOne({ userId: req.user.id })

        if (periods < 0 && presents < 0) {
            return res.status(400).json({ success: false, msg: "Invalid input data" })
        }
        if (!user) {
            const newUser = new atdModel({
                userId: req.user.id,
                totalPeriods: 0,
                totalPresents: 0,
                result: 0,
                daily: []

            })
            await newUser.save();
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
        const user = await atdModel.findOne({ userId: req.user.id },"totalPeriods totalPresents result").lean()

        if (!user) {
            return res.status(200).json({ success: true, periods: 0, presents: 0, result: 0 })
        }
       
        let details = {
            periods: user.totalPeriods || 0,
            presents: user.totalPresents || 0,
            result: user.result || 0
        }
        if (details)
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
        const daily = await atdModel.findOne({ userId: req.user.id,"daily.date":new Date(date)},{"daily.$":1}).lean()
         
        if (!daily) {
            return res.json({ presents: 0, periods: 0 })
        }

        
        // const daily = await user?.daily?.find(a => a.date.toISOString().slice(0, 10) == date)
        let dailydata = {
            presents: daily.daily[0]?.presents || 0,
            periods: daily.daily[0]?.periods || 0
        }
        // console.log(dailydata);
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
                    result: 0,
                    daily: []
                }
            }

        )
        res.status(200).json({ success: true, msg: "Reset Done Successfully" })
    } catch (err) {
        console.log("Error in resetAtdDataController", err);
        res.status(500).json({ msg: "Internal Server Error" })

    }
}


const BtnStatusController = async (req, res) => {
    const { date } = req.body

    try {
        if (!date) {
            return res.status(400).json({ success: false, msg: "Pass Today's date " })
        }
        const user = await atdModel.findOne({ userId: req.user.id })

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        const daily = await user?.daily?.find(a => a.date.toISOString().slice(0, 10) == date)
        let dailydata = {
            status: daily?.btnIds
        }
        res.json(dailydata)




    } catch (err) {
        console.log(err);

    }
}



export { atdController, addPreviousDataController, fetchAtdController, fetchTodayAtdController, resetAtdDataController, BtnStatusController }