
function createMyConstruction(constructionUrl) {
    //var constructionUrl = hostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/construction/FindConstructionInfo.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
    var arrLowerScopeConstructionDetailArray = [];
    $.ajax({
        url: constructionUrl,
        type: 'get',
        //below will take from the garment product itself for the construction instead of the ajax
        /*data: {
            oid: 'VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId,
            instance: 'net.hbi.res.wsflexappprd1v.windchillAdapter'
        },*/
        async: true

    }).done(function (data) {
        //this each should be used to iterate through the data response and create the structure required for the report
        //for the later garment product/pdf
        var objCurrentRow = {};
        //namespace is harder to grab so just grabbing the parant element of the first element and then iterating through those
        $('id', data).parent().find('*').each(function () {
            var objCurrentElement = $(this);
            if (objCurrentElement.is("id")) {
                //push the current object to the array and nuke the current object
                objCurrentRow.id = objCurrentElement.text();
            }
            else if (objCurrentElement.is("sortingNumber")) {
                objCurrentRow.sortingNumber = objCurrentElement.text();
            }
            else if (objCurrentElement.is("IDA2A2")) {
                objCurrentRow.IDA2A2 = objCurrentElement.text();
            }
            else if (objCurrentElement.is("hbiLooperThread")) {
                objCurrentRow.hbiLooperThread = objCurrentElement.text();
            }
            else if (objCurrentElement.is("libraryItemReference")) {
                objCurrentRow.libraryItemReference = objCurrentElement.text();
            }
            else if (objCurrentElement.is("detailImage")) {
                objCurrentRow.detailImage = objCurrentElement.text();
            }
            else if (objCurrentElement.is("hbiGarmentUse")) {
                objCurrentRow.hbiGarmentUse = objCurrentElement.text();
            }
            else if (objCurrentElement.is("hbiGarmentUseDisplay")) {
                objCurrentRow.hbiGarmentUseDisplay = objCurrentElement.text();
            }
            else if (objCurrentElement.is("constructionPart")) {
                objCurrentRow.constructionPart = objCurrentElement.text();
            }
            else if (objCurrentElement.is("hbiNeedleColor")) {
                objCurrentRow.hbiNeedleColor = objCurrentElement.text();
            }
            else if (objCurrentElement.is("stitching")) {
                objCurrentRow.stitching = objCurrentElement.text();
            }
            else if (objCurrentElement.is("stitchingDisplay")) {
                objCurrentRow.stitchingDisplay = objCurrentElement.text();
            }
            else if (objCurrentElement.is("hbiSpi")) {
                objCurrentRow.hbiSpi = objCurrentElement.text();
            }
            else if (objCurrentElement.is("comments")) {
                objCurrentRow.comments = objCurrentElement.text();
            }
            else if (objCurrentElement.is("hbiGuageWidth")) {
                objCurrentRow.hbiGuageWidth = objCurrentElement.text();
            }
            else if (objCurrentElement.is("hbiLooperColor")) {
                objCurrentRow.hbiLooperColor = objCurrentElement.text();
            }
            else if (objCurrentElement.is("hbiNeedleThread")) {
                objCurrentRow.hbiNeedleThread = objCurrentElement.text();
            }
            else if (objCurrentElement.is("number")) {
                objCurrentRow.number = objCurrentElement.text();
            }
            else if (objCurrentElement.is("instruction")) {
                objCurrentRow.instruction = objCurrentElement.text();
            }
            else if (objCurrentElement.is("constructionPartDetail")) {
                objCurrentRow.constructionPartDetail = objCurrentElement.text();
            }
            else if (objCurrentElement.is("topStitch")) {
                objCurrentRow.topStitch = objCurrentElement.text();
            }
            else if (objCurrentElement.is("topStitchDisplay")) {
                objCurrentRow.topStitchDisplay = objCurrentElement.text();
            }
            else if (objCurrentElement.is("seamType")) {
                objCurrentRow.seamType = objCurrentElement.text();
            }
            else if (objCurrentElement.is("seamTypeDisplay")) {
                objCurrentRow.seamTypeDisplay = objCurrentElement.text();
                arrLowerScopeConstructionDetailArray.push(objCurrentRow)
                objCurrentRow = {};
            }

        });
        // and so on for each element that we want to capture


    });
    return arrLowerScopeConstructionDetailArray;


};


/*
param0 is the prefix that comes before windchill Servlet
param1 is for the number variable that is the branch id of the constructiondetail on the product
param2 is the garment product that will have its construction data modified to hold the ajax response
This function right now just returns the full xml document response, it needs to be refined to just return the relevant rows

*/

function getMyConstructionFromTask(hostUrlPrefix, numConstructionBranchId, objGarmentProductToModify) {
    var strTaskUrl = hostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/construction/FindConstructionInfo.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
    $.ajax({
        url: strTaskUrl,
        type: 'get',
        data: {
            oid: 'VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId,
            instance: 'net.hbi.res.wsflexappprd1v.windchillAdapter'
        },
        async: true

    }).done(function (data) {
        //this each should be used to iterate through the data response and create the structure required for the report
        //for the later garment product/pdf
        var objCurrentRow = {};
        $('*', data).each(function () {
            var objCurrentElement = $(this);
            if (objCurrentElement.is("id")) {
                //push the current object to the array and nuke the current object

            }
            else if (objCurrentElement.is("seamType")) {

            }

        });
        // and so on for each element that we want to capture
        objGarmentProductToModify.construction.constructionData = data;
        alert(objGarmentProductToModify.construction.constructionData);
    });


};


function processGarmentSpecs(specData) {
    currentGarmentProduct.name = $('Garment_product_Name', specData).first().text();
    var strGetColorwayPatternUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gProd=' + currentGarmentProduct.name + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9990008&action=ExecuteReport';
    $.get(strGetColorwayPatternUrl, function () { }).done(function (prodLinkData) {
        $('row', prodLinkData).each(function () {
            var objColorwayProduct = {};
            var objPatternProduct = {};
            objColorwayProduct.name = $(this).find('Colorway_Product_Name').text();
            objColorwayProduct.objectId = $(this).find('Colorway_Product_Name').attr('objectId');
            objColorwayProduct.branchId = $(this).find('Colorway_Product_Name').attr('branchId');
            objPatternProduct.name = $(this).find('Pattern_Product_Name').text();
            objPatternProduct.objectId = $(this).find('Pattern_Product_Name').attr('objectId');
            objPatternProduct.branchId = $(this).find('Pattern_Product_Name').attr('branchId');
            currentGarmentProduct.colorwayProduct = objColorwayProduct;
            currentGarmentProduct.patternProduct = objPatternProduct;
            currentGarmentProduct.objectId = $(this).find('Garment_Product_Name').attr('objectId');

        });
    }).done(function () {
        createRelatedProductsDiv();
    });
    localStorage.setItem('lastGarmentRan', currentGarmentProduct.name);
    $('#topLeftNav').text(currentGarmentProduct.name);
    var arrSpecArray = [];
    var arrSourceArray = [];
    var arrCombinationArray = [];
    $('row', specData).each(function () {
        var objSpec = {};
        objSpec.name = $(this).find('Spec_Name').text();
        objSpec.idNumber = $(this).find('specLink').attr('objectId');
        //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/TypeBasedIncludeServlet?oid=VR%3Acom.lcs.wc.specification.FlexSpecification%3A5532945&u8=1
        var strSpecName = $(this).find('Spec_Name').text();
        var strType = $(this).find('specLink').attr('type');
        var strHbiActiveSpec = $(this).find('hbiActiveSpec').text().substring(3, 6);
        console.log(strHbiActiveSpec);

        if (strSpecName.indexOf(strHbiActiveSpec) == -1) {
            objSpec.active = false;
        }
        else {
            objSpec.active = true;
        };
        var strId = objSpec.idNumber;
        var strReturnString = strLinkBeginTag + strTypeBaseLink + strType + strEncodeColonString + strId + strU8 + strLinkMidTag + strSpecName + strLinkCloseTag;
        objSpec.link = strReturnString
        arrSpecArray.push(objSpec);
        //moving to building products sources from the specs
        var objSource = {};
        objSource.name = $(this).find('Sourcing_Config_Name').text();
        objSource.idNumber = $(this).find('LCSSourcingConfig').attr('objectId');
        strType = $(this).find('LCSSourcingConfig').attr('type');
        strId = objSource.idNumber
        strReturnString = strLinkBeginTag + strTypeBaseLink + strType + strEncodeColonString + strId + strU8 + strLinkMidTag + strSpecName + strLinkCloseTag;
        objSource.link = strReturnString;
        var strPrimary = $(this).find('Primary_Source').text();
        objSource.primary = strPrimary == 1 ? true : false;
        arrSourceArray.push(objSource);
        //show viable combinations
        var objCombinationObject = {};
        objCombinationObject.sourceId = objSource.idNumber;
        objCombinationObject.sourceName = objSource.name;
        objCombinationObject.specId = objSpec.idNumber;
        objCombinationObject.specName = objSpec.name;
        objCombinationObject.seasonId = $(this).find('Garment_Season').attr('objectId');
        objCombinationObject.seasonName = $(this).find('Garment_Season_Season_Name').text();
        //objCombinationObject.seasonSpecCombo = "Season:" + objCombinationObject.seasonName + "_Spec:" + objCombinationObject.specName
        //trying this without season and spec literals to reduce button size
        objCombinationObject.seasonSpecCombo = "" + objCombinationObject.seasonName + " _src_" + objCombinationObject.sourceName + " _spec_" + objCombinationObject.specName
        arrCombinationArray.push(objCombinationObject);
    });
    arrSpecArray.reverse();
    arrSourceArray.reverse();
    arrCombinationArray.reverse();
    currentGarmentProduct.specs = arrSpecArray;
    currentGarmentProduct.sources = arrSourceArray;
    currentGarmentProduct.seasonSourceSpecCombos = arrCombinationArray;

    //$('#imagePages').prepend(appendBootStrapDivPage('specBtns', 0));
    $('body').append(appendBootStrapDivPage('specBtns', 0));
    $('#specBtns .container-fluid').prepend('<h3 class="clearOnForms col-xs-12 col-md-12">Select a season-source-spec combination</h3>');
    for (var i = 0; i < currentGarmentProduct.seasonSourceSpecCombos.length; i++) {
        //change this to actually show the possible combinations, then when we click on those we will use those
        //to get the components for the spec in question.

        $('#specBtns .container-fluid').append("<div class='row'><button class='btn spec col-md-12' gSpecId='" + currentGarmentProduct.seasonSourceSpecCombos[i].specId + "' >" + currentGarmentProduct.seasonSourceSpecCombos[i].seasonSpecCombo + "</button></div></br>");
        $('.spec').hide();

    };
    $('.spec').fadeIn("slow", function () { });
    //spec click has to be here since these do not exist when the document is created.
    $('.spec').click(function () {
        //alert('spec click!');
        $('.spec').removeClass('active');
        $(this).addClass('active');
        var strGarmentSpecId = $(this).attr('gSpecId');
        getSpecComponents(strGarmentSpecId);


    });
    //spec click has to be here since these do not exist when the document is created.
    $('#header').fadeOut("slow", function () { });

    //$('#navbar ul').first().append("<li><a href='#specs'>Specs</a></li>");
};


function processGarmentSpecsNoCompReport(specData, protGarmentProductToModify, hostUrlPrefix) {
    protGarmentProductToModify.name = $('Garment_product_Name', specData).first().text();
    if (typeof (hostUrlPrefix) == 'undefined') { hostUrlPrefix = 'http://wsflexwebprd1v.res.hbi.net/' };
    var strGetColorwayPatternUrl = hostUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gProd=' + currentGarmentProduct.name + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9990008&action=ExecuteReport';
    $.get(strGetColorwayPatternUrl, function () { }).done(function (prodLinkData) {
        $('row', prodLinkData).each(function () {
            var objColorwayProduct = {};
            var objPatternProduct = {};
            objColorwayProduct.name = $(this).find('Colorway_Product_Name').text();
            objColorwayProduct.objectId = $(this).find('Colorway_Product_Name').attr('objectId');
            objColorwayProduct.branchId = $(this).find('Colorway_Product_Name').attr('branchId');
            objPatternProduct.name = $(this).find('Pattern_Product_Name').text();
            objPatternProduct.objectId = $(this).find('Pattern_Product_Name').attr('objectId');
            objPatternProduct.branchId = $(this).find('Pattern_Product_Name').attr('branchId');
            protGarmentProductToModify.colorwayProduct = objColorwayProduct;
            protGarmentProductToModify.patternProduct = objPatternProduct;
            protGarmentProductToModify.objectId = $(this).find('Garment_Product_Name').attr('objectId');

        });
    }).done(function () {
        createRelatedProductsDiv();
    });
    localStorage.setItem('lastGarmentRan', currentGarmentProduct.name);
    $('#topLeftNav').text(currentGarmentProduct.name);
    var arrSpecArray = [];
    var arrSourceArray = [];
    var arrCombinationArray = [];
    $('row', specData).each(function () {
        var objSpec = {};
        objSpec.name = $(this).find('Spec_Name').text();
        objSpec.idNumber = $(this).find('specLink').attr('objectId');
        //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/TypeBasedIncludeServlet?oid=VR%3Acom.lcs.wc.specification.FlexSpecification%3A5532945&u8=1
        var strSpecName = $(this).find('Spec_Name').text();
        var strType = $(this).find('specLink').attr('type');
        var strHbiActiveSpec = $(this).find('hbiActiveSpec').text().substring(3, 6);

        if (strSpecName.indexOf(strHbiActiveSpec) == -1) {
            objSpec.active = false;
        }
        else {
            objSpec.active = true;
        };
        var strId = objSpec.idNumber;
        var strReturnString = strLinkBeginTag + strTypeBaseLink + strType + strEncodeColonString + strId + strU8 + strLinkMidTag + strSpecName + strLinkCloseTag;
        objSpec.link = strReturnString
        arrSpecArray.push(objSpec);
        //moving to building products sources from the specs
        var objSource = {};
        objSource.name = $(this).find('Sourcing_Config_Name').text();
        objSource.idNumber = $(this).find('LCSSourcingConfig').attr('objectId');
        strType = $(this).find('LCSSourcingConfig').attr('type');
        strId = objSource.idNumber
        strReturnString = strLinkBeginTag + strTypeBaseLink + strType + strEncodeColonString + strId + strU8 + strLinkMidTag + strSpecName + strLinkCloseTag;
        objSource.link = strReturnString;
        var strPrimary = $(this).find('Primary_Source').text();
        objSource.primary = strPrimary == 1 ? true : false;
        arrSourceArray.push(objSource);
        //show viable combinations
        var objCombinationObject = {};
        objCombinationObject.sourceId = objSource.idNumber;
        objCombinationObject.sourceName = objSource.name;
        objCombinationObject.specId = objSpec.idNumber;
        objCombinationObject.specName = objSpec.name;
        objCombinationObject.seasonId = $(this).find('Garment_Season').attr('objectId');
        objCombinationObject.seasonName = $(this).find('Garment_Season_Season_Name').text();
        //objCombinationObject.seasonSpecCombo = "Season:" + objCombinationObject.seasonName + "_Spec:" + objCombinationObject.specName
        //trying this without season and spec literals to reduce button size
        objCombinationObject.seasonSpecCombo = "" + objCombinationObject.seasonName + " _src_" + objCombinationObject.sourceName + " _spec_" + objCombinationObject.specName
        arrCombinationArray.push(objCombinationObject);
    });
    arrSpecArray.reverse();
    arrSourceArray.reverse();
    arrCombinationArray.reverse();
    protGarmentProductToModify.specs = arrSpecArray;
    protGarmentProductToModify.sources = arrSourceArray;
    protGarmentProductToModify.seasonSourceSpecCombos = arrCombinationArray;

    //This is where you need to add in getSpecComps for activeSpec 
    for (var i = 0; i < protGarmentProductToModify.specs.length; i++) {
        if (protGarmentProductToModify.specs[i].active) {
            getSpecComponentsForActiveSpec(protGarmentProductToModify.specs[i].id, hostUrlPrefix, protGarmentProductToModify);
        };
    };



};



function processGarmentSpecsNoCompReportAndGetAllData(specData, protGarmentProductToModify, hostUrlPrefix) {
    protGarmentProductToModify.name = $('Garment_product_Name', specData).first().text();
    if (typeof (hostUrlPrefix) == 'undefined') { hostUrlPrefix = 'http://wsflexwebprd1v.res.hbi.net/' };
    var strGetColorwayPatternUrl = hostUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gProd=' + currentGarmentProduct.name + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9990008&action=ExecuteReport';
    $.get(strGetColorwayPatternUrl, function () { }).done(function (prodLinkData) {
        $('row', prodLinkData).each(function () {
            var objColorwayProduct = {};
            var objPatternProduct = {};
            objColorwayProduct.name = $(this).find('Colorway_Product_Name').text();
            objColorwayProduct.objectId = $(this).find('Colorway_Product_Name').attr('objectId');
            objColorwayProduct.branchId = $(this).find('Colorway_Product_Name').attr('branchId');
            objPatternProduct.name = $(this).find('Pattern_Product_Name').text();
            objPatternProduct.objectId = $(this).find('Pattern_Product_Name').attr('objectId');
            objPatternProduct.branchId = $(this).find('Pattern_Product_Name').attr('branchId');
            protGarmentProductToModify.colorwayProduct = objColorwayProduct;
            protGarmentProductToModify.patternProduct = objPatternProduct;
            protGarmentProductToModify.objectId = $(this).find('Garment_Product_Name').attr('objectId');

        });
    }).done(function () {
        //createRelatedProductsDiv();
    });
    localStorage.setItem('lastGarmentRan', currentGarmentProduct.name);
    $('#topLeftNav').text(currentGarmentProduct.name);
    var arrSpecArray = [];
    var arrSourceArray = [];
    var arrCombinationArray = [];
    $('row', specData).each(function () {
        var objSpec = {};
        objSpec.name = $(this).find('Spec_Name').text();
        objSpec.idNumber = $(this).find('specLink').attr('objectId');
        //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/TypeBasedIncludeServlet?oid=VR%3Acom.lcs.wc.specification.FlexSpecification%3A5532945&u8=1
        var strSpecName = $(this).find('Spec_Name').text();
        var strType = $(this).find('specLink').attr('type');
        var strHbiActiveSpec = $(this).find('hbiActiveSpec').text().substring(3, 6);

        if (strSpecName.indexOf(strHbiActiveSpec) == -1) {
            objSpec.active = false;
        }
        else {
            objSpec.active = true;
        };
        var strId = objSpec.idNumber;
        var strReturnString = strLinkBeginTag + strTypeBaseLink + strType + strEncodeColonString + strId + strU8 + strLinkMidTag + strSpecName + strLinkCloseTag;
        objSpec.link = strReturnString
        arrSpecArray.push(objSpec);
        //moving to building products sources from the specs
        var objSource = {};
        objSource.name = $(this).find('Sourcing_Config_Name').text();
        objSource.idNumber = $(this).find('LCSSourcingConfig').attr('objectId');
        strType = $(this).find('LCSSourcingConfig').attr('type');
        strId = objSource.idNumber
        strReturnString = strLinkBeginTag + strTypeBaseLink + strType + strEncodeColonString + strId + strU8 + strLinkMidTag + strSpecName + strLinkCloseTag;
        objSource.link = strReturnString;
        var strPrimary = $(this).find('Primary_Source').text();
        objSource.primary = strPrimary == 1 ? true : false;
        arrSourceArray.push(objSource);
        //show viable combinations
        var objCombinationObject = {};
        objCombinationObject.sourceId = objSource.idNumber;
        objCombinationObject.sourceName = objSource.name;
        objCombinationObject.specId = objSpec.idNumber;
        objCombinationObject.specName = objSpec.name;
        objCombinationObject.seasonId = $(this).find('Garment_Season').attr('objectId');
        objCombinationObject.seasonName = $(this).find('Garment_Season_Season_Name').text();
        //objCombinationObject.seasonSpecCombo = "Season:" + objCombinationObject.seasonName + "_Spec:" + objCombinationObject.specName
        //trying this without season and spec literals to reduce button size
        objCombinationObject.seasonSpecCombo = "" + objCombinationObject.seasonName + " _src_" + objCombinationObject.sourceName + " _spec_" + objCombinationObject.specName
        arrCombinationArray.push(objCombinationObject);
    });
    arrSpecArray.reverse();
    arrSourceArray.reverse();
    arrCombinationArray.reverse();
    protGarmentProductToModify.specs = arrSpecArray;
    protGarmentProductToModify.sources = arrSourceArray;
    protGarmentProductToModify.seasonSourceSpecCombos = arrCombinationArray;

    //This is where you need to add in getSpecComps for activeSpec 
    for (var i = 0; i < protGarmentProductToModify.specs.length; i++) {
        if (protGarmentProductToModify.specs[i].active) {
            //getSpecComponentsForActiveSpec(protGarmentProductToModify.specs[i].id, hostUrlPrefix, protGarmentProductToModify);
            protGarmentProductToModify.activeSpecId = protGarmentProductToModify.specs[i].id;
            protGarmentProductToModify.getAllMyDataForMyActiveSpec(hostUrlPrefix, protGarmentProductToModify.activeSpecId);
        };
    };



};

//this serves as the callbackfunction for the class to complete construction
/*
function thenCallSpecs(objectForCallback, selfReference) {
    selfReference.specs = objectForCallback.arrSpecArray
    selfReference.sources = objectForCallback.arrSourceArray
    selfReference.seasonSourceSpecCombos = objectForCallback.arrCombinationArray
    selfReference.activeSpecId = objectForCallback.activeSpecId;
    selfReference.name = objectForCallback.gProdName;
    selfReference.getAllMyDataForMyActiveSpec(strUrlPrefix, selfReference.activeSpecId, selfReference);

};*/


function getSpecComponentsForActiveSpec(specId, hostUrlPrefix, protGarmentProductToModify) {

    //compose url variables for ajax calls
    var strSpecGetUrl = hostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9999594&action=ExecuteReport"
    var strDocumentsUrl = hostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9996723&action=ExecuteReport";
    var strMeasurementsUrl = hostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&garmentProductName=" + currentGarmentProduct.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953962&action=ExecuteReport";
    var strConstructionsUrl = "http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&garmentProductName=" + currentGarmentProduct.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10343155&action=ExecuteReport";
    var strBomsUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&garmentProductName=" + currentGarmentProduct.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953826&action=ExecuteReport";
    //compose url variables for ajax calls
    var arrDocuments = [];
    var arrBoms = [];
    var arrTableDataArray = [];

    $.get(strDocumentsUrl, function () { }).done(function (data) {
        //document actions

        /*
        omissions or contingencies and caveats
        1.omit image pages on pattern product that are 'front/back' image page type

        */
        $('row', data).each(function () {
            var strImgViewerPrefix1 = strUrlPrefix + 'Windchill/rfa/jsp/image/ImageViewer.jsp?imageUrl=&appDataOid=OR:wt.content.ApplicationData:';
            var strImgViewerPrefix2 = '&contentHolderOid=OR:com.lcs.wc.document.LCSDocument:';
            //this will need to be changed to http protocl once migrated
            var strImgViewerPrefix3 = "file://res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/Prod/";
            //Above URL is for testing when using a file protocl offline, switching below to dev http url
            //this will need to be changed to http protocl once migrated
            //dev version of URL
            //var strImgViewerPrefix3 = "http://res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/Prod/";
            var name = $(this).find('Document_Master_Name').text();
            var strpSpecId = $(this).find('patternSpecId').text();
            var strgSpecId = $(this).find('garmentSpecId').text();
            var strCompSpecId = $(this).find('comRefSpecId').text();
            if ($(this).is('row:first')) {
                var objGSpec = {};
                var objPSpec = {};
                objGSpec.currentGarmentSpecId = $(this).find('garmentSpecId').text();
                objPSpec.currentGarmentSpecId = $(this).find('patternSpecId').text();
                objGSpec.name = $(this).find('gSpecName').text();
                objPSpec.name = $(this).find('pSpecName').text();
                protGarmentProductToModify.currentGarmentSpec = objGSpec;
                protGarmentProductToModify.currentPatternSpec = objPSpec;
            };
            //console.log(name);
            objComponent = {};
            objComponent.name = name;
            objComponent.componentType = 'Document';
            objComponent.masterId = $(this).find('Document_Master').attr('objectId');
            objComponent.documentType = $(this).find('Component_Type').text();
            objComponent.fileName = $(this).find('fileName').text();
            objComponent.vaultFileName = $(this).find('fileNameOnVault').text();
            objComponent.fullVaultUrl = strImgViewerPrefix3 + objComponent.vaultFileName;
            objComponent.seqeuence = $(this).find('Unique_Sequence_Number').text();
            objComponent.imgSrcUrl = objComponent.seqeuence + " " + objComponent.fileName;
            objComponent.dataUri = 'initial value';
            objComponent.description = $(this).find('Description').text();
            var strStartPointSubString = objComponent.description.substring(11, objComponent.description.length);
            var numLengthStartPoint = strStartPointSubString.search('x') + 1;
            var numNumCharsOfWidth = numLengthStartPoint - 1;
            var numWidth = strStartPointSubString.substring(0, numNumCharsOfWidth);
            var numLength = strStartPointSubString.substring(numLengthStartPoint, strStartPointSubString.length);
            objComponent.width = numWidth;
            objComponent.height = numLength;
            var roleA = $(this).find('roleAObjectRef_key_id').text();
            var roleB = $(this).find('roleBObjectRef_key_id').text();
            //objComponent.iframe = '<div class="item"><img width="' + objComponent.width + '" height="' + objComponent.height + '" class="hideIframe" src="' + strImgViewerPrefix1 + roleB + strImgViewerPrefix2 + roleA + '" border="1"></img></div>';
            convertImgToBase64(strImgViewerPrefix3 + objComponent.vaultFileName, function (base64Img) {
                //console.log('IMAGE:', base64Img);
                objComponent.dataUri = 'IMAGE:', base64Img;

            });
            //objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><img width="' + objComponent.width + '" height="' + objComponent.length + '" class="img-responsive hideImg" src="' + strImgViewerPrefix3 + objComponent.vaultFileName + '" /></div>';
            objComponent.imageUrl = '<img width="' + objComponent.width + '" height="' + objComponent.length + '" class="img-responsive" src="' + objComponent.fullVaultUrl + '" />';
            //objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><img width="800" height="800" src="' + strImgViewerPrefix3 + objComponent.vaultFileName + '" /></div>';
            //later will change this to img in order to test it.



            if (strpSpecId == strCompSpecId) {
                objComponent.ownerType = 'Pattern';
            }
            else {
                objComponent.ownerType = 'Garment';
            };

            arrDocuments.push(objComponent);
            arrTableDataArray.push(objComponent);
        });
        protGarmentProductToModify.documents = arrDocuments;

        //document actions

        $.get(strMeasurementsUrl, function () { }).done(function (data) {
            //measurement actions
            $('row', data).each(function () {
                var name = $(this).find('Measurements_Name').text();
                //console.log(name);
                objComponent = {};
                objComponent.name = name;
                objComponent.componentType = 'Measurement';
                objComponent.ownerType = 'Pattern';
                objComponent.fileName = "";
                objComponent.imageUrl = "<img src='' />";
                protGarmentProductToModify.measurement = objComponent;
                arrTableDataArray.push(objComponent);
            });
            //measurement actions
            $.get(strConstructionsUrl, function () { }).done(function (data) {
                //construction actions
                $('row', data).each(function () {
                    var name = $(this).find('Construction_Info_Name').text();
                    //console.log(name);
                    objComponent = {};
                    objComponent.name = name;
                    objComponent.componentType = 'Construction';
                    objComponent.ownerType = 'Pattern';
                    objComponent.fileName = "";
                    objComponent.imageUrl = "<img src='' />";
                    objComponent.branchId = $(this).find('branchIdForTask').text();
                    protGarmentProductToModify.construction = objComponent;
                    arrTableDataArray.push(objComponent);
                });
                //construction actions
                $.get(strBomsUrl, function () { }).done(function (data) {
                    //BOM actions

                    $('row', data).each(function () {
                        var name = $(this).find('com_lcs_wc_flexbom_FlexBOMPart_Name').text();
                        var strpBomSpecId = $(this).find('pSpecId').text();
                        var strgBomSpecId = $(this).find('gSpecId').text();
                        var strBomCompSpecId = $(this).find('comRefSpecId').text();
                        //console.log(name);
                        objComponent = {};
                        objComponent.name = name;
                        objComponent.fileName = "";
                        objComponent.componentType = 'BOM';
                        objComponent.imageUrl = "<img src='' />";
                        var strFlexBomType = $(this).find('Flex_Type_Type_Name').text();
                        var regPprod = new RegExp("Pattern");
                        var regGprod = new RegExp("Garment");
                        if (regPprod.test(strFlexBomType)) {
                            objComponent.ownerType = 'Pattern';
                        }
                        else if (regGprod.test(strFlexBomType)) {
                            objComponent.ownerType = 'Garment';
                        };


                        arrTableDataArray.push(objComponent);
                        arrBoms.push(objComponent);

                    });
                    protGarmentProductToModify.boms = arrBoms;



                });
            });
        })
    }).done(function () {


    });





};

function getSpecComponents(specId) {
    /*
    Note that the actual Garment Product components look like they are going to be just BOMs and Images.
    Will need to look at other queries to see how I pulled in construction and measurements from linked Pattern Products in order to get the full list
    Also Colorway Product.
    Maybe at the point that the season source spec combos show we should pull down the Colorway Product and Pattern Product as well.

    */

    //compose url variables for ajax calls
    var strSpecGetUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9999594&action=ExecuteReport"
    var strDocumentsUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9996723&action=ExecuteReport";
    var strMeasurementsUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&garmentProductName=" + currentGarmentProduct.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953962&action=ExecuteReport";
    var strConstructionsUrl = "http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&garmentProductName=" + currentGarmentProduct.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10343155&action=ExecuteReport";
    var strBomsUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&garmentProductName=" + currentGarmentProduct.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953826&action=ExecuteReport";
    //compose url variables for ajax calls
    var arrTableDataArray = [];
    $('#specs,.specbr').fadeOut("slow", function () { });


    $.get(strDocumentsUrl, function () { }).done(function (data) {
        //document actions
        var arrDocuments = [];
        /*
        omissions or contingencies and caveats
        1.omit image pages on pattern product that are 'front/back' image page type

        */
        $('row', data).each(function () {
            var strImgViewerPrefix1 = strUrlPrefix + 'Windchill/rfa/jsp/image/ImageViewer.jsp?imageUrl=&appDataOid=OR:wt.content.ApplicationData:';
            var strImgViewerPrefix2 = '&contentHolderOid=OR:com.lcs.wc.document.LCSDocument:';
            //this will need to be changed to http protocl once migrated
            var strImgViewerPrefix3 = "file://res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/Prod/";
            //Above URL is for testing when using a file protocl offline, switching below to dev http url
            //this will need to be changed to http protocl once migrated
            //dev version of URL
            //var strImgViewerPrefix3 = "http://res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/Prod/";
            var name = $(this).find('Document_Master_Name').text();
            var strpSpecId = $(this).find('patternSpecId').text();
            var strgSpecId = $(this).find('garmentSpecId').text();
            var strCompSpecId = $(this).find('comRefSpecId').text();
            if ($(this).is('row:first')) {
                var objGSpec = {};
                var objPSpec = {};
                objGSpec.currentGarmentSpecId = $(this).find('garmentSpecId').text();
                objPSpec.currentGarmentSpecId = $(this).find('patternSpecId').text();
                objGSpec.name = $(this).find('gSpecName').text();
                objPSpec.name = $(this).find('pSpecName').text();
                currentGarmentProduct.currentGarmentSpec = objGSpec;
                currentGarmentProduct.currentPatternSpec = objPSpec;
            };
            //console.log(name);
            objComponent = {};
            objComponent.name = name;
            objComponent.componentType = 'Document';
            objComponent.masterId = $(this).find('Document_Master').attr('objectId');
            objComponent.documentType = $(this).find('Component_Type').text();
            objComponent.fileName = $(this).find('fileName').text();
            objComponent.vaultFileName = $(this).find('fileNameOnVault').text();
            objComponent.fullVaultUrl = strImgViewerPrefix3 + objComponent.vaultFileName;
            objComponent.seqeuence = $(this).find('Unique_Sequence_Number').text();
            objComponent.imgSrcUrl = objComponent.seqeuence + " " + objComponent.fileName;
            objComponent.dataUri = 'initial value';
            objComponent.description = $(this).find('Description').text();
            var strStartPointSubString = objComponent.description.substring(11, objComponent.description.length);
            var numLengthStartPoint = strStartPointSubString.search('x') + 1;
            var numNumCharsOfWidth = numLengthStartPoint - 1;
            var numWidth = strStartPointSubString.substring(0, numNumCharsOfWidth);
            var numLength = strStartPointSubString.substring(numLengthStartPoint, strStartPointSubString.length);
            objComponent.width = numWidth;
            objComponent.height = numLength;
            var roleA = $(this).find('roleAObjectRef_key_id').text();
            var roleB = $(this).find('roleBObjectRef_key_id').text();
            //objComponent.iframe = '<div class="item"><img width="' + objComponent.width + '" height="' + objComponent.height + '" class="hideIframe" src="' + strImgViewerPrefix1 + roleB + strImgViewerPrefix2 + roleA + '" border="1"></img></div>';
            convertImgToBase64(strImgViewerPrefix3 + objComponent.vaultFileName, function (base64Img) {
                //console.log('IMAGE:', base64Img);
                objComponent.dataUri = 'IMAGE:', base64Img;

            });
            //objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><img width="' + objComponent.width + '" height="' + objComponent.length + '" class="img-responsive hideImg" src="' + strImgViewerPrefix3 + objComponent.vaultFileName + '" /></div>';
            objComponent.imageUrl = '<img width="' + objComponent.width + '" height="' + objComponent.length + '" class="img-responsive" src="' + objComponent.fullVaultUrl + '" />';
            //objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><img width="800" height="800" src="' + strImgViewerPrefix3 + objComponent.vaultFileName + '" /></div>';
            //later will change this to img in order to test it.



            if (strpSpecId == strCompSpecId) {
                objComponent.ownerType = 'Pattern';
            }
            else {
                objComponent.ownerType = 'Garment';
            };

            arrDocuments.push(objComponent);
            arrTableDataArray.push(objComponent);
        });
        currentGarmentProduct.documents = arrDocuments;

        //document actions

        $.get(strMeasurementsUrl, function () { }).done(function (data) {
            //measurement actions
            $('row', data).each(function () {
                var name = $(this).find('Measurements_Name').text();
                //console.log(name);
                objComponent = {};
                objComponent.name = name;
                objComponent.componentType = 'Measurement';
                objComponent.ownerType = 'Pattern';
                objComponent.fileName = "";
                objComponent.imageUrl = "<img src='' />";
                currentGarmentProduct.measurement = objComponent;
                arrTableDataArray.push(objComponent);
            });
            //measurement actions
            $.get(strConstructionsUrl, function () { }).done(function (data) {
                //construction actions
                $('row', data).each(function () {
                    var name = $(this).find('Construction_Info_Name').text();
                    //console.log(name);
                    objComponent = {};
                    objComponent.name = name;
                    objComponent.componentType = 'Construction';
                    objComponent.ownerType = 'Pattern';
                    objComponent.fileName = "";
                    objComponent.imageUrl = "<img src='' />";
                    objComponent.branchId = $(this).find('branchIdForTask').text();
                    currentGarmentProduct.construction = objComponent;
                    arrTableDataArray.push(objComponent);
                });
                //construction actions
                $.get(strBomsUrl, function () { }).done(function (data) {
                    //BOM actions
                    var arrBoms = [];
                    $('row', data).each(function () {
                        var name = $(this).find('com_lcs_wc_flexbom_FlexBOMPart_Name').text();
                        var strpBomSpecId = $(this).find('pSpecId').text();
                        var strgBomSpecId = $(this).find('gSpecId').text();
                        var strBomCompSpecId = $(this).find('comRefSpecId').text();
                        //console.log(name);
                        objComponent = {};
                        objComponent.name = name;
                        objComponent.fileName = "";
                        objComponent.componentType = 'BOM';
                        objComponent.imageUrl = "<img src='' />";
                        var strFlexBomType = $(this).find('Flex_Type_Type_Name').text();
                        var regPprod = new RegExp("Pattern");
                        var regGprod = new RegExp("Garment");
                        if (regPprod.test(strFlexBomType)) {
                            objComponent.ownerType = 'Pattern';
                        }
                        else if (regGprod.test(strFlexBomType)) {
                            objComponent.ownerType = 'Garment';
                        };


                        arrTableDataArray.push(objComponent);
                        arrBoms.push(objComponent);

                    });
                    currentGarmentProduct.boms = arrBoms;
                    //BOM actions
                    //nuke old spec tables
                    $('#specs,.specbr').remove();
                    //console.log(arrTableDataArray);
                    arrHeaderArray = ['Component Type', 'Owner', 'Component Name', 'Preview Image'];
                    var strTableStringToAppend = createBaseDataTableHtml('components', arrHeaderArray);
                    var strSpecsDivString = appendBootStrapDivPage('specs', 1);
                    $('body').append('</br class="specbr"></br class="specbr">');
                    $('body').append(strSpecsDivString);
                    $('#specs .container-fluid .row').append(strTableStringToAppend);
                    $('#specs,.specbr').hide().fadeIn("slow", function () { });;
                    $('#components').DataTable({
                        data: arrTableDataArray,
                        columns: [
                            { data: 'componentType' },
                            { data: 'ownerType' },
                            { data: 'name' },
                            //{ data: 'fileName' },
                            { data: 'imageUrl' }

                        ]
                        //too many column params or trying to parse an object when you need just string variables.
                    });



                });
            });
        })
    }).done(function () {




        var arrBase64Array = [];


        for (var j = 0; j < currentGarmentProduct.documents.length; j++) {
            var objDoc = {};
            var strCurrentImageSrc = "";
            var strLastImageSrc = "";
            objDoc.document = currentGarmentProduct.documents[j];

            convertImgToBase64(currentGarmentProduct.documents[j].fullVaultUrl, function (base64Img) {
                //strCurrentImageSrc = currentGarmentProduct.documents[j].fullVaultUrl;

                var imgForDoc = new Image();
                imgForDoc.src = base64Img
                //creating this 'new Image()' object 

                objDoc.imageBase = imgForDoc;
                //console.log(objDoc);
                //console.log(imgForDoc);
                currentGarmentProduct.documents[j] = objDoc;
                arrBase64Array.push(objDoc);
                strLastImageSrc = currentGarmentProduct.documents[j].fullVaultUrl

            })

        };
        currentGarmentProduct.base64DocumentArray = arrBase64Array;
        console.log(currentGarmentProduct);

    });
};

