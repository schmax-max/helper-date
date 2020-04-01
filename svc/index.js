'use strict'
const moment = require('moment')
const _ = require('lodash')
const {validateReq} = require('./validateReq')

module.exports = {master, commander}


function master (req) {
  if (validateReq(req)) {
    return commander (req.body)
  } else {
    return 
  }

}

function commander ({date, url}) {
  // console.log(`starting helper-date for ${url}`)  
  date = date.split(/[\sA-Z]{3}/)[0]
  date = date.split('at')[0]
  const formatsFound = getFormat(date)
  let formattedDate = null

  if (formatsFound.length === 0) {
    formattedDate = processOddDateFormat(date)
  } else {
    formatsFound.reduce((newArray, potentialFormat) => {
      const testDate = moment(date, potentialFormat).toISOString()
      const timeDiff = moment().diff(moment(testDate), 'days')
      // .tz('America/Chicago')
      if (
        timeDiff >= 0
        && (formattedDate === null || testDate > formattedDate)
      ) {
        formattedDate = testDate
      }
    }, [])
  }

  if (!formattedDate) {
    reportDateError (date, url)
  }

  return formattedDate
}


function getFormat (date) {
  const dateFormats = [
    "YYYY-MM-DD",
    "DD/MM/YYYY",
    "MMM D, YYYY, HH:mm",
    "YYYY-MM-DDTHH:MM:SS",
    "YYYY-MM-DDTHH:MM:ss",
    "YYYY-MM-DDTHH:MM:SSZ",
    "MMMM Do, YYYY",
    'YYYY-MM-DDTHH:mm-sss',
    'MMM DD, YYYY',
    'MM.DD.YY',
    'YYYY-MM-DDTHH:mm:ssZZ',
    'YYYY-MM-DDTHH:mm:ss.SSSZZ',
    'DD MMMM YYYY',
    'DD MMM YYYY',
    'YYYY-MM-DDTHH:mm:ss.SSSSSSZ',
    'MMMM D, YYYY',
    'MM-DD-YY',
    'MM-DD-YYYY',
    'MM/DD/YY',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DDTHH:mm.sss',
    'YYYY-MM-DDTHH:mmZZ',
    'YYYY-MM-DDTHH:mm:ss',
    'YYYYMMDD',
    'YYYY-MM-DDTHH:mm:ss.sss',
    'MMMM DD, YYYY / HH:mm',
    'MMMM DD, YYYY, HH:mm',
    'MM/DD/YYYY',
    'DD MMMM YYYY',
    'DDD, DD MMM YYYY',
    'YYYY-MM-DD HH:MM:ss ZZZZ',
    'MMMM YYYY'
  ]
  const applicableDateFormats = dateFormats.reduce((newArray, item) => {
    if (moment(date, item, true).isValid()) {
      newArray.push(item)
    }
    return newArray
  }, [])
  return applicableDateFormats;
}
// function potentiallyChangeDateToHistoric (date) {
//     let convertedDate = null
//     if (moment(date, "YYYY-DD-MMTHH:MM:SSZ", true).isValid()) {
//         console.log('date in the future')
//         console.log(date)
//
//         convertedDate = moment(date, "YYYY-DD-DDTHH:MM:SSZ").toISOString()
//         console.log('convertedDate in the past')
//         console.log(convertedDate)
//     }
//     return convertedDate
// }


function reportDateError (date, url) {
    console.log(`no date found for: ${date}, ${url}`)

    // const currentTime = moment().tz('America/Chicago').toISOString()

    // return Models.ErrorDate.updateOne(
    //     { error_item: date },
    //     { $push: { occurences: { date_input: currentTime, url_input: url } } },
    //     { new: true, upsert: true }
    // )
    // .then((updatedErrorItem) => {

    //     return updatedErrorItem
    //     // console.log('updatedErrorItem')
    //     // console.log(updatedErrorItem)
    //     // reportError (undefined, 'need to add another date format in date function', 'processDate', 'content', date)
    // })
    // .catch((error) => {
    //     console.log(error)
    //     return error
    // })
}


// const date = 'print-edition icon Print edition | The AmericasOct 27th 2018'
// processOddDateFormat(date)

function processOddDateFormat (date) {
    date = date.toLowerCase()
    let year = 0
    let month = 0
    let day = 0

    let formattedDateCreated = ''

    const dayIndicators = [
        'st',
        'nd',
        'rd',
        'th'
    ]
    const regExDayIndicators = new RegExp(dayIndicators.join('|'));

    let dayArray = date.split(regExDayIndicators)

    if (dayArray.length === 2) {
        dayArray = dayArray[0].split(/\s/g)
        const potentialDay = dayArray.slice(-1)[0]
        if (
            potentialDay.match(/\d/) !== null &&
            potentialDay.match(/\W/) === null
        ) {
            day = potentialDay
        }
    }

    const monthsArrayShort = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec'
    ]
    
    const monthsArrayLong = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december"
    ]

    const allMonthWords = _.concat(monthsArrayLong, monthsArrayShort)

    const regExAllMonthWords = new RegExp(allMonthWords.join('|'));
    const monthArray = date.split(regExAllMonthWords)

    if (monthArray.length === 2) {
        let potentialMonth = date.split(monthArray[0])[1]
        potentialMonth = potentialMonth.split(monthArray[1])[0]
        if (
            potentialMonth.match(/\d/) === null &&
            potentialMonth.match(/\w/) !== null
        ) {
            month = monthsArrayShort.indexOf(potentialMonth) + 1 || monthsArrayLong.indexOf(potentialMonth) + 1
        }
    }

    const dateArray = date.split(/,|\s/g)
    dateArray.reduce((newArray, individualDateItem) => {
        individualDateItem = individualDateItem.toLowerCase()
        if (
            individualDateItem.match(/\d/) !== null &&
            individualDateItem.match(':') === null &&
            individualDateItem.match(/[a-z]/) === null &&
            individualDateItem.length === 4 &&
            year === 0
        ) {
            year = individualDateItem
        }

        if (
            individualDateItem.match(/\d/) !== null &&
            individualDateItem.match(/\W/) === null &&
            individualDateItem.length < 3 &&
            day === 0
        ) {
            day = individualDateItem
        }

        if (
            monthsArrayLong.indexOf(individualDateItem) > -1 &&
            month === 0
        ) {
            month = monthsArrayLong.indexOf(individualDateItem) + 1
        }

        if (
            monthsArrayShort.indexOf(individualDateItem.substring(0, 3)) > -1 &&
            month === 0
        ) {
            month = monthsArrayShort.indexOf(individualDateItem.substring(0, 3)) + 1
        }

        return newArray
    }, [])

    if (day !== 0 && month !== 0) {
        if (year === 0) {
            year = moment().year()
            // .tz('America/Chicago')
        }
        const dateCreated = `${year}-${month}-${day}`
        formattedDateCreated = moment(dateCreated, 'YYYY-MM-DD').toISOString()
    } else if (month !== 0) {
        if (year === 0) {
            year = moment().year()
            // .tz('America/Chicago')
        }
        day = moment().date()
        // .tz('America/Chicago')
        const dateCreated = `${year}-${month}-${day}`
        formattedDateCreated = moment(dateCreated, 'YYYY-MM-DD').toISOString()
    } else {
        formattedDateCreated = null
    }
    return formattedDateCreated
}


