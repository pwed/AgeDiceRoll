var apiKey = "5b4bb657-6c6e-4d82-ac35-2ea907f5c45e";
        function requestRandomOrg(json, idArray) {
            xhr = new XMLHttpRequest();
            var url = "https://api.random.org/json-rpc/1/invoke";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    for (var i = 0; i < idArray.length; i++) {
                        document.getElementById(idArray[i]).innerHTML = JSON.parse(xhr.responseText).result.random.data[i];
                    }
                }
                ;
            };
            xhr.send(json);
        }

        function formRandomRequestJson(number, max, min, method, id) {
            return `{
                        "jsonrpc": "2.0",
                            "method": "` + method + `",
                            "params": {
                        "apiKey": "` + apiKey + `",
                                "n": ` + number + `,
                                "min": ` + min + `,
                                "max": ` + max + `,
                                "replacement": true
                    },
                        "id": ` + id + `
                    }`;
        }

        function roll(sides) {
            return Math.floor(Math.random() * sides) + 1;
        }

        function showRoll(noOfDice, sides) {
            for (var i = 0; i < noOfDice; i++) document.getElementById(i).innerHTML = roll(sides);
        }

        function wait(ms) {
            var start = new Date().getTime();
            var end = start;
            while (end < start + ms) {
                end = new Date().getTime();
            }
        }

        function rollTrueRandom() {
            var idArray = ["n1", "n2", "n0"];
            requestRandomOrg(formRandomRequestJson(idArray.length, 6, 1, "generateIntegers", 30), idArray);
        }