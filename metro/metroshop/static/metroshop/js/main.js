var  k =0;
function getXMLHttp()

{

if (typeof XMLHttpRequest != "undefined"){

            xmlHttp= new XMLHttpRequest();

        }

        else if (window.ActiveXObject){

            xmlHttp= new ActiveXObject("Microsoft.XMLHTTP");

        }

        if (xmlHttp==null){

            alert("Browser does not support XMLHTTP Request")

            return;

        }            

}


function add_row()
{
      //alert("Selected value is : " + document.getElementById("changeArea").value);
      k++;
      var locationValue =  $("#txtSearch").val();
      var quantity =  $("#quantity").val();
      var subtotal =  $("#subtotal").val();
      alert(locationValue);
      $.ajax({
        type: "GET",
        url:"/ajax_calls/product_bill/?p_name="+locationValue,
        dataType: "json",
        async: false,
        success: function (data) {
          console.log("fff");
          console.log(data);
            var locArr = [];
            locArr = data[0];
		  console.log(locArr);
		  var qqty=parseFloat($("#quantity1").val());
        //$("#add_data").append("<tr><td>"+data[0]+"</td><td>"+data[1]+"</td><td>"+data[2]+"</td></tr>");
        $("#add_data").append("<tr> <td>"+k+"<input type='hidden' name='product_des[]' readonly='' value='"+data[0]+"'><input type='hidden' id='prod_display1' name='prod_display[]' value='"+data[1]+"' readonly=''><input type='hidden' id='prod_ids2' name='prod_ids2' value='"+data[0]+"' readonly=''><input type='hidden' id='prod_id' name='prod_ids[]' value='"+data[0]+"' readonly=''><input type='hidden' readonly='' name='quotation_no[]' value=''><input type='hidden' style='border:none;background:none;' name='product_price[]' onkeyup='getTotal();' value='"+$("#unit_price").val()+"' size='5' /><input type='hidden' style='border:none;background:none;' readonly='yes' name='product_subtotal[]'  value='"+$("#subtotal").val()+"' size='5' /><input type='hidden' style='border:none;background:none;' readonly='yes' name='unitprice'  value='"+$("#unit_price").val()+"' size='5' /><input type='hidden' style='border:none;background:none;' readonly='yes' name='product_subtotal2'  value='"+$("#subtotal").val()+"' size='5' /><input type='hidden' name='product_qty1[]' value='"+qqty+"' readonly='yes'  /><input type='text' style='border:none;background:none;' name='product_qty[]' value='"+$("#quantity").val()+"'  onkeyup='getTotal();' size='5' /><input type='hidden'  name='quantity2' value='"+$("#quantity").val()+"'  onkeyup='getTotal();' size='5' /><input type='hidden' style='border:none;background:none;' name='product_disct[]' onkeyup='getTotal();' value='0'  /></td> <td>"+data[1]+"</td><td>"+data[3]+"</td><td>"+quantity+"</td><td>"+data[2]+"</td><td>"+subtotal+"</td></tr>");
        getTotal();
            /*$(_this).find("option[value='DEFAULT']").attr("selected","selected");
            var emptyOption="<option value="+''+">Please Select location</option>";
            $('#location').find('option[value]').remove();
            $.each(locArr,function(i,obj)
            {
             var div_data = i === 0 ? emptyOption+"<option value="+obj.Value+">"+obj.Text+"</option>" : "<option value="+obj.Value+">"+obj.Text+"</option>";
             $(div_data).appendTo('#location'); 
            });  
            */
            }
      });


}
function getBatchNo(p)

{

 if(p!='')

 {

	getXMLHttp();

	xmlHttp.onreadystatechange = get_Productcode;

	var cid=$('#customer_id').val();

	//var url="getProductPrice.php?pcode="+p+"&cid="+cid;    

	        

	var url="/ajax_calls/product_bill_id/?p_id="+p;

	xmlHttp.open("GET", url, true);

	xmlHttp.send(null);

	function get_Productcode()

	{

		if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")

		{

			var restxt=xmlHttp.responseText;

      /*prod=restxt.split("#///#"); */
      prod=restxt.split(',')
      prod = JSON.parse(xmlHttp.responseText);
      console.log(prod.length);
      console.log(prod[0]);
      
     

			if(prod[2]>0)

			{

			document.getElementById("unit_price").value=prod[2];
      document.getElementById("product_id_display").value=prod[0];

			document.getElementById("prod_display_name").value=prod[1];


			document.getElementById("prod_id").value=prod[0];

			document.getElementById("tax_value").value=prod[3];

			document.getElementById("quantity").value=1;

			getUnitTotal();

			}

		}

	}

 }

	 else

 {

 document.getElementById("unit_price").value='';


 document.getElementById("product_id_display").value='';

 document.getElementById("prod_display_name").value='';

 document.getElementById("prod_id").value='';

 document.getElementById("tax_value").value='';

 

  document.getElementById("subtotal").value='';

  document.getElementById("quantity").value=1;


 }

}
function getUnitTotal()

{

  var qty=0.00;

  var qtty=0.00;

  var qty2=0;

  var uprice=0.00;

  var tot=0.00;

  var tax_price=0.00;

  var batchno=document.getElementsByName('batchno[]');

  var pqty=document.getElementsByName('product_qty[]');

  qtty=document.getElementById('quantity1').value;

  qty=document.getElementById('quantity').value;

  tax_price=document.getElementById('tax_value').value;

  reorder=document.getElementById('reorder_level').value;

  if(parseFloat(qty)>parseFloat(qtty))

  {	

    ShowAlert('Quantity given is greater than the Quantity Delivered');

    document.getElementById('quantity').value=parseFloat(qtty);

    $("#subtotal").val('');

    getUnitTotal();

  }

  else

  {

    uprice=document.getElementById('unit_price').value;

    if(!isNaN(qty) && !isNaN(uprice))

    {

      tot=parseFloat(qty) * parseFloat(uprice);

      $("#subtotal").val(tot.toFixed(2));

    }

    else

    {

      document.getElementById('quantity').value=0;

    }

  }

  /*if(parseFloat(reorder) > parseFloat(qtty))

  {

    ShowAlert('Product Stock is too Low reorder the product');

  }*/

}

function getTotal()

						{

							var qty=0.00;

							var uprice=0.00;

							var disct=0.00;

							var tot=0.00;

							var product_qty_rec=document.getElementsByName('product_qty[]');

							var product_prc=document.getElementsByName('product_price[]');

							var product_dct=document.getElementsByName('product_disct[]');

							var product_subtot=document.getElementsByName('product_subtotal[]');

							var prod_qty_rec1=document.getElementsByName('product_qty1[]');

							

							//alert(product_qty_rec.length);

							for(var i=0;i<product_qty_rec.length;i++)

							{	

								if(parseFloat(prod_qty_rec1[i].value) < parseFloat(product_qty_rec[i].value))

								{

									ShowAlert('Quantity is greater than Quantity received!');

									product_qty_rec[i].value=prod_qty_rec1[i].value;

								}

								qty=product_qty_rec[i].value;

								disct=product_dct[i].value;

								uprice=product_prc[i].value;

								if(!isNaN(qty) && !isNaN(uprice))

								{

									tot=(parseFloat(qty) * parseFloat(uprice)-(parseFloat(qty) * parseFloat(uprice) * parseFloat(disct))/100 );

									//tot1=parseFloat(tot);

									product_subtot[i].value=tot.toFixed(2);

									//getGrandtotal();

								}										

							}	

							getSubtotal();

                        }
                    	function getSubtotal()

						{

							var subtotal=0.00;

							var product_subtotal=document.getElementsByName('product_subtotal[]');

							

							for(var i=0;i<product_subtotal.length;i++)

							{

								var psb=product_subtotal[i].value;	

								if(!isNaN(psb))										

								subtotal=subtotal+parseFloat(psb);

							}

							$("#divTotal").val(subtotal.toFixed(2));

							getGrandtotal();

						}

						function getUnitTotal()

						{

							var qty=0.00;

							var qtty=0.00;

							var qty2=0;

							var uprice=0.00;

							var tot=0.00;

							var tax_price=0.00;

							var batchno=document.getElementsByName('batchno[]');

							var pqty=document.getElementsByName('product_qty[]');

							qtty=document.getElementById('quantity1').value;

							qty=document.getElementById('quantity').value;

							tax_price=document.getElementById('tax_value').value;

							reorder=document.getElementById('reorder_level').value;

							if(parseFloat(qty)>parseFloat(qtty))

							{	

								ShowAlert('Quantity given is greater than the Quantity Delivered');

								document.getElementById('quantity').value=parseFloat(qtty);

								$("#subtotal").val('');

								getUnitTotal();

							}

							else

							{

								uprice=document.getElementById('unit_price').value;

								if(!isNaN(qty) && !isNaN(uprice))

								{

									tot=parseFloat(qty) * parseFloat(uprice);

									$("#subtotal").val(tot.toFixed(2));

								}

								else

								{

									document.getElementById('quantity').value=0;

								}

							}

							/*if(parseFloat(reorder) > parseFloat(qtty))

							{

								ShowAlert('Product Stock is too Low reorder the product');

							}*/

						}

						function getTotal()

						{

							var qty=0.00;

							var uprice=0.00;

							var disct=0.00;

							var tot=0.00;

							var product_qty_rec=document.getElementsByName('product_qty[]');

							var product_prc=document.getElementsByName('product_price[]');

							var product_dct=document.getElementsByName('product_disct[]');

							var product_subtot=document.getElementsByName('product_subtotal[]');

							var prod_qty_rec1=document.getElementsByName('product_qty1[]');

						
							//alert(product_qty_rec.length);
							console.log("nnnnn");
							console.log(product_qty_rec.length);
							console.log("vvvv");

							for(var i=0;i<product_qty_rec.length;i++)

							{	

							
								//if(parseFloat(prod_qty_rec1[i].value) < parseFloat(product_qty_rec[i].value))

								//{

									//ShowAlert('Quantity is greater than Quantity received!');

									//product_qty_rec[i].value=prod_qty_rec1[i].value;

								//}

								qty=product_qty_rec[i].value;
								console.log("nnnnn");
								console.log(product_dct[i].value);
								console.log("vvvv");
								disct=product_dct[i].value;

								uprice=product_prc[i].value;

								if(!isNaN(qty) && !isNaN(uprice))

								{

									tot=(parseFloat(qty) * parseFloat(uprice)-(parseFloat(qty) * parseFloat(uprice) * parseFloat(disct))/100 );

									//tot1=parseFloat(tot);

									product_subtot[i].value=tot.toFixed(2);

									//getGrandtotal();

								}										

							}	

							getSubtotal();

                        }

						function getGrandtotal()

						{

						   

							var totall=0.00;

							var freichar=0.00;

							var packchar=0.00;

							var taxpercent=0.00;

							var gtotal=0.00;

							var packchargetype=0.00;

							

							var dispercent=0.00; if($("#discount_percent").val().trim()!='')

							var disrate=0.00; //disrate=$("#discount_rs").val();	

							

							totall=$("#divTotal").val(); //sub total field

							

							packchar = 0;
0

							taxpercent=0;

							$("#tax_rs").val(parseFloat(( parseFloat(taxpercent) * (parseFloat(totall) + parseFloat(packchar)))/100).toFixed(2));

							taxrate=$("#tax_rs").val();

							

							if(($("#discount_percent").val().trim()!='')&&($("#discount_percent").val().trim()!='0'))

							{

							 //alert("fff"+$("#discount_percent").val().trim());

								dispercent=$("#discount_percent").val();

								$("#discount_rs").val(parseFloat(( parseFloat(dispercent)* parseFloat(totall) )/100).toFixed(2));

								dis_Total = $("#discount_rs").val();

							}

							var sub_total_rs = parseFloat(totall) + parseFloat(packchar) + parseFloat(taxrate);

							

							if($("#discount_rs").val().trim()!='')

							{

								disrate=$("#discount_rs").val();

							}

							

							if($("#freight").val().trim()!='')

							freichar=$("#freight").val();

							

							var packpertotal = (parseFloat(totall) * parseFloat(packchar)) / 100;

							if(packchargetype=='%')

							{ 

								if($("#discount_rs").val().trim()!='')	{ dis_Amount = parseFloat(disrate); }

								else { dis_Amount = parseFloat(0); }

								gtotal = parseFloat(totall) + parseFloat(packpertotal) + parseFloat(taxrate) + parseFloat(freichar) - parseFloat(dis_Amount); 

							}

							else if(packchargetype=='Rs')

							{ 

								if($("#discount_rs").val().trim()!='')	{ dis_Amount = parseFloat(disrate); }

								else { dis_Amount = parseFloat(0); }

								gtotal = parseFloat(totall) + parseFloat(packchar) + parseFloat(taxrate) + parseFloat(freichar) - parseFloat(dis_Amount);

							}

							else if($("#discount_rs").val().trim()!='')

							{ 

								gtotal = parseFloat(totall) + parseFloat(taxrate) + parseFloat(freichar) - parseFloat(disrate); 

							}

							else

							{

								gtotal = parseFloat(totall) + parseFloat(taxrate) + parseFloat(freichar); 

							}

							var gtotal1=parseFloat(gtotal).toFixed(0);

							$("#divGrandtotal").val(parseFloat(gtotal1).toFixed(2));										
                           console.log("fffffddddd"+gtotal1);
							Amount_Words(gtotal1.toFixed(2),'w');

						}
						function change_type(val)

						{
						
							if(val=='%') $('#dis_pers').show();
						
							else $('#dis_pers').hide(); $('#discount_rs').val('');$('#discount_percent').val('');
						
						}
						function Amount_Words(a,t)

						{
						
							getXMLHttp();
						
							xmlHttp.onreadystatechange = amountWords;
						
							var url="Numbertowords.php?amt="+a+"&t="+t;   
						
							xmlHttp.open("GET", url, true);
						
							xmlHttp.send(null);
						
							
						
							function amountWords()
						
							{
						
								if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){
						
								var restxt=xmlHttp.responseText;
						
								$("#inwords").html(restxt);
						
								}
						
							}
						
						}  
						function homepage()

{

	window.location.href="/";

}
function formsubmit()

{

	var net_amt=$('#divGrandtotal').val();

	if(net_amt!='' && net_amt>0)

	{	

		var save=confirm("Do you want to Submit?");

		if(save)

		{

			document.getElementById('purchase').submit();

		}

	}

	else

	{

		alert("Please Enter Product..");

	}

}
  $(document).ready(function(){ 

 
  $("#txtSearch").autocomplete({
          source: "/ajax_calls/search/",
          minLength: 2,
          open: function(){
              setTimeout(function () {
                  $('.ui-autocomplete').css('z-index', 99);
              }, 0);
          }
        });
  });
