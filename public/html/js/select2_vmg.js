json = [
    {
        manager: "Manager1",
        employees : 
            [
                "Liam",
                "Olivia",
                "Noah",
                "Emma",
                "Oliver",
                "Ava",
                "William",
                "Sophia",
                "Elijah"
            ]
    },
    {
        manager: "Manager2",
        employees : 
            [
                "Isabella",
                "James",
                "Charlotte",
                "Benjamin",
                "Amelia",
                "Lucas",
                "Mia",
                "Mason",
                "Harper",
                "Ethan",
                "Evelyn"
            ]
    }
]

$(document).ready(function() {
    $('.js-example-basic-multiple').select2()  

    $('#employee-select').select2({
        placeholder: 'Select your employees',
        closeOnSelect: false,
        disabled: true
    }) 

    $('#manager-select').select2({
        data: ListManagers(json),
        placeholder: 'Select your name',
    })  

    $('#manager-select').val(null).trigger('change');

    $('#manager-select').on('select2:select', function (e) {
        var data = e.params.data;
        $('#employee-select').empty().trigger('change');
        $('#employee-select').select2({
            data: GetEmployees(json, data.text),
            placeholder: 'Select your employees',
            closeOnSelect: false,
            disabled: false
        }) 
    });

    $('#employee-select').on('select2:close', function (e) {
        // var data = e.params.data;
        var tempArr = []
        $('#employee-select').find(':selected').each(function(i){
            console.log($(this).text())
            tempArr.push ($(this).text())
        })

        data = tempArr.map(function (item, i) {
            item.id = i;
            _item = {id:i, text:item}
            return _item;
        }); 
        $('.tablerow').select2({
            data: GetEmployees(json, data),
            placeholder: 'Select your employees',
            closeOnSelect: false,
            disabled: false
        }) 
    });






// ListManagers(json);
// GetEmployees(json, "Manager1")

function AddSelect2(selector){
    console.log(selector)
    $(selector).select2({
        data: GetEmployees(json, "Manager1")
    });
}

function ListManagers(array, index){
    data = array.map(function (item, i){
        item.id = i;
        _item = {id:i, text:item.manager}
        return _item;
    })
    // console.log(data)
    _result = {
        'results':data
    }
    return data 
    
}

function GetEmployees (array, manager){
    array.forEach((element, index)=> {
        if (manager == element.manager){
            data = element.employees.map(function (item, i) {
                item.id = i;
                _item = {id:i, text:item}
                return _item;
            }); 
            _result = {
                'results':data
            }
             
        }
    });
    return /*_result*/ data 
}

// var _manager = new Manager('mister', 'manager', 'hs diploma');
// var _employee1 = _manager.addEmployee('monty', 'wilson', 'MFA');
// console.log("unique id: " + _employee1._id)
// var _employee2 = _manager.addEmployee('hollie', 'schmidt', 'BFA');
// console.log("unique id: " + _employee2._id)
// var _employee3 = _manager.addEmployee('intern', 'wendy', 'BA');
// console.log("unique id: " + _employee3._id)
// console.log(_manager)
// _manager.removeEmployee(_employee2._id);



manager = null;
//check for persistent manager data

$('#add-employee-bt').click(function(event){
    event.preventDefault();
    var _managerFirst = $('#managerFirst').val();
    var _managerLast = $('#managerLast').val();
    if (!manager){
        managerInit(_managerFirst, _managerLast, null)
    }
    var _managerFirst = $('#employeeFirst').val();
    var _managerLast = $('#employeeLast').val();
})

//manager class constructor 
function Manager(managerFirst, managerLast, managerEducation){
    this.init = managerInit;
    this.self;
    this.employees = [];
    this.addEmployee = addEmployee;
    this.removeEmployee = removeEmployee;
    this.addEmployeeListener = addEmployeeListener;
    this.init(managerFirst, managerLast, managerEducation);
}

    function managerInit(managerFirst, managerLast, managerEducation){
        var _employee = new Employee();
        _employee.firstName = managerFirst;
        _employee.lastName = managerLast;
        _employee.education = managerEducation;
        _employee.manager = "is manager";
        this.self = _employee;
        this.addEmployeeListener();
        return this;
    }

    function addEmployee(emplFirst, emplLast, emplEducation){
        var _employee = new Employee();
        _employee.firstName = emplFirst;
        _employee.lastName = emplLast;
        _employee.education = emplEducation;
        _employee.manager = this.self;
        this.employees.push(_employee)
        console.log(_employee)
        return _employee;
    }

    function removeEmployee(_id){
        _this = this;
        var _employeeToDel;
        this.employees.map(function(item, index){
            if(item._id == _id){
                _employeeToDel = item;
                _this.employees.splice(index, 1)
            }
        })
        return _employeeToDel;
    }

    function addEmployeeListener(){
        // $('#employee-list-input').click(function(event){
        //     event.preventDefault();
        //     console.log('click')
        // })
    }



//employee class constructor
function Employee(){
    this.init = employeeInit;
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
    this.init();
}

    function employeeInit(){
        this._id = this.generateId(7);
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

});

/*
Enter an employee name and click "add employee" for each employee you manage.

Add the names of the employees who engage in each of the essential tasks listed below. Multiple employees can be selected. Leave blank if no staff participate in the task.
*/