$(function() {
    $('.del').click(function(e) {
        if (confirm('确定删除本条记录?')) {
            var id = $(e.target).data('id');
            var tr = $('.item-id-' + id);
            var url;

            if ($(this).attr('class').indexOf('movie') > -1 ) {
                url= '/admin/movie/list?id='+id;
            } else if($(this).attr('class').indexOf('user') > -1) {
                url= '/user/del?id='+id;
            } else if($(this).attr('class').indexOf('catetory') > -1) {
                url= '/admin/catetory/del?id='+id;
            }

            $.ajax({
                type: 'delete',
                url: url,
                success: function(data){
                    if (data.success === 1) {
                        if (tr.length > 0) {
                            tr.remove();
                        }
                    }
                }
            })
        }
    })
})