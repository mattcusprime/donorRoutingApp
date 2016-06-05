//Global Variables
var arrGarmentProductsArrayForTypeAhead = [];

//
/**
 * @param {Object} objCurrentGarmentProduct is the garment product passed to the function for which to create the releated products div
 * @example var garment = new garmentProduct();
 * //invoke then the methods to get it's relationships
 * createRelatedProductsDiv(garment);
 */
function createRelatedProductsDiv(objCurrentGarmentProduct) {
    //$('#relationships').fadeOut().remove();
    $('#garmentHeader *').remove();
    var strSpecsDivString = appendBootStrapDivPage('relationships', 1);
    var strTableString = '<h2>Relationships</h2><table class="table" id="tblRelationships"><tr><th>Relationship</th><th>Product</th></tr><tbody>';
    if (typeof (objCurrentGarmentProduct.colorwayProduct.name) != 'undefined') {
        strTableString = strTableString + "<tr><td>Colorway Product</td><td>" + objCurrentGarmentProduct.colorwayProduct.name + "</td></td>";
    };
    if (typeof (objCurrentGarmentProduct.colorwayProduct.name) != 'undefined') {
        strTableString = strTableString + "<tr><td>Pattern Product</td><td>" + objCurrentGarmentProduct.patternProduct.name + "</td></td>";
    };
    if (typeof (objCurrentGarmentProduct.labelProduct.name) != 'undefined') {
        strTableString = strTableString + "<tr><td>Label Product</td><td>" + objCurrentGarmentProduct.labelProduct.name + "</td></td>";
    };
    if (typeof (objCurrentGarmentProduct.sellingProduct.name) != 'undefined') {
        strTableString = strTableString + "<tr><td>Selling Product</td><td>" + objCurrentGarmentProduct.sellingProduct.name + "</td></td>";
        //SELLING PRODUCT NEEDS TO BE CHANGED TO PROCESS AN ARRAY OF SELLING PRODUCTS
    };
    strTableString = strTableString + "</tbody></table>";
    //$('head').append(strSpecsDivString);
    $('#garmentHeader').append(strTableString);
    $('#topLeftNav').text(objCurrentGarmentProduct.name);
    //$('#navbar ul').first().append("<li><a href='#garmentHeader'>Relationships</a></li>");

};


/**
 * @param {String} strId is the id of an element on the page to pass to the function to create a pdf from the element.
 * It is an experimental functionality and works with sporadic success.
 */
function pdfFromHtml(strId) {

    var doc = new jsPDF('landscape');
    var tblFromHtml = document.getElementById(strId);
    //doc.fromHTML(tblFromHtml);
    for (var i = 0; i < currentGarmentProduct.base64DocumentArray.length; i++) {
        var objLoopObject = {};
        objLoopObject = currentGarmentProduct.base64DocumentArray[i];
        doc.addImage(objLoopObject.imageBase.src, 'PNG', 0, 0, 200, 200);
        doc.addPage();

    };

    doc.save('imageTest.pdf');

};
/**
 * convertImgToBase64
 * @param  {String}   url
 * @param  {Function} callback
 * @param  {String}   [outputFormat='image/png']
 * @author HaNdTriX
 * @example
    convertImgToBase64('http://goo.gl/AOxHAL', function(base64Img){
        console.log('IMAGE:',base64Img);
    })
 */

function convertImgToBase64(url, callback, outputFormat) {
    $('canvas').remove();
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        // Clean up
        canvas = null;
    };
    img.src = url;
}

/**
 * Creates a simple 0 configuration table.   The length of arrHeaderObjects will deterimine the number of columns in the table.  
 * @param {String} strTableId is the id to give to the table as a string
 * @param {Array} arrHeaderObjects is an array that will populate the number of columns and headers with the text values in that array.  
 */

//not using in GP class, move to table creation for report pages
function createBaseDataTableHtml(strTableId, arrHeaderObjects) {
    var strTableString = '<table id="' + strTableId + '" class="col-xs-12 col-md-8"> <thead><tr>';
    for (var i = 0; i < arrHeaderObjects.length; i++) {
        var strHeaderString = arrHeaderObjects[i];
        strTableString = strTableString + '<th>' + strHeaderString + '</th>';

    };
    strTableString = strTableString + '</tr></thead><tbody></tbody></table>';
    return strTableString;

};

/*
/**
 * Returns a div string that contains a 'page' -> container -> article string with the article having a class of col-md-4 col-sm-6 col-xs-12
 * @param {String} strDivId is the id to give to the Div as a string
 * @param {Number} numRows is an array that will populate the number of rows that will be contained in the bootstrapped rows 
 * @return {String} strDivString this string is an html div string that is the full bootstrapped div with a fluid container.
 */
function appendBootStrapDivPage(strDivId, numRows) {
    var strBaseDiv = '<div id="' + strDivId + '" class="page">';
    var strMidDiv = '<div class="container-fluid">';
    var strRow = ""
    for (var i = 0; i < numRows; i++) {
        strRow = strRow + '<div class="row"></div>';

    };
    var strDivString = strBaseDiv + strMidDiv + strRow + "</div></div>";
    return strDivString;


}

// get base 64 image functions were removed from here due to lack of use and correct function/usage.
/**
 * function used in the Typeahead from Twitter, used to populate matches for a typeahead field
 * @param {Array} arrStrings an Array of strings to use for matching against the regex
 * need to change this to be just the function and then later on instantiate variables like substring matcher dynamically
 */
var substringMatcher = function (arrStrings) {
    return function findMatches(q, cb) {
        var matches, substringRegex;
        // an array that will be populated with substring matches
        matches = [];
        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(arrStrings, function (i, str) {
            if (substrRegex.test(str)) {
                // the typeahead jQuery plugin expects suggestions to a
                // JavaScript object, refer to typeahead docs for more info
                matches.push({ value: str });
            }
        });
        cb(matches);
    };
};


/*
@param url from which to get data
@param {String} strFunctionUrl jquery selector string for element which will receive the typeahead functionality
@param {String} strJquerySelector jquery selector string to use on the document element within the xml response to populate the array for the typeahead
@param {Array} arrDataDocumentSelector is an array to store the result which will be used for the data source for the typeahead
*/
function applyTypeAheadToElement(strFunctionUrl, strJquerySelector, arrDataDocumentSelector) {
    arrGarmentProductsArrayForTypeAhead = [];
    $.ajax({
        url: strFunctionUrl

    }).done(function (data) {
        $(arrDataDocumentSelector, data).each(function () {
            var gProdName = $(this).text();
            gProdName = gProdName.substring(3, 1000);
            arrGarmentProductsArrayForTypeAhead.push(gProdName);
        });
        $(strJquerySelector).typeahead({
            hint: true,
            highlight: true,
            minLength: 2
        },
   {
       name: 'gProd',
       displayKey: 'value',
       source: substringMatcher(arrGarmentProductsArrayForTypeAhead)
   });
        $(strJquerySelector).focus();
    });


};


//allows for slow animated scroll; takes no param should just be fired after the document and relevant links are loaded.
function makeMeSCrollSlow() {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 100
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
};

function makeMeScrollToDefinedTarget(strJquerySelectorTarget,numDelayTimer,offsetter) {
    var $target = $(strJquerySelectorTarget);
    if (typeof (offsetter) == 'undefined') {
        offsetter = -100;
    };
    if (typeof (numDelayTimer) == 'undefined') {
        numDelayTimer = 0;
    };
    $('html, body').stop().delay(numDelayTimer).animate({
        'scrollTop': $target.offset().top + offsetter
    }, 900, 'swing', function () {
        //window.location.hash = target;

    });
};

//prepopulates the elemSelector field based on a check of local storage for param 0
/*
@param url from which to get data
@param {String} strCheckFor checks against localStorage to see if the string exists or is saved.
@param {String} strJqSelectorToPopulateIfStorageExists is a jquery selector string used to populate an input based on the existence of the localStorage item

*/
function checkStorageFor(strCheckFor, strJqSelectorToPopulateIfStorageExists) {
    if (typeof (localStorage.getItem(strCheckFor)) == 'undefined') {
        //alert('nothing');
    }
    else {
        //alert(localStorage.getItem('lastGarmentRan'));
        $(strJqSelectorToPopulateIfStorageExists).val(localStorage.getItem(strCheckFor));
    };
};
/*
 * @param {String} strParentJquerySelectorJustStringNoPound, it must have measurementDetail
 * @param {String} strChildJquerySelectorForTableJustStringNoPound, it must have measurementDetail
 * @param {Object} garmentProduct, it must have measurementDetail
 * @param {String} strTableString is the table string to pass that will be appended and made into a DataTable
 */
function createComponentTable(strParentJquerySelectorJustStringNoPound, strChildJquerySelectorForTableJustStringNoPound, strTableString) {
    //var tableString = objGarmentProductWithMeasurementDetailString.measurementTableString;
    //http://localhost:59193/DataTables-1.10.7/extensions/TableTools/swf/copy_csv_xls_pdf.swf
    $('#' + strParentJquerySelectorJustStringNoPound + ' *').remove();
    $('#' + strParentJquerySelectorJustStringNoPound).append(strTableString);
    var table = $('#' + strChildJquerySelectorForTableJustStringNoPound).DataTable({
        pageLength: 50,
        order: [[0, 'asc']],
        columnDefs: [
            { visible: false, targets: 0 }
        ],
        responsive: false,
        dom: '',
        tableTools: {
            "sSwfPath": "C:/nodeTechPackProject/TechPackProject/js/copy_csv_xls_pdf.swf"
        },
        paging: true
        
        
        
    });
    


};


/*
 *
 */

function compare(a, b) {
    if (a.sortingNumber < b.sortingNumber)
        return -1;
    if (a.sortingNumber > b.sortingNumber)
        return 1;
    return 0;
};

function getLogin(arrAttributeValueListArray, objCurrentGarmentProduct) {
    var strInput1 = '<input id="usr" placeholder="User Name" type="text" name="username"></input>';
    var strInput2 = '<input id="pwd" placeholder="Password" type="password" name="password"></input>';
    var strInput3 = '<button class="closer">Close Application</button>';
    var strInput4 = strInput1 + strInput2;// + strInput3;
   
        
    var strUrlPrefixWithPass;
    
    $(strInput4).confirm(function (e) {
        //e.preventDefault();
        var strUser = $('#usr').val();
        var strPwd = $('#pwd').val();
        localStorage.setItem('mattAppUser', strUser);
        localStorage.setItem('mattAppPass', strPwd);
        strUrlPrefixWithPass = 'http://' + strUser + ':' + strPwd + '@wsflexwebprd1v.res.hbi.net/'
        var gProdQueryURL = strUrlPrefixWithPass + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/invokeAction?oid=OR%3Awt.query.template.ReportTemplate%3A4711650&action=ProduceReport&u8=1'
        applyTypeAheadToElement(gProdQueryURL, '#gProd', 'Garment_Product_Name');
        currentGarmentProduct.getMyValueLists(strUrlPrefixWithPass, arrAttributeValueListArray, objCurrentGarmentProduct);
        $('#garmentFormContainer').fadeIn();

    });
};


function runNewProduct() {
    $('#runNew,.clearThisComponentOnNewGarmentLoad').fadeOut();
    $('#garmentFormContainer').fadeIn();
    $('#gProd').val('').focus();
    

};
/*
Step 1 In your html file, add a Input tag block like below:

<input id="export_file" type="file" nwsaveas style="display:none" nwworkingdir=""/>

Step 2 Add a new function in your javascript file like below:
*/
function saveFile(name, tableDataSourceElementId) {
        var table = $(tableDataSourceElementId).DataTable();
        var data = table.data();
        fs.writeFileSync("blockSpread.csv", data);
        alert('file saved!')

};
/*
Step 3 Save your file where ever you like by using saveFile(name,data) function like below:

...

_exportCSV="you data to save";

saveFile('#export_file',_exportCSV);



*/