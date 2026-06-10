<script id="accesschild-template" type="x-tmpl-mustache">
	<tr>
    	<td style="text-align: center;">
         	<h4>{{name}}</h4>
        </td>
        <td>	
        	<div class="fullscreen text-center">
                {{{subinitiativeUserSlecteditem}}}
                <ul class="list-unstyled order-list" id="initiativeactivitieUser_{{id}}">
                  {{{subinitiativeUser}}}
				</ul>
          	</div>
     	</td>
        <td>
            {{moduleListname}}
        </td>
        <td>
        	<ul>
            	<li>
                	<i class="{{viewaccess}}"></i>View
                </li>
                <li>
                    <i class="{{createaccess}}"></i>Create
              	</li>
                <li>
                	<i class="{{editaccess}}"></i>Edit
               	</li>
                <li>
                	<i class="{{deleteaccess}}"></i>Delete
                </li>
           	</ul>
      	</td>
        <td style="text-align: center;">
           	{{{enableeditBtn}}}
            {{{enabledeleteBtn}}}
       	</td>
  	</tr>
</script>