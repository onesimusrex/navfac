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
    // AddSelect2('#'+manager-select')
    // $('.js-example-basic-multiple').select2()
    $('.js-example-basic-multiple').select2({
        data: GetEmployees(json, "Manager1")
    })  


    // $('#employee-select').click(function(event){
    //     event.preventDefault();
    //     // console.log('yeah')  
    //     var manager = $('#manager-select').find(":selected").text();
    //     // console.log(manager)
    //     $('#employee-select').select2({
    //         data: GetEmployees(json, manager)
    //     })
    // })
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
