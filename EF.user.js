// ==UserScript==
// @name         EF automachine
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ZarkLngeW
// @match        https://corporate.ef.com.cn/school/studyplan*
// @grant        none
// ==/UserScript==

function polling() {
    try {
        if ($("div[class='ets-ui-acc-bd-main']")[0].childElementCount > 0) {
            console.log("submit")
            submit()
        }
    } catch (err) {
        console.log(err)
    }
    setTimeout(function () {
        console.log("waiting")
        polling();
    }, 1000)
}

function submit() {
    $("li[data-at-id][class='ets-ui-acc-act-nav-act']").each(function () {
        aid = this.attributes["data-at-id"].value.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0]
        console.log(aid)
        r = $.ajax({
            type: "POST",
            url: "https://corporate.ef.com.cn/services/api/school/command/scoring/submitactivityscore?c=countrycode%3dcn%7cculturecode%3dzh-CN%7cpartnercode%3dCncp%7csiteversion%3d20-1%7cstudentcountrycode%3dcn%7cdevicetypeid%3d1%7cproductid%3d100",
            data: JSON.stringify({ "studentActivityId": aid, "score": 100, "minutesSpent": 1, "studyMode": 0 }),
            contentType: "application/json"
        })
        console.log(r)
    })
}

polling()