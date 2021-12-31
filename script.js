$("document").ready(function () {

    // declare variables
    let quoteText = $(".quote_text");
    let quoteTextContainer = $(".quote_text_container");
    let quoteOverlayImage = $(".overlay_image");
    let quoteLoader = $(".quote_loading_animation")
    let socialShareBtn = $(".share_btn");
    let generateQuoteBtn = $(".generate_quote");
    let generateDesignBtn = $(".generate_design");
    let generateImageBtn = $(".generate_image");
    let shareContainer = $(".social_share_container")
    let closeText = $(".close_btns") ;
    let loginContainer = $(".login_form_overlay")
    let email = $("#email") ;
    let pass = $("#pass") ;
    let submit = $(".submit") ;


    // check if theres a value in local storage or not

    if(localStorage.getItem("email") && localStorage.getItem("password")){
        $(loginContainer).hide()
    }else {
        $(loginContainer).css("display","flex")
    }





    // get quotes from ajax
    let getQuote = () => {
        $.get("quotes.json", function (data) {
            $(quoteText).show()
            $(quoteLoader).css("display", "none")
            let randomNumber = Math.floor(Math.random() * data.length);
            $(quoteText).html(data[randomNumber])
        })
    }

    // generate quote btn click event
    $(generateQuoteBtn).click(function () {
        $(quoteText).hide()
        $(quoteLoader).css("display", "flex")
        setTimeout(getQuote, 1000)
    })

    // generate design btn click event
    $(generateDesignBtn).click(function () {
        $.get("colors.json", function (color) {
            let randomNumber = Math.floor(Math.random() * color.length)
            $(quoteTextContainer).css("background", `rgba(${color[randomNumber]})`)

        })
    })

    // generate image btn click event 
    $(generateImageBtn).click(function () {

        $.get("images.json", function (image) {
            let randomImage = Math.floor(Math.random() * image.length)
            $(quoteOverlayImage).attr("src", image[randomImage])
        })

    })

    // social share btn click event
    $(socialShareBtn).click(function () {

        $(shareContainer).css("display", "block")
    })

    // close text click event
    $(closeText).click(function () {
        $(shareContainer).hide()
    })


    // login form logic sit here
    $(email).keyup(e => {
        localStorage.setItem("email", $(e.target).val())
    })
    $(pass).keyup(e => {
        localStorage.setItem("password", $(e.target).val())
    })

    $(submit).click(() => {
        if($(email).val() == "" || $(pass).val() == "") {
            alert("please enter email or password")
            return false
        }else {

            $(loginContainer).hide()
        }
    })
})