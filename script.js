// API key: AIzaSyAK1XkMf066K74Ra8_o3QWyJOKOUxb6EZg

document.getElementById('sendbutton').addEventListener('click', () => {
    // Собираем данные с формы
    let key, domensList = '';
    key = document.getElementById('apikey').value;
    domensList = document.getElementById('domenlist').value.split('\n');
    // console.log(key)

    for (let i = 0; i < domensList.length; i++) {
        let url = checkURL(domensList[i]);
        let query = setUpQuery(url);
        if (key != '') {
            query = query + `&key=${key}`;
        }
        run(query);
    }
})

function appendTable(value1, value2, value3) {
    const table = document.querySelector(".table_results");
    let row = table.insertRow();
    // for (let i = 0; i < amountCells; i++) {
    //     var newCell = row.insertCell(i);
    //     newCell.innerHTML = values[i];
    // }
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = value1;
    cell2.innerHTML = value2;
    cell3.innerHTML = value3;
}

function checkURL(url) {
    url = url.trim();
    if (!url.startsWith('http')) {
        return 'http://' + url
    }
        return url
}

function run(url) {
//   const url = url;
    fetch(url
    //     , {
    //     mode: 'no-cors',
    //     cache: 'no-cache',
    // }
    )
        .then(response => response.json())
        .then(json => {
            // Checking error
            if (json.error) {alert('ERROR ON ' + url)}
            else {console.log(json)};
            // Parce the correct responce
            // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
            // to learn more about each of the properties in the response object.
            let fullURL = json.id;
            let TTIstats = json.lighthouseResult.audits['interactive'].displayValue;
            appendTable('check', fullURL, TTIstats);
            

            // const cruxMetrics = {
            //     "First Contentful Paint": json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
            //     "First Input Delay": json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category
            // };
            // console.log(cruxMetrics);
            // const lighthouse = json.lighthouseResult;
            // const lighthouseMetrics = {
            //     'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
            //     'Speed Index': lighthouse.audits['speed-index'].displayValue,
            //     'Time To Interactive': lighthouse.audits['interactive'].displayValue,
            //     'First Meaningful Paint': lighthouse.audits['first-meaningful-paint'].displayValue,
            //     'First CPU Idle': lighthouse.audits['first-cpu-idle'].displayValue,
            //     'Estimated Input Latency': lighthouse.audits['estimated-input-latency'].displayValue
            // };
            // console.log(lighthouseMetrics);
    });
}

function setUpQuery(url) {
  const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const parameters = {
    url: encodeURIComponent(url)
  };
  let query = `${api}?`;
  for (key in parameters) {
    query += `${key}=${parameters[key]}`;
  }
  return query;
}

// function showInitialContent(id) {
//   document.body.innerHTML = '';
//   const title = document.createElement('h1');
//   title.textContent = 'PageSpeed Insights API Demo';
//   document.body.appendChild(title);
//   const page = document.createElement('p');
//   page.textContent = `Page tested: ${id}`;
//   document.body.appendChild(page);
// }

// function showCruxContent(cruxMetrics) {
//   const cruxHeader = document.createElement('h2');
//   cruxHeader.textContent = "Chrome User Experience Report Results";
//   document.body.appendChild(cruxHeader);
//   for (key in cruxMetrics) {
//     const p = document.createElement('p');
//     p.textContent = `${key}: ${cruxMetrics[key]}`;
//     document.body.appendChild(p);
//   }
// }

// function showLighthouseContent(lighthouseMetrics) {
//   const lighthouseHeader = document.createElement('h2');
//   lighthouseHeader.textContent = "Lighthouse Results";
//   document.body.appendChild(lighthouseHeader);
//   for (key in lighthouseMetrics) {
//     const p = document.createElement('p');
//     p.textContent = `${key}: ${lighthouseMetrics[key]}`;
//     document.body.appendChild(p);
//   }
// }

// run();