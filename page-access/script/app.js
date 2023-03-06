(function($) {

    // On récupère le texte du span dans la panier pour le modifier après (++ ou --)
    var $shoppingcart_number_val = $('#number').val();
    var $shoppingcart_number_txt = $('#number');

    // Ajout d'un item dans le panier
    var add_item_into_shoppingcart = function () {
        
        // Tous les boutons
        var $product_btn = $('.product-btn');

        // Pour un bouton
        $product_btn.each( function () {

            $(this).on('click', function (e) {
                e.preventDefault();
                
                // On récupère la data-shop (nom + prix) du parent du voyage sélectionné
                var dataShop = $(this).parents('.product-item').attr('data-shop');

                // On récupère l'id du bouton
                var data_id_parent = $(this).parents('.product-item').attr('id');
                
                // On ajoute l'item du voyage dans le panier avec son nom et son prix 
                $('#shoppingcart-list').append('\
                    <div class="shoppingcart-item">\
                        <span class="shoppingcart-txt">'+dataShop+'</span>\
                        <a href="#" class="shoppingcart-btn" data-id-parent="'+data_id_parent+'"><span class="sr-only">Supprimer</span></a>\
                    </div>\
                ');
    
                // On change (incrément) le nombre d'item dans le panier
                $shoppingcart_number_val++;
                $shoppingcart_number_txt.text($shoppingcart_number_val);

                if ($shoppingcart_number_val >= 1) {
                    $('.shoppingcart-valided').removeAttr('aria-hidden');
                }

                if ($shoppingcart_number_val >= 2) {
                    $('#shoppingcart-product').text('voyages');
                }
            });

        });
    }

    // Suppression d'un item dans le panier
    var remove_item_into_shoppingcart = function () {

        var $target_1 = $('[data-id-parent="product-item-1"]');
        var $target_2 = $('[data-id-parent="product-item-2"]');
        var $target_3 = $('[data-id-parent="product-item-3"]');

        // Au clic, on supprime l'item parent du panier
        // cf : https://grafikart.fr/tutoriels/jquery-on-events-518
        $('#shoppingcart-list').on('click', '.shoppingcart-btn', function (e) {
            e.preventDefault();
            $(this).parent().remove();

            // On change (désincrément) le nombre d'item dans le panier
            $shoppingcart_number_val--;
            $shoppingcart_number_txt.text($shoppingcart_number_val);

            if ($shoppingcart_number_val <= 1) {
                $('#shoppingcart-product').text('voyage');
            }

            if ($shoppingcart_number_val == 0) {
                $('.shoppingcart-valided').attr('aria-hidden', 'true');
            }
        });
    }

    // init all function
    add_item_into_shoppingcart();
    remove_item_into_shoppingcart();

}(jQuery));