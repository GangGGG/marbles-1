//时间转字符串
function dateToString(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    let dateTime = year + "-" + month + "-" + day;
    return dateTime;
}

//字符串转时间
function stringToDate(dateStr, separator) {
    if (!separator) {
        separator = "-";
    }
    let dateArr = dateStr.split(separator);
    let year = parseInt(dateArr[0]);
    let month;
    //处理月份为04这样的情况
    if (dateArr[1].indexOf("0") == 0) {
        month = parseInt(dateArr[1].substring(1));
    } else {
        month = parseInt(dateArr[1]);
    }
    let day = parseInt(dateArr[2]);
    let date = new Date(year, month - 1, day);
    return date;
}

//获得详细线路点数组
function getDetailPints(points, stepLat, stepLng) {
    const newPoints = new Array();
    let latNew = 0;
    let lngNew = 0;
    for (let i = 0; i < (points.length - 1); i++) {
        const latF = points[i].lng;
        const lngF = points[i].lat;
        const latE = points[i + 1].lng;
        const lngE = points[i + 1].lat;
        const dLat = Math.round(Math.abs(latF - latE) / stepLat, 0);
        let dLng = 0;
        if (!i) {
            newPoints.push(points[i]);
        }
        if (dLat) {
            dLng = Math.abs(lngF - lngE) / dLat;
        }
        if (Math.abs(latF - latE) < 0.000002 && Math.abs(lngF - lngE) > 0.0001) {
            dLng = Math.round(Math.abs(lngF - lngE) / stepLng, 0);
            for (let j = 0; j < dLng - 1; j++) {
                latNew = latF;
                if (lngF - lngE < 0) {
                    lngNew = Math.round((lngF + j * stepLng) * 1000000) / 1000000;
                } else {
                    lngNew = Math.round((lngF - j * stepLng) * 1000000) / 1000000;
                }
                const newPoint = new BMap.Point(latNew, lngNew);
                newPoints.push(newPoint);
            }
        } else {
            for (let m = 0; m < dLat - 1; m++) {
                if (latF - latE < 0) {
                    latNew = Math.round((latF + m * stepLat) * 1000000) / 1000000;
                } else {
                    latNew = Math.round((latF - m * stepLat) * 1000000) / 1000000;
                }
                if (lngF - lngE < 0) {
                    lngNew = Math.round((lngF + m * dLng) * 1000000) / 1000000;
                } else {
                    lngNew = Math.round((lngF - m * dLng) * 1000000) / 1000000;
                }
                const newPoint = new BMap.Point(latNew, lngNew);
                newPoints.push(newPoint);

            }
        }

        newPoints.push(points[i + 1]);
    }
    return newPoints;
}