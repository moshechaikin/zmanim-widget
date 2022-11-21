// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: clock;
// ------------------------------------------------------------------------------
// Created by Moshe Chaikin (https://github.com/moshechaikin)
// this scriptable widget uses the Hebcal Zmanim API (https://www.hebcal.com/home/1663/zmanim-halachic-times-api)
// to fetch Zmanim for widget display
// using your iPhone's current location
// ------------------------------------------------------------------------------
// -- SETUP --
// *make sure to press the play (run) button & enable location permissions* 
//  (set to while using app)
const config = {
    zmanTitle: "שקיעה", // name this whatever you want
    zmanType: "sunset"
    // -- zmanType Options: --
    // "dawn", "sofZmanTfilla", "chatzotNight", "minchaKetana",
    // "tzeit85deg", "tzeit42min", "misheyakir", "plagHaMincha", 
    // "tzeit50min", "alotHaShachar", "tzeit72min",
    // "sofZmanTfillaMGA", "sofZmanShma", "chatzot", "sunset", 
    // "misheyakirMachmir", "sofZmanShmaMGA", "minchaGedola",
    // "tzeit7083deg", "dusk", "sunrise"
};

async function createWidget() {
    let w = new ListWidget();
    
    let secondTitle;
    try {
        const currentLocation = await Location.current();
        const url = `https://www.hebcal.com/zmanim?cfg=json&geo=pos&latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`;
        const response = await new Request(url).loadJSON();
        const zman = new Date(response.times[config.zmanType]);
        let time = zman.toLocaleTimeString().split(":");
        time = time[0] + ':' + time[1] + time[2].split(" ")[1].toLowerCase();
        secondTitle = time;
    } catch (err) {
        console.log(err);
        secondTitle = "--";
    }
    
    let firstTitle = w.addText(config.zmanTitle);
    firstTitle.centerAlignText();
    let timesNewRoman = new Font("Times New Roman", 22);
    firstTitle.font = timesNewRoman;
    
    secondTitle = w.addText(secondTitle);
    secondTitle.font = Font.semiboldSystemFont(24);
    secondTitle.centerAlignText();
    
    return w;
}

let widget = await createWidget();
Script.setWidget(widget);
