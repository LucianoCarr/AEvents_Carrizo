const details = document.querySelector('event')
const past_filter = document.querySelector("past")
const upcoming_filter = document.querySelector("upcoming")


function details(card, event){
    for (i= 0; i< array.length; i++){
        document.getElementById(id).innerHTML+=`$
    <div class="card">
        <img src="${array[i].image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to
                additional content. This content is a little bit longer.</p>
            <div class="card-button">
                <p>Price $10000</p>
                <a href="./details.html" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>

    `;
    }
}