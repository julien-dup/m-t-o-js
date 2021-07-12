  const apiKey = "e9b055542f562a7fd996b35ebbf8e5b5";
  const apiKeyPred = "142a6d460dea83faddd5aa1df7ecb807";


  const form = document.querySelector(".top-banner form")
  form.addEventListener("submit", e => {
      e.preventDefault();
      console.log(e)
      const cityName = document.getElementsByTagName("input")[0].value
      console.log(cityName)
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      const previous = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      fetch(url)
          .then(response => response.json())
          .then(data => {
              console.log(data)
              data.weather.forEach(element => {
                  const temp = Math.round(data.main["temp"])
                  const description = element.description
                  const elementIcon = element.icon
                  const icon = `https://openweathermap.org/img/wn/${
                    elementIcon
                    }@2x.png`;
                  const containt2 = document.getElementById("containt2")
                  containt2.innerHTML = `
                  <section class="middle-banner">
                    <div class="main2">
                        <div class = recap>
                            <h2>Météo <br><span class="city"> ${cityName} </span> </h2>
                            <div class="card">
                                <div class="icon">
                                <img src=${icon}>
                                </div>
                        </div> 
                    </div>
            <div class="meteo">
            <p><span class="temp"> ${temp} °C </span> ${description}</p>
            </div>
           
        </div>
    </section>
                  `
              });


          })
          fetch(previous)
          .then(prediction => prediction.json())
          .then(dataPred => {
              console.log(dataPred)
              for (i=0; i<dataPred.list.length; i++) {
                  
                const hour = dataPred.list[i].dt_txt.split(' ');
                if (hour[1] == "12:00:00") {
                  console.log( typeof(dataPred.list[i].dt_txt))
                  dataPred.list[i].weather.forEach(element => {
                      console.log(element.description)
                      const tempPred = Math.round(dataPred.list[i].main["temp"])
                const descriptionPred = element.description
                const elementIconPred = element.icon

                console.log(hour[1]);
                const dateTest = new Date (dataPred.list[i].dt_txt)
                console.log(dateTest)
                const dateHour = dataPred.list[i].dt_txt.toLocaleString('fr-FR',{
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                                 })

                const iconPred = `https://openweathermap.org/img/wn/${
                  elementIconPred
                  }@2x.png`;
                  console.log(tempPred)
                  console.log(descriptionPred)
                  console.log(iconPred)
                  
                        console.log("ok midi")
                            const containt3 = document.getElementById("containt3")
                            containt3.innerHTML += `
                            <section class="middle-banner">
                                <div class="main2">
                                <p>${dateHour}</p>
                                    <div class = recap>
                                        <h2>Météo <br><span class="city"> ${cityName} </span> </h2>
                                        <div class="card">
                                            <div class="icon">
                                            <img src=${iconPred}>
                                            </div>
                                    </div> 
                                </div>
                        <div class="meteo">
                        <p><span class="temp"> ${tempPred} °C </span> ${descriptionPred}</p>
                        </div>
                            
                            </div>
                        </section>
                            `
                  
                  })
                }
              }
            
  })

})