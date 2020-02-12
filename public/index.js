// products ajax loading
window.addEventListener('load', function() {
    var bt = document.getElementById('ajax-btn');
    bt.addEventListener('click', function() {
        var content = document.getElementById('content');

        var req = new XMLHttpRequest();
        req.open('post', '/getroductfromrange', true);

        var form = new FormData();
        var from = document.getElementById('ajax-from');
        form.append('from', from.value);
        var to = document.getElementById('ajax-to');
        form.append('to', to.value);

        req.send(form);
        req.onreadystatechange = function() {
            if (req.readyState == XMLHttpRequest.DONE) {
                var response = JSON.parse(req.responseText.toString());
                var productsrow = document.getElementById("products-row");
                response.results.forEach(r => {
                    template = `<div class="product">
                                    <div class="product-title">
                                        <a href="/product/${ r.id }">
                                            ${ r.name }
                                        </a>
                                    </div>
                                    <div class="product-img">
                                        <a href="/product/${ r.id }"><img src="${ r.image }"></a>
                                    </div>
                                    <div class="product-price">
                                        <b>Cena: ${ r.price } zł.</b>
                                    </div>
                                    <div class="product-desc">
                                        <p>
                                            ${ r.description }
                                        </p>
                                    </div>
                                    <div class="product-cart">
                                        <a href="/add-to-cart/${ r.id }"><img src="https://hepatica.pl/wp-content/themes/maksymilian-org/img/koszyk.png" alt="Koszyk">Dodaj do koszyka</a>
                                    </div>
                                </div>`;

                    var colsm2 = document.createElement("div");
                    colsm2.setAttribute('class', 'col-sm-2');
                    colsm2.innerHTML = template;
                    productsrow.appendChild(colsm2);
                });
                from.value = Number(to.value) + 1;
                to.value = Number(to.value) + 6;
                if (response.all) bt.style.visibility = "hidden";
                // TODO: add some pretty disappearing animation
            }
        }
    });
});