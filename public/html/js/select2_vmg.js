// json = [
//     {
//         manager: "Manager1",
//         employees : 
//             [
//                 "Liam",
//                 "Olivia",
//                 "Noah",
//                 "Emma",
//                 "Oliver",
//                 "Ava",
//                 "William",
//                 "Sophia",
//                 "Elijah"
//             ]
//     },
//     {
//         manager: "Manager2",
//         employees : 
//             [
//                 "Isabella",
//                 "James",
//                 "Charlotte",
//                 "Benjamin",
//                 "Amelia",
//                 "Lucas",
//                 "Mia",
//                 "Mason",
//                 "Harper",
//                 "Ethan",
//                 "Evelyn"
//             ]
//     }
// ]

$(document).ready(function() {
//     $('.js-example-basic-multiple').select2()  

//     $('#employee-select').select2({
//         placeholder: 'Select your employees',
//         closeOnSelect: false,
//         disabled: true
//     }) 

//     $('#manager-select').select2({
//         data: ListManagers(json),
//         placeholder: 'Select your name',
//     })  

//     $('#manager-select').val(null).trigger('change');

//     $('#manager-select').on('select2:select', function (e) {
//         var data = e.params.data;
//         $('#employee-select').empty().trigger('change');
//         $('#employee-select').select2({
//             data: GetEmployees(json, data.text),
//             placeholder: 'Select your employees',
//             closeOnSelect: false,
//             disabled: false
//         }) 
//     });

//     $('#employee-select').on('select2:close', function (e) {
//         // var data = e.params.data;
//         var tempArr = []
//         $('#employee-select').find(':selected').each(function(i){
//             console.log($(this).text())
//             tempArr.push ($(this).text())
//         })

//         data = tempArr.map(function (item, i) {
//             item.id = i;
//             _item = {id:i, text:item}
//             return _item;
//         }); 
//         $('.tablerow').select2({
//             data: GetEmployees(json, data),
//             placeholder: 'Select your employees',
//             closeOnSelect: false,
//             disabled: false
//         }) 
//     });






// // ListManagers(json);
// // GetEmployees(json, "Manager1")

// function AddSelect2(selector){
//     console.log(selector)
//     $(selector).select2({
//         data: GetEmployees(json, "Manager1")
//     });
// }

// function ListManagers(array, index){
//     data = array.map(function (item, i){
//         item.id = i;
//         _item = {id:i, text:item.manager}
//         return _item;
//     })
//     // console.log(data)
//     _result = {
//         'results':data
//     }
//     return data 
    
// }

// function GetEmployees (array, manager){
//     array.forEach((element, index)=> {
//         if (manager == element.manager){
//             data = element.employees.map(function (item, i) {
//                 item.id = i;
//                 _item = {id:i, text:item}
//                 return _item;
//             }); 
//             _result = {
//                 'results':data
//             }
             
//         }
//     });
//     return /*_result*/ data 
// }

/*

var _manager = new Manager('mister', 'manager', 'hs diploma');
var _employee1 = _manager.addEmployee('monty', 'wilson', 'MFA');
console.log("unique id: " + _employee1._id)
var _employee2 = _manager.addEmployee('hollie', 'schmidt', 'BFA');
console.log("unique id: " + _employee2._id)
var _employee3 = _manager.addEmployee('intern', 'wendy', 'BA');
console.log("unique id: " + _employee3._id)
console.log(_manager)
_manager.removeEmployee(_employee2._id);

<li class="list-group-item">John Doe <button type="button" class="btn btn-primary btn-sm float-end remove-item-bt"><i class="fas fa-user-times"></i> remove</button></li>

*/

manager = null;
ListenNewManager(); 

function ListenNewManager(){
    $('#add-employee-bt').on('click.manager', function(event){
        console.log(event.target)
        event.preventDefault();
        if (!manager){
            var _managerFirst = $('#managerFirst').val();
            var _managerLast = $('#managerLast').val();
            manager = new Manager(_managerFirst, _managerLast, null)
            // addEmployeeListener();
        } else console.log('manager alreadey added')
        
        console.log($('#employeeFirst').val());
        var _employeeFirst = $('#employeeFirst').val();
        var _employeeLast = $('#employeeLast').val();
        manager.addEmployee(_employeeFirst, _employeeLast, null);
        $('#employeeFirst').val('');
        $('#employeeLast').val('');
    })
}

function addEmployeeListener(firstName, lastName, edu){
    _this = manager;
    // $('#add-employee-bt').off('click.employee'); 
    if (firstName || lastName){
        var _employeeFirst = firstName || null;
        var _employeeLast = lastName || null;
        manager.addEmployee(_employeeFirst, _employeeLast, null);
    } else {
        $('#add-employee-bt').on('click.employee',function(event){
            event.preventDefault();
            var _employeeFirst = $('#employeeFirst').val();
            var _employeeLast = $('#employeeLast').val();
            _this.addEmployee(_employeeFirst, _employeeLast, null);
        })
    }

}

//manager class  
function Manager(managerFirst, managerLast, managerEducation){
    this.init = managerInit; //constructor
    this.self;
    this.employees = [];
    this.addEmployee = addEmployee;
    this.removeEmployee = removeEmployee;
    this.addEmployeeListener = addEmployeeListener;
    this.removeEmployeeListener = removeEmployeeListener;
    this.updateEmployeeDisplay = updateEmployeeDisplay;
    this.init(managerFirst, managerLast, managerEducation);
}

    function managerInit(managerFirst, managerLast, managerEducation){
        _this = this;
        // $('#add-employee-bt').off('click.manager')
        var _employee = new Employee();
        _employee.firstName = managerFirst;
        _employee.lastName = managerLast;
        _employee.education = managerEducation;
        _employee.manager = "is manager";
        this.self = _employee;

        this.updateEmployeeDisplay(_employee, false);
        return this;
    }

    function addEmployee(emplFirst, emplLast, emplEducation){
        console.log('added employee')
        var _employee = new Employee();
        _employee.firstName = emplFirst;
        _employee.lastName = emplLast;
        _employee.education = emplEducation;
        _employee.manager = this.self;
        this.employees.push(_employee)

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

    function removeEmployeeListener(){
        _this = this;
        console.log('adding remove listener')
        $('.remove-item-bt').off('click.employee');
        $('.remove-item-bt').on('click.employee',function(event){
            event.preventDefault();
            console.log('remove called')
            var _employeeId = $(this).attr('id');
            console.log(_employeeId)
            var employee = _this.removeEmployee(_employeeId);
            // _this.updateEmployeeDisplay(employee, true)
        })
    }

    function updateEmployeeDisplay(employee, remove){
        _this = this;
        if (!remove){
            var li = document.createElement('li');
            $(li).addClass('list-group-item').text(employee.firstName + " " + employee.lastName).append('<button id="'+ employee._id +'" type="button" class="btn btn-primary btn-sm float-end remove-item-bt"><i class="fas fa-user-times"></i>remove</button>')/*.attr('id', employee._id)*/
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
        }
    }



//employee class 
function Employee(){
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