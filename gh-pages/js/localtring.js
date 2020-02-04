function priceWithDelim() {
    $('#price').text((+this.value).toLocaleString());
};

$('.model')
    .change(priceWithDelim)
    .change();