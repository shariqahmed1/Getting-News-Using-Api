// var api = "https://newsapi.org/v1/sources";
var apiKey = "d5a973a7b71d479f9baa1a125e0ef312";
const main = document.querySelector("#news");
const selector = document.querySelector("#select");
const defineDefault = "techcrunch";

window.addEventListener('load' , async e=>{
    updatedNews();
    await updateSources();
    selector.value = defineDefault;
    selector.addEventListener('change' , e=>{
        updatedNews(e.target.value);
    });

    if('serviceWorker' in navigator){
        try{
            navigator.serviceWorker.register('../serviceworker.js');
            console.log('Service Worker is registered');
        }
        catch(error){
            console.log(error);
        }
    }

});

async function updateSources() {
    const res = await fetch(`https://newsapi.org/v1/sources`);
    const json = await res.json();
    // console.log(json);
    selector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
}

async function updatedNews(source = defineDefault) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
    const json = await res.json();
    // console.log(json);
    main.innerHTML = json.articles.map(createArticles).join('\n\n');
}

function createArticles(article){
    let text = "";
    // Short if
    article.author === null ?  text =  "" : text = article.author;
    return `
        <div class="card">
            <div class="card-header">
                <img class="card-img-top img-responsive" src="${article.urlToImage}" style="width:100%;" alt="">
            </div>
            <div class="card-header">
                <h4 class="card-title">${article.title}</h4>
            </div>
            <div class="card-header">
                <span class="card-title">${article.publishedAt}</span>
                <span class="card-title float-right"><b>${text}</b></span>
            </div>
            <div class="card-body">
                <p class="quote"><q>${article.description}</q></p>   
            </div>
        </div>
        <hr class="hr">
    `;
}