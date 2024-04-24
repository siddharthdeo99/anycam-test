function extractVideoIdFromUrl(url) {
    // Convert %2B to +
    url = url.replace(/%2B/g, '+');
    // Extract the video ID from the URL
    var videoId = url.split('/').pop();
    return videoId;
}

function generateHTMLCode() {
    var streamingUrl = document.getElementById("streamingUrl").value;
    var videoId = extractVideoIdFromUrl(streamingUrl);

    // Generate the HTML code
    var htmlCode = `
        <div class="mistvideo" id="${videoId}_element">
            <noscript>
                <a href="https://hub.anycam.io/${videoId}.html" target="_blank">
                    Click here to play this video
                </a>
            </noscript>
            <script>
                var a = function(){
                    mistPlay("${videoId}", {
                        target: document.getElementById("${videoId}_element")
                    });
                };
                
                if (!window.mistplayers) {
                    var p = document.createElement("script");
                    if (location.protocol == "https:") { 
                        p.src = "https://hub.anycam.io:443/player.js";
                    } else { 
                        p.src = "http://hub.anycam.io:80/player.js";
                    }
                    document.head.appendChild(p);
                    p.onload = a;
                } else { 
                    a(); 
                }
            </script>
        </div>
    `;

    document.getElementById("generatedCode").innerText = htmlCode;
}

// Add event listener to form submission
document.getElementById("urlForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting
    generateHTMLCode(); // Call generateHTMLCode function
});
