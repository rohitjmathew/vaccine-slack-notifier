require('dotenv').config()
const moment = require('moment');
const fetch = require('node-fetch');

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK
const PINCODES = process.env.PINCODES.split(' ')


async function main() {
    try {
        await generalNotify("Hold tits! checking vaccine availability!")
        await checkAvailability();
    } catch (e) {
        console.log('an error occured: ' + JSON.stringify(e, null, 2));
        throw e;
    }
}

async function checkAvailability() {
    let datesArray = await fetchNext2weeks();
    datesArray.forEach(date => {
        PINCODES.forEach(pincode => {
            getSlotsForDate(date, pincode);
        })
    })
}

function getSlotsForDate(DATE, pincode) {
    fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pincode + "&date=" + DATE)
        .then(res => res.json())
        .then(async function (data) {
            let centers = data.centers
            const availableCenters = []
            centers.forEach(function (center) {
                let sessions = center.sessions;
                let validSlots = sessions.filter(slot => slot.min_age_limit <= 18 && slot.available_capacity > 0)
                console.log({ date: DATE, validSlots: validSlots.length })
                if (validSlots.length > 0) {
                    center['validSlots'] = validSlots
                    center['testDate'] = DATE
                    delete center['sessions']
                    let validCenter = buildVaccineOutput(center);
                    availableCenters.push(validCenter)
                }
            });
            if (availableCenters.length > 1) {
                await notifyMe(availableCenters)
            } else {
                await generalNotify(`None found yet for ${pincode} for date ${DATE}, can leave tits now.`)
            }
        })
        .catch(function (error) {
            console.log(error);
            generalNotify("Error Occured:\n" + error)
        });
}

function buildVaccineOutput(centre) {
    return {
        testDate: centre.testDate,
        centre: centre.name,
        pincode: centre.pincode,
        date: centre.validSlots[0].date,
        availableCapacity: centre.validSlots[0].available_capacity,
        slots: centre.validSlots[0].slots
    }
}

async function notifyMe(validSlots) {
    let slotDetails = JSON.stringify(validSlots, null, '\t');

    await fetch(SLACK_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ "text": "@channel \n" + slotDetails, "link_names": 1 })
    });

};

async function generalNotify(msg) {
    await fetch(SLACK_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ "text": msg })
    });
}

async function fetchNext2weeks() {
    let dates = [];
    let today = moment();
    for (let i = 0; i < 2; i++) {
        let dateString = today.format('DD-MM-YYYY')
        dates.push(dateString);
        today.add(7, 'day');
    }
    return dates;
}


main()
    .then(() => { console.log('Vaccine availability checker started.'); });
