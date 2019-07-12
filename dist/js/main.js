function donduring(){
    reset();

    var command = document.getElementById("edit_area").value.split("\n");
    
    var counter = 0;
    while(counter < command.length){
        var command_type = which_one(command[counter]);
        if(command_type == "#"){
            title(command[counter]);
            produce_hr(command[counter]);
        }
        else if(command_type == ">"){
            block(command[counter]);
        }
        else if(command_type == "-"){
            list_command(command[counter]);
        }
        else if(command_type == "'''"){
            var code_area = [];
            var counter2 = 0;
            var i = 0;
            while(counter2 != 2){
                if(command[counter] != "'''"){
                    code_area[i] = command[counter];
                    counter++;
                    i++;
                }
                else{
                    code_area[i] = command[counter];
                    counter2++;
                    counter++;
                    i++;
                }
            }
            coding(code_area);
        }
        counter++;
    }
}

function coding(command){
    var cleaning = clean(command, "'''");
    var element = document.getElementById("content");
    var element_div = document.createElement("div");
    element_div.className += "elements";
    for(var i = 0; i < cleaning[0].length; i++){
        var elem_div = document.createElement("p");
        elem_div.className += "elements";
        var node = document.createTextNode(cleaning[0][i]);
        elem_div.appendChild(node);
        element_div.appendChild(elem_div);
    }
    element.appendChild(element_div);
}
function list_command(command){
    var cleaning = clean(command, "-");
    produce(str_arr(cleaning[0]), "li");
}
function block(command){
    var cleaning = clean(command, ">");
    produce(str_arr(cleaning[0]), "blockquote");
}

function which_one(command){
    var counter_title = 0;
    var counter_code = 0;
    var counter_bold = 0;
    var counter_italic = 0;
    var counter_over_liner = 0;
    for(var i = 0; i < 5; i++){
        if(command[i] == "#"){
            counter_title++;
        }
    }
    for(var j = 0; j < 3; j++){
        if(command[j] == "'"){
            counter_code++;
        }
    }
    if(!counter_title == 0){
        return("#");
    }
    else if(counter_code == 3){
        return("'''");
    }
    else if(command[0] == ">"){
        return(">")
    }
    else if(command[0] == "-"){
        return("-")
    }
    
}


function title(command){
    var cleaning = clean(command, "#");
    switch (cleaning[1]) {
        case 0:
            produce(str_arr(cleaning[0]), "p");
            break;
        case 1:
            produce(str_arr(cleaning[0]), "h1");
            break;
        case 2:
            produce(str_arr(cleaning[0]), "h2");
            break;
        case 3:
            produce(str_arr(cleaning[0]), "h3");
            break;
        case 4:
            produce(str_arr(cleaning[0]), "h4");
            break;
        case 5:
            produce(str_arr(cleaning[0]), "h5");
            break;
    }
}

function produce(command, element){
    var para = document.createElement(element);
    para.className += "elements";
    var node = document.createTextNode(command);
    para.appendChild(node);
    
    var element = document.getElementById("content");
    element.appendChild(para);
}

function produce_hr(command){
    if(!command == ''){
        var element = document.getElementById("content");
        var hor_line = document.createElement("hr");
        hor_line.className += "elements";
        element.appendChild(hor_line);
    }
}

function str_arr(arr){
    var str_arr = '';
    for(var i = 0; i < arr.length; i++){
        str_arr += arr[i]
    }
    return str_arr;
}

function reset(){
    document.querySelectorAll('.elements').forEach(function(a){
        a.remove()
        });
}

function clean(command, mark){

    var counter = 0;
    var new_command = [];
    for(var i = 0; i < command.length; i++){
        if(command[i] == mark){
            counter++;
        }
        else{
            new_command[i-counter] = command[i];
        }
    }
    return [new_command, counter];
}









    /*
    for(var k = 0; k < command.length; k++){
        if(command[k] == "*"){
            counter_bold++
        }else if(command[k] == "_"){
            counter_italic++;
        }else if(command[k] == "~"){
            counter_over_liner++;
        }
    }
    */