$('.toReply').click(function(e) {
    var cid = $(this).data('cid');
    var tid = $(this).data('tid');
    if ($('#toId').length > 0) {
        $('#toId').val(tid);
    } else {
        $('<input>').attr({
            type: 'hidden',
            id: 'toId',
            name: 'comment[tid]',
            value: tid
        }).appendTo($('#comments'));
    }
    
    if ($('#commentId').length > 0) {
    } else {
        $('<input>').attr({
            type: 'hidden',
            id: 'commentId',
            name: 'comment[cid]',
            value: cid
        }).appendTo('#comments');
    }

    $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top + "px"
      }, {
        duration: 500,
        easing: "swing"
      });
      return false;
      
})