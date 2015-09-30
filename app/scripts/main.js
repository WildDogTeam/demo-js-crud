var TR=$("<tr><td><input type='checkbox'></td><td class='td-uname'></td><td class='td-email'></td></tr>");
var TREdit=$("<tr><td><input type='checkbox' disabled='disabled'></td><td><input></td><td><input></td></tr>");

var ref=new Wilddog("https://crud.wilddogio.com/demo-crud/users");

$("#btn-user-add").click(function(){
	//add user
	var username=$("#input-username").val();
	var email=$("#input-email").val();
	ref.push({"email":email,"username":username});

})
$("#btn-user-delete").click(function(e){
	//delete user
	$("input:checked").each(function(index,el){
		var id=$(el).attr("id");
		ref.child(id).remove()
	})
})

$("table").click('td.td-uname',function(e){
//editable
	var value=$(e.target).text();
	var input=$("<input >").val(value);
	var id=$(e.target).parents("tr").eq(0).find("input[type=checkbox]").attr("id");
	input.focusout(function(){
		var newValue=input.val();
		ref.child(id).update({"username":newValue});
	})
	$(e.target).html(input);
})
ref.on('child_added',function(snap){
	var email=snap.val().email;
	var username=snap.val().username;
	var id=snap.key();
	var tr=TR.clone();
	tr.find("td").eq(1).text(username);
	tr.find("td").eq(2).text(email);
	tr.find("input").eq(0).attr("id",id);
	$("#all-user-table").append(tr);
});
ref.on('child_changed',function(snap){
	var id=snap.key();
	var email=snap.val().email;
	var username=snap.val().username;
	var tr=$("#"+id).parents("tr").eq(0);
	tr.remove();
	var newTr=TR.clone();
	console.log(newTr)
	newTr.find("td").eq(1).text(username);
	newTr.find("td").eq(2).text(email);
	newTr.find("input").eq(0).attr("id",id);
	$("table").append(newTr);

})

ref.on('child_removed',function(snap){
	var id=snap.key();
	console.log("#"+id)
	var tr=$("#"+id).parents("tr");
	tr.remove();
})
