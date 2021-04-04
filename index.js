const fs = require("fs");
const files = fs.readdirSync("csvdata/");

files.forEach(fileName => {
    const outputFileName = fileName.split(".")[0] + ".json"

    const outputData = {
        data: []
    };

    const leakData = fs.readFileSync("csvdata/" + fileName, "utf-8");
    const leakDataArray = leakData.split(/\r?\n/);

    leakDataArray.forEach(element => {
        if (element.includes("\"")) {
            const quoteLength = element.split('"').length;
            for (let i = 0; i < quoteLength; i++) {
                if (i % 2 != 0) {
                    const extract = element.split('"')[i];
                    const extractNoComma = extract.replace(/,/g, ""); // , is the delimiter which you can change
                    element = element.replace(extract, extractNoComma);
                }      
            }
        }

        element = element.split(",");
        outputData.data.push({
            "Phone": element[0],
            "ID": element[1],
            "Email": element[2],
            "First Name": element[3],
            "Last Name": element[4],
            "Gender": element[5],
            "Date Registered": element[6],
            "Birthday": element[7],
            "Location": element[8],
            "Hometown": element[9],
            "Relationship Status": element[10],
            "Education Last Year": element[11],
            "Groups": element[12],
            "Pages": element[13],
            "Last Update": element[14],
            "Creation Time": element[15]
        });
    });

    fs.writeFileSync("jsondata/" + outputFileName, JSON.stringify(outputData, null, "   "));
    console.log(fileName + " OK");
});
