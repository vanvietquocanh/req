jQuery(document).ready(function($) {
	$("#form-add").submit(function(event) {
		event.preventDefault();
		var data = {
			ip   : $("#ipProxy").val(),
			port : $("#port").val(),
			geo  : $("#country").val()
		}
		$.post('/add-proxy', data, function(datares, textStatus, xhr) {
			if(datares==="success"){
				var htmlR = `<tr>
				                <th scope="row">${$("tr").length-2}</th>
				                <td>${data.ip}</td>
				                <td>${data.port}</td>
				                <td>${data.geo}</td>
				                <td><i class="fas fa-trash text-danger disabled-btn"></i></td>
				            </tr>`
				$("tbody").append(htmlR)
			}else{
				alert(datares)
			}
		});
	});
	$(".fas.fa-trash").click(function(event) {
		var data = {
			id: $(this).attr("class").split(" ")[2],
			geo:$(this).parent().parent().children(':last').prev().text()
		}
		$.post('/remove-proxy', data,(data, textStatus, xhr)=>{
			if(data==="success"){
				$(this).parent().parent().remove()
			}
		});
	});
});		