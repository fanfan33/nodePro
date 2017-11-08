$(function() {
    $('.del').click(function(e) {
        if (confirm('确定删除本条记录?')) {
            console.log('click')
            var id = $(e.target).data('id');
            var tr = $('.item-id-' + id);
    
            $.ajax({
                type: 'delete',
                url: '/admin/movie/list?id='+id
            })
            .done(function(results) {
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove();
                    }
                }
            })
        }
    })
})