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
        // $('.tablerow').empty().trigger('change');


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
