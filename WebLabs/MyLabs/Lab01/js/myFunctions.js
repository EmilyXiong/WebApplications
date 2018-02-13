function doFoo(){
    console.log('a');
}

function doBar(){
    console.log('bob the builder');
}

module.exports= {};

module.exports['doRunFoo'] = doFoo;

module.exports['doRunBar'] = doBar;