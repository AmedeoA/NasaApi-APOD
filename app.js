
document.getElementById("fetchButton").addEventListener("click", fetchAPOD);
document.getElementById("apod-date").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        fetchAPOD();
    }
});

window.onload = function() {
    document.getElementById("apod-date").value = ""; 
};
 
function fetchAPOD() {
    const selectedDate = document.getElementById("apod-date").value;
    
    if (!selectedDate) {
        alert("Please select a valid date.");
        return;
    }



    const apiKey = 'XHCiZBgebTQL2PcKmKVHbP6hKqUdRpDGrSgvcWh2';
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Select other date");
            }
            return response.json();
        })
        .then(data => displayAPOD(data))
        .catch(error => {
            document.getElementById("apod-content").innerHTML = `<p class="error">${error.message}</p>`;
        })
        .finally(() => {
         
        });
}


function displayAPOD(data) {
    const { title, explanation, date, media_type, url } = data;
    let mediaElement = "";

    if (media_type === "image") {
        mediaElement = `<img src="${url}" alt="${title}" class="apod-image">`;
    } else if (media_type === "video") {
        mediaElement = `  <h2>Watch the video &#128640 </h2>
            <iframe src="${url}" frameborder="0" allowfullscreen class="apod-video-iframe"></iframe>
          
        `;
    } 

    document.getElementById("apod-content").innerHTML = `
        <div class="apod-wrapper">
            <div class="apod-text">
                <p>Title: ${title}</p>
                <p>Explanation: ${explanation}</p>
              
            </div>
            <div class="apod-media">
                ${mediaElement}
            </div>
        </div>
    `;
}
