
console.log('hi3')
//set google sheet id here:
var googlesheetid = "1Pgbh_OXpf6VvLIRTHynyqpwfuouGJJK5eFb2r9uAh_M";

//set google sheet names here:
var _sheetVisitors = "Visitors";
var _sheetComments = "Comments";

//set email sender here:
var emailSender = 'Community.Relations@HydroOne.com';

//set email subject here:
var emailSubject = "Chatham to Lakeshore Open House Comment";

//list radio button and checkbox ids here:
var radioButtons = ["inlineRadioOptions", "_employedCheck", "_businessCheck", "_monetaryCheck", "optionChoice", "ownerRenter"];

//adds a class to style invalid inputs red
$('body').append('<style>.input_check::placeholder{color:red}</style>');

//handler for comment submissions (change comment modal html here)
function comment(_data){
    console.log('comment handler')
    _modalHtml = `
    <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
    <div class="card text-center">
    <div class="card-header"><img src="img/Jacobs_logo_tag_left_rgb_white_1.png" class="img-fluid" alt="Jacobs Logo" /></div>
        <div class="card-body">
            <h3>Thank you for your feedback.</h3>			
            <p></p>
            <div class="mt-3"> 
                <!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
                <button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Close</button>
            </div>
        </div>
    </div>
</div>
    `;
    $.fancybox.close()
    $.fancybox.open(_modalHtml);
    _data.sheet = _sheetComments;
    apiCall(_data, '/api/sheets')
    // apiCall(_data, '/api/email')
    console.log('10/28')
}

//handler for sign in submissions (change signin modal html here)
function signin (_data){
    console.log('signin handler')
    _modalHtml = `
    <div style="display: none; max-width: 600px;" id="thank-you-popup" class="message">
    <div class="card text-center">
    <div class="card-header"><img src="img/CDOT_logo.png" class="img-fluid" alt="CDOT Logo" /></div>
        <div class="card-body">
            <h3>Thank you for signing in.</h3>
            
            <div class="mt-3"> 
                <!--<a href="#" class="btn btn-outline-primary fancybox-closebt">Close</a>-->
                <button type="button" data-fancybox-close="" title="Close" class="btn btn-outline-primary fancybox-closebt">Close</button>
            </div>
        </div>
    </div>
</div>
    `;
    // $.fancybox.close()
    // $.fancybox.open(_modalHtml);
    _data.sheet = _sheetVisitors;
    apiCall(_data, '/api/sheets')
}

$('#submit-button').on("click", (event)=>{
    event.preventDefault();
    console.log('submit button')
    sendData(manager)
})

function sendData(_manager){
    pushDatatoEmpl(_manager, 'tasks', _manager.employees.length, 0);
    pushDatatoEmpl(_manager, 'trainings', _manager.employees.length, 0);
    pushDatatoEmpl(_manager, 'credentials', _manager.employees.length, 0);
    pushDatatoEmpl(_manager, 'education', _manager.employees.length, 0);
}

function pushDatatoEmpl(_manager, _sheet, _emplLength, _count){   
    if (_count < _emplLength){ 
    // _manager.employees.map((item, i) => {
        var item = _manager.employees[_count]
        _data = {
            _type: null,
            arr:[],
            validFlag: true,
            sheet: _sheet,
            googlesheetid: googlesheetid,
            emailSubject: emailSubject,
            emailSender: emailSender
        }; 

        // _data.arr.push([item._id, item._id]);

        _data.arr.push([item._id, item.firstName]);
        _data.arr.push([item._id, item.lastName]);
        _data.arr.push([item._id, item.manager.lastName + ', ' + item.manager.firstName]);
        _data.arr.push([item._id, _manager.pwd]);
        _data.arr.push([item._id, _manager.discipline]);
        if (_sheet != 'education'){
            _data.arr.push([item._id, JSON.stringify(item[_sheet])]);
        } else {
            _data.arr.push([item._id, item.education]);
        }

 
        apiCall(_data, '/api/sheets')
    // })
    
        setTimeout(()=>{
            pushDatatoEmpl(_manager, _sheet, _emplLength, ++_count)
        }, 300)
    }
    return
}



//sets form values from index page + calls handler
$('#signInForm, #commentForm, #sign-in-form').submit(function(event){
    emailSender = $('#_email').val();
    event.preventDefault();
    _id = $(this).attr("id")
    // console.log(_id)

    _data = {
        _type: null,
        arr:[],
        validFlag: true,
        sheet: _sheetVisitors,
        googlesheetid: googlesheetid,
        emailSubject: emailSubject,
        emailSender: emailSender
    }; 
    if (_id == "commentForm"){
       _data._type = "comment"
    } else {
        _data._type = "signIn"
    }
    console.log(_data._type);

    $(this).find('input, select, textarea').each(function(index){
        // console.log($(this).attr("_type"))
        el = $(this)
        _type = $(this).attr("type")
        _id = $(this).attr("id")
        /*
        var patt = //gmi;
        _validClass = patt.test(_id);
        if (_validClass){
            if (el.val() == ""){
                el.attr("placeholder", "Please enter " + el.attr('placeholder').toLowerCase() );
                el.addClass('input_check');
                _data.validFlag = false;
            } 
        }
        */
        if(_type == "text" || _type == "email"){
            // console.log(_type + ': ' + el.val() + " " + _id)
            _data.arr.push([_id, el.val()]);
        } else if (_type == "radio"){
            for (var i=0; i<radioButtons.length; i++){
                _checked = el.filter('[name="'+radioButtons[i]+'"]:checked');
                if (typeof _checked.val() !== 'undefined'){
                    // console.log(_checked.val());
                    _data.arr.push([_id, _checked.attr("id")]);
                }
            }
        } else if (_id == "dropdown_select"){
            // console.log(_type + ': ' + el.val() + " " + _id)
            _data.arr.push([_id, el.val()]);
        } else if (el.is('textarea')){
            // console.log(_type + ': ' + el.val() + " " + _id)
            _data.arr.push([_id, el.val()]);
        } else if (_type == "checkbox"){
            if(el.is(":checked")){
                // console.log("checked: " + _id)
                _data.arr.push([_id, _id+": yes"]);
            } else {
                _data.arr.push([_id, _id+": no"]);
            }
        }
    });
    // console.log(_data)
    // _data = JSON.stringify(_data)
    // signin(_data);
    // if (_data.validFlag){
        if (_data._type == "comment"){
            // comment(JSON.stringify(_data));
            comment(_data)
        } else signin(_data);
    // }
});


//send to api
function apiCall(user, endpoint){
    // console.log(user)
    _user = user;
    user = {data: JSON.stringify(user)};
    $.post('https://txdotvirtualhearing.herokuapp.com/i35Vph'+endpoint, user, function(data, status){
        console.log(data);
    });
    // user = [user]
    // user = {data: JSON.stringify(user)};
    // $.post('/i35Vph'+endpoint, user, function(data, status){
    //     console.log(data);
    // });
    // var _email = $("#_email").val();
    // console.log(_user.arr[2][1] +" "+ _user.arr[3][1] + " " + _user.arr[5][1])

}

//utility function to add unique id
function makeid(l)
{
var text = "";
var char_list = "0123456789";
for(var i=0; i < l; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
return text;
}
