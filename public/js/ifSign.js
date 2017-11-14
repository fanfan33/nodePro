$(function () {
    $('.signup').click(function () {
        console.log('clicked')
        $.ajax({
                type: 'POST',
                url: '/user/signup',
                dataType: 'json'
            })
            .done(function (data) {
                console.log(data);
                if (data.ifSigned == 'ture') {
                    alert('该用户已注册!');
                }
            })
    })

})