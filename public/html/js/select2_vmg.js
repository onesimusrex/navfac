$(document).ready(function() {

function loadBranch(branch, category){
    var arr = data[category][branch].data;
    $('#'+category+'List').empty()
    arr.map(function(item, i){
        var htmlstring = `<li class="list-group-item">
        <div class="row">
            <div id="activity-class" class="col-md"><strong>`+item+`</strong></div>
            <div class="col-md">
                <select class="js-example-basic-multiple js-states form-control select-group" multiple="multiple" data-placeholder="Add Employees" data-width="100%">

                </select>
            </div>
        </div>
    </li>`
        
        $('#'+category+'List').append(htmlstring)
    })
    
}

function setBranch(branch){
    emptySurveyOptions();

    $('#employee-list-card').show()
    $('#essential-tasks-card').show()
    $('#training-card').show()
    $('#credentials-card').show()

    loadBranch(branch, "training")
    loadBranch(branch, "essentialtask")
    loadBranch(branch, "credential")
    $('.js-example-basic-multiple').select2() 

    $('.js-example-basic-multiple').on('select2:select', function (e) {
        var data = e.params.data;
        // console.log(data);
        var _activity = $(data.element.parentElement).parent().siblings('#activity-class')
        // console.log(_activity.text());

        var _activityText = _activity.text();
        var employeeId = data.htmlId;
        var branchType = _activity.parents('ul').attr('id')/*.slice(0, -4)*/;
        if (branchType == 'essentialtaskList'){
            branchType = 'tasks'
        } else if (branchType == 'trainingList'){
            branchType = 'trainings';
        } else if (branchType == 'credentialList'){
            branchType = 'credentials';
        }

        // console.log(employeeId);
        
        var _employee;
        manager.employees.map(function(item, index){
            if(item._id == employeeId){
                _employee = item;
                // _employee[branchType].push(_activityText)
                addActivityNew(_employee[branchType], _activityText)
            }
        })
    });

    $('.js-example-basic-multiple').on('select2:unselect', function (e) {
        var data = e.params.data;
        console.log(data);
        var _activity = $(data.element.parentElement).parent().siblings('#activity-class')
        var _activityText = _activity.text();
        var employeeId = data.htmlId;
        var branchType = _activity.parents('ul').attr('id')/*.slice(0, -4)*/;
        if (branchType == 'essentialtaskList'){
            branchType = 'tasks'
        } else if (branchType == 'trainingList'){
            branchType = 'trainings';
        } else if (branchType == 'credentialList'){
            branchType = 'credentials';
        }

        console.log(employeeId);

        var _employee;
        manager.employees.map(function(item, index){
            if(item._id == employeeId){
                _employee = item;
                // _employee[branchType].push(_activityText)
                removeActivityNew(_employee[branchType], _activityText)
            }
        })
    })

    $('#employee-list').empty()
    if (manager != null){
        manager.employees = []
        
    } else {
        if (manager != null){
            AddEmployeesToSelect2(manager);
            $('#employee-list').empty()
        }
    }
}

function addActivityNew (arr, activity){
    flag = true

    arr.map((item)=>{
        if (item == activity){
            flag = false
        }
    })

    if (flag){
        arr.push(activity);
        return flag
    } else
    return flag
}

function removeActivityNew (arr, activity){
    arr.map((item, i)=>{
        if (item == activity){
            arr.splice(i, 1)
        }
    })

}

function emptySurveyOptions(){
    $('#trainingList').empty()
    $('#credentialList').empty()
    $('#essentialtaskList').empty()
}

$('#branch-selector').on('change', function(event){
    event.preventDefault();
    var selectBranch = $('#branch-selector option:selected').attr('value');
    setBranch(selectBranch);
})

$('#pwd-selector').on('change', function(event){
    event.preventDefault();
    setPwd(manager);
})

function setPwd(_manager){
    var pwd = $('#pwd-selector option:selected').attr('value');
    if (_manager != null){
        _manager.pwd = pwd;
    } else {
        this.pwd = pwd;
    }
}

$('#discipline-input').on('focusout', function(event){
    event.preventDefault();
    setDiscipline(manager)
})

function setDiscipline(_manager){
    var _discipline = $('#discipline-input').val();
    if (_manager != null){
        _manager.discipline = _discipline;
    } else {
        this.discipline = _discipline;
    }
}

var eduVar;
$('#education-selector').on('change', function(event){
    event.preventDefault();
    // setEducation(manager);
    console.log('education selection changed')
    // eduVar = $('#education-selector').val();
})

$('#education-selector').on('select2:select', function (e) {
    var data = e.params.data;
    console.log(data);
});



emptySurveyOptions();
$('#employee-list-card').hide()
$('#essential-tasks-card').hide()
$('#training-card').hide()
$('#credentials-card').hide()
manager = null;
ListenNewManager(); 

function ListenNewManager(){
    $('#add-employee-bt').on('click.manager', function(event){

        event.preventDefault();
        var _employeeFirst = $('#employeeFirst').val();
        var _employeeLast = $('#employeeLast').val();
        if  (_employeeFirst.length > 0 && _employeeLast.length > 0){
            $('#employeeFirst').focus();
            if (!manager){
                var _managerFirst = $('#managerFirst').val();
                var _managerLast = $('#managerLast').val();
                manager = new Manager(_managerFirst, _managerLast, "null")
                manager.addEmployee(_managerFirst, _managerLast, "null");
            } 
            manager.addEmployee(_employeeFirst, _employeeLast, "null");
            //reset fields
            $('#employeeFirst').val('');
            $('#employeeLast').val('');
        }

    })
}

//manager class  
function Manager(managerFirst, managerLast, managerEducation){
    this.init = managerInit; 
    this.self;
    this.employees = [];
    this.pwd = "null";
    this.discipline = "null"
    this.setPwd = setPwd;
    this.setDiscipline = setDiscipline;
    this.fields = data;
    this.addEmployee = addEmployee;
    this.removeEmployee = removeEmployee;
    this.updateEmployeeDisplay = updateEmployeeDisplay;
    this.init(managerFirst, managerLast, managerEducation);
}

    function managerInit(managerFirst, managerLast, managerEducation){
        _this = this;
        var _employee = new Employee(true);
        _employee.firstName = managerFirst;
        _employee.lastName = managerLast;
        _employee.education = managerEducation;
        _employee.manager = "is manager";
        this.setPwd();
        this.setDiscipline();
        this.self = _employee;
        return this;
    }

    function addEmployee(emplFirst, emplLast, emplEducation){
        console.log('added employee')
        var _employee = new Employee(false);
        _employee.firstName = emplFirst;
        _employee.lastName = emplLast;
        if (manager.employees.length > 0){
            _employee.education = $('#education-selector').val() || "none selected";
            $('#education-selector').val('')
        } else _employee.education = $('#education-selector-manager').val() || "none selected"
        _employee.manager = this.self;
        this.employees.push(_employee)

        AddEmployeesToSelect2(this)
        this.updateEmployeeDisplay(_employee, false);
        return _employee;
    }

    function removeEmployee(_id){
        _this = this;
        var _employeeToDel;
        this.employees.map(function(item, index){
            if(item._id == _id){
                _employeeToDel = item;

                _this.updateEmployeeDisplay(_employeeToDel, true);

                _this.employees.splice(index, 1)
            }
        })
        return _employeeToDel;
    }

    function updateEmployeeDisplay(employee, remove){
        _this = this;
        if (!remove){
            var li = document.createElement('li');
            $(li).addClass('list-group-item').text(employee.firstName + " " + employee.lastName).append('<button id="'+ employee._id +'" type="button" class="btn btn-primary btn-sm float-end remove-item-bt"><i class="fas fa-user-times"></i> remove</button>')/*.attr('id', employee._id)*/
            $('#employee-list').append(li)
            $('#'+ employee._id ).on('click.test', function(event){
                event.preventDefault();
                $(this).parent('li').remove()
                _this.removeEmployee(employee._id);
                _this.updateEmployeeDisplay(employee, true)
            })
            // var _employeeFirst = $('#employeeFirst').val('');
            // var _employeeLast = $('#employeeLast').val('');
        } else {
            $('#'+employee._id).remove();
            $('option[data-custom-htmlid="'+employee._id+'"]').remove()


            // /*
            // AddEmployeesToSelect2(manager)//start here issues
            var _manager = manager;
            var addedEmployees = _manager.employees.map((item, index) => {
                var _nameDisplay = item.firstName + ' ' + item.lastName;
                var _item = {id:index, text:_nameDisplay, htmlId: item._id};
                console.log(_item)
                return _item;
            })
            // var arr = ConvertArraySelect2(addedEmployees)

            setTimeout(function(){

                var selected = $('.js-example-basic-multiple').find(':selected')
                var notselected = $('.js-example-basic-multiple').find(':not(:selected)').remove();
                
                // .each(function(){
                //     $(this).children().remove();
                // })
                console.log(selected)
                console.log(notselected.length)
                
                
                $('.js-example-basic-multiple').select2({
                    data: addedEmployees,
                    placeholder: 'Select your employees',
                    closeOnSelect: false,
                    templateSelection: function (data, container) {
                        // Add custom attributes to the <option> tag for the selected option
                        $(data.element).attr('data-custom-htmlId', data.htmlId);
                        // console.log(data.element)
                        // console.log(container)
                        return data.text;
                      },
                    // disabled: false
                })  
            }, 1000)
            // $('.js-example-basic-multiple').empty()

            // */
            
        }
    }



//employee class 
function Employee(isManager){
    this.init = employeeInit; //constructor
    this._id;
    this.firstName;
    this.lastName;
    this.education;
    this.manager;
    this.tasks = [];
    this.trainings = [];
    this.credentials = [];
    this.generateId = generateId;
    this.addActivity = addActivity;
    this.removeActivity = removeActivity;
    // this.setEduction = setEducation;
    this.init(isManager);
}

    function employeeInit(isManager){
        this._id = this.generateId(7);
        console.log('is manager: ' + isManager)
        if (!isManager){
            this.education = eduVar/*setEducation()*/
        } else {
            this.eductation = eduVar
        }
    }

    function setEducation(){
        var _education = $('#education-selector').val();
        // $('#eduction-selector').val('none');
        console.log('boom3')
        // return _education
        return _education
    }

    //utility function to add unique id
    function generateId(l){
        var text = "";
        var char_list = "0123456789abcdefghijklmnopqrstuvwxyz";
        for(var i=0; i < l; i++ ){  
            text += char_list.charAt(Math.floor(Math.random() * char_list.length));
        }
        return text;
    }

    function addActivity(activity, type){
        switch (type){
            case "task":
                this.tasks.push(activity);
            case "training":
                this.trainings.push(activity);
                break;
            case "credential":
                this.credentials.push(activity);
                break;
        }
        return this.manager; //returns employee's manager to method chain
    }

    function removeActivity(){

    }

    function AddEmployeesToSelect2(_manager){
        var addedEmployees = _manager.employees.map((item, index) => {
            var _nameDisplay = item.firstName + ' ' + item.lastName;
            var _item = {id:index, text:_nameDisplay, htmlId: item._id};
            return _item;
        })


        $('.js-example-basic-multiple').select2({
            data: addedEmployees,
            placeholder: 'Select your employees',
            closeOnSelect: false,
            templateSelection: function (data, container) {
                // Add custom attributes to the <option> tag for the selected option
                $(data.element).attr('data-custom-htmlId', data.htmlId);
                // console.log(data.element)
                // console.log(container)
                return data.text;
              }
            // disabled: false
        })  


    }   

    function ConvertArraySelect2(array, index){
        data = array.map(function (item, i){
            item.id = i;
            _item = {id:i, text:item.manager}
            return _item;
        })
        // console.log(data)
        _result = {
            'results':data
        }
        // return {results: data }
        return data
        
    }

    $('#managerFirst').focus();

    $("#employeeLast, #managerLast, #employeeFirst").keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           if ($(this).attr('id') == "employeeLast"){
                console.log('empl last press')
                $('#add-employee-bt').trigger('click');
           } else if ($(this).attr('id') == "managerFirst"){
                if ($('#managerFirst').val().length > 0){
                    $('#managerLast').focus();
                }
           } else if ($(this).attr('id') == "employeeFirst"){
                $('#employeeLast').focus();
                if ($('#employeeFirst').val().length > 0){
                    $('#employeeLast').focus();
                }
           }

        }   
      });

});



/*
Enter an employee name and click "add employee" for each employee you manage.

Add the names of the employees who engage in each of the essential tasks listed below. Multiple employees can be selected. Leave blank if no staff participate in the task.
*/


