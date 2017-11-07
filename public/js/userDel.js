$(function() {
    $('.userdel').click(function(e) {
        if (confirm('确定删除该用户？')) {
            var id = $(e.target).data('id');
            var tr = $('.item-id-'+id);
    
            $.ajax({
                type: 'delete',
                url: '/admin/userDel?id='+id,
                success: function(data){
                    if (data.success == 1) {
                        tr.remove();
                    }
                }
            })
        }
    })
})