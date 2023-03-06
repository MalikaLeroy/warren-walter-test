(function ($) {
    // On récupère le texte du span dans la panier pour le modifier après (++ ou --)
    var $shoppingcart_number_val = $('#number').val();
    var $shoppingcart_number_txt = $('#number');


    // Ajout d'un item dans le panier
    var add_item_into_shoppingcart = function () {
        // Tous les boutons
        var $product_btn = $('.product-btn');

        // Pour un bouton
        $product_btn.each(function () {

            $(this).on('click', function (e) {
                e.preventDefault();
                // On récupère la data-shop (nom + prix) du parent du voyage sélectionné
                var dataShop = $(this).parents('.product-item').attr('data-shop');

                // On récupère l'id du bouton
                var data_id_parent = $(this).parents('.product-item').attr('id');

                // On change (incrément) le nombre d'item dans le panier
                $shoppingcart_number_val++;
                $shoppingcart_number_txt.text($shoppingcart_number_val);
                if ($shoppingcart_number_val == 1) {
                    $("<ul class='shoppingcart-list' id='shoppingcart-list'/>").insertAfter("#shoppingcart-item-number");
                    remove_item_into_shoppingcart();
                }
                if ($shoppingcart_number_val >= 1) {
                    $('.shoppingcart-valided').removeAttr('aria-hidden');
                }

                if ($shoppingcart_number_val >= 2) {
                    $('#shoppingcart-product').text('voyages');
                }

                // On ajoute l'item du voyage dans le panier avec son nom et son prix 
                $('#shoppingcart-list').append('\
                <li class="shoppingcart-item">\
                    <span class="shoppingcart-txt">'+ dataShop + '</span>\
                    <button aria-label="Supprimer ce voyage du panier" type="button" class="shoppingcart-btn" data-id-parent="'+ data_id_parent + '"/>\
                </li>\
            ');
                // ajouter une alert confirmant l'ajout au panier
                console.log(this.id)
                $("#card-alertbox-" + (this.id)).attr("aria-hidden", "false").html("<span class='icon icon-valid' aria-hidden='true'></span>Ajouté au panier !");
                setTimeout(() => {
                    $("#card-alertbox-" + (this.id)).attr("aria-hidden", "true").html("");
                }, 3000)

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
            if ($shoppingcart_number_val == 0) {
                $('.shoppingcart-valided').attr('aria-hidden', 'true');
                $('#shoppingcart-list').remove();
            }

            if ($shoppingcart_number_val <= 1) {
                $('#shoppingcart-product').text('voyage');
            }


        });
    }


    // init all function
    add_item_into_shoppingcart();
    remove_item_into_shoppingcart();

    // Ajout ou suppression d'un aria-current au clique sur un des liens du menu
    const navLinks = $('.header-nav-link');
    navLinks.click(function () {
        navLinks.removeAttr('aria-current');
        $(this).attr('aria-current', 'page');
    });

    // Ajouter un écouteur d'événement pour le scroll de la page pour modifier l'aria-current du menu
    $(window).scroll(function () {
        const scrollTop = $(window).scrollTop();
        $('section').each(function () {
            const sectionTop = $(this).offset().top;
            if (sectionTop <= scrollTop && sectionTop + $(this).height() > scrollTop) {
                const activeLink = $(`.header-nav-link[href="#${$(this).attr('id')}"]`);
                navLinks.removeAttr('aria-current');
                if (activeLink.length) {
                    activeLink.attr('aria-current', 'page');
                }
            }
        });
    });

}(jQuery));

function check_input_pattern(el, event) {
    $("#contactForm input[type='submit']").removeAttr("class")
    $("#global-alertbox").attr("aria-hidden", "true").html("");
    if (event == "submit") {
        var current = el
    } else {
        var current = el.currentTarget
    }
    // Vérification de la validité du champ
    if (!current.value.match(current.pattern)) {
        // Affichage du message d'erreur et changement de l'aria-hidden
        $("#" + current.id + "-alertbox").attr("aria-hidden", "false").html("<span class='icon icon-warning' aria-hidden='true'></span>" + $(current).data("error"));
        // Ajout de la classe "erreur" au champ
        $(current).addClass("form-error");
        // Renvoi de la valeur false pour indiquer que la validation a échoué
        $(current).attr("aria-invalid", "true");
        // J'ajoute l'attr d'accessibilité aria-invalid
        return false;
    } else {
        // Effacement du message d'erreur et changement de l'aria-hidden
        $("#" + current.id + "-alertbox").attr("aria-hidden", "true").html("");
        // Suppression de la classe "erreur" du champ
        $(current).removeClass("form-error");
        // Renvoi de la valeur true pour indiquer que la validation a réussi
        $(current).removeAttr("aria-invalid");
        // Je supprime l'attr d'accessibilité aria-invalid
        return true;
    }

}
function check_input_radio() {
    $("#contactForm input[type='submit']").removeAttr("class")
    $("#global-alertbox").attr("aria-hidden", "true").html("");
    var radioButton = $("input[name='gender']")
    var radioIsValid = $("input[name='gender']").is(":checked");
    if (radioIsValid == false) {
        radioButton.addClass("form-error").attr("aria-invalid", "true");
        $("#gender-alertbox").attr("aria-hidden", "false").html("<span class='icon icon-warning' aria-hidden='true'></span> Veuillez choisir votre civilité, ce champ est obligatoire.");
        return false;
    } else {
        radioButton.removeClass("form-error").removeAttr("aria-invalid");
        $("#gender-alertbox").attr("aria-hidden", "true").html("");
        return true;
    }
}
$("input[name='gender']").each(function () {
    $(this).on("click", function (e) {
        check_input_radio()
    });
});
$("#contactForm input:not([type=radio])").each(function () {
    $(this).on("input", function (e) {
        check_input_pattern(e, "onInput")
    });
});
$("#contactForm input:not([type=radio])").each(function () {
    $(this).on("input", function (e) {
        check_input_pattern(e, "onInput")
    });
});
$("#contactForm").on("submit", function (e) {
    e.preventDefault();
    check_input_radio()
    var inputStatus = true
    $("#contactForm input:not([type=radio])").each(function (e) {
        check_input_pattern(this, "submit")
        if (check_input_pattern(this, "submit") == false) {
            inputStatus = false
        }
    });
    if (inputStatus == false || check_input_radio() == false) {
        $("#contactForm input[type='submit']").addClass("error")
        $("#global-alertbox").attr("aria-hidden", "false").html("<span class='icon icon-warning' aria-hidden='true'></span> Un des champs obligatoires n'a pas été correctement renseigné").removeClass("form-valid").addClass("form-error");
    } else {
        $("#contactForm input[type='submit']").addClass("valid")
        $("#global-alertbox").attr("aria-hidden", "false").html("<span class='icon icon-valid' aria-hidden='true'></span>Votre demande de contact a bien été prise en compte. Nous vous répondrons dans les plus brefs délais.").removeClass("form-error").addClass("form-valid");
    }
});
