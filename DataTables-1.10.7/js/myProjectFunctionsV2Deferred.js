/// <reference path="../Scripts/jquery-2.1.0-vsdoc.js" />
/// <reference path="../Scripts/jquery-2.1.4.js" />
/// <reference path="../Scripts/jquery-2.1.4.intellisense.js" />
/// <reference path="myReportGeneratorFunctions.js" />
/// <reference path="../DataTables-1.10.1/media/js/jquery.dataTables.js" />
/**
* @class  garmentProduct 
* @param {String} strName Defines the name of the Garment Product itself
* @param {Array} arrAttributes Defines the set of attributes that would need to be pulled from the Garment Product itself for headers etc or just for general display but for which no linkage is created
* @param {Array} arrSpecs an array of the specs that are in the garment product
* @param {Array} arrSources an array of the Sources that are in the garment product
* @param {Object} objColorwayProduct The linked Colorway Product Object.  Later a corresponding Class May be Created
* @param {Object} objPatternProduct The linked Pattern Product Object.  Later a corresponding Class May be Created
* @param {Object} objLabelProduct The linked Label Product Object.  Later a corresponding Class May be Created
* @param {Object} objSellingProduct The linked Selling Product Object.  Later a corresponding Class May be Created
* @param {Array} arrBoms an array of the BOMs that are in the garment product, these will and should be paired down to only be those coming from the active spec
* @param {Array} arrSeasonSourceSpecCombos an array of viable combinations of season/source/spec
* @param {Array} arrDocuments an array of the doucments that are in the garment product
* @param {Object} objMeasurement an object containing the branch id and objectId of the LCSMeasurement class, does not contain the individual POMs etc et at this point in this object
* @param {Object} objConstruction an object containing the branch id and objectId of the LCSConstruction class, does not contain the individual POMs etc et at this point in this object
* @param {String} strObjectId a string denoting the objecId of the LCSProduct that is the garment product
* @param {Object} objGSpec an object container for the active garment spec
* @param {Object} objPSpec an object container for the active pattern spec
* @param {Array} arrBase64Documents not sure yet if will be used
* @param {Array} arrConstructionInfo not sure yet if will be used
* @param {Object} objconstructionDetail container for the individual poms of objConstruction
* @param {Object} objMeasurementDetail container for the individual poms of objMeasurement
* @param {String} strSpecId a string denoting the objectId of the LCSFlexSpecification which is the active spec
* @param {String} strSpecName a string denoting the name of the LCSFlexSpecification which is the active spec
* @param {String} strActiveSeasonName a string denoting the name of the current season
* @param {String} strMeasTableString a string representing the whole table of the measurements
* @param {String} strBaseSize a string representing the base/sample size of the product measurements
* @param {String} strSizeRun a string representing the whole size definition delimited by ~*~
* @param {Array} arrDisplayKeys keys for att value lists with matching index positions in arrDisplay values
* @param {Array} arrDisplayValues see arrDisplayKeys
* @param {Array} arrBlockWeightsSpread 
* @param {String} strBlockWeightsSpreadTableString
* @param {Array} arrBlockWeightsTrim
* @param {Array} arrColorways 
* @param {Array} arrColorwayData 
*
*/
function garmentProduct(strName, arrAttributes, arrSpecs, arrSources, objColorwayProduct, objPatternProduct, objLabelProduct, objSellingProduct, arrBoms, arrSeasonSourceSpecCombos, arrDocuments, objMeasurement, objConstruction, strObjectId, objGSpec, objPSpec, arrBase64Documents, arrConstructionInfo, objconstructionDetail, objMeasurementDetail, strSpecId, strSpecName, strActiveSeasonName, strMeasTableString, strConstructionTableString, strBaseSize, strSizeRun, arrDisplayKeys, arrDisplayValues, strBlockWeightsSpreadTableString, arrBlockWeightsSpread, arrBlockWeightsTrim, arrColorways, strTrimSpreadTableString) {
    this.specs = arrSpecs;
    this.attributes = arrAttributes;
    this.name = strName;
    this.sources = arrSources;
    this.colorwayProduct = objColorwayProduct;
    this.patternProduct = objPatternProduct;
    this.labelProduct = objLabelProduct;
    this.sellingProduct = objSellingProduct;
    this.boms = arrBoms;
    this.seasonSourceSpecCombos = arrSeasonSourceSpecCombos;
    this.documents = arrDocuments;
    this.measurement = objMeasurement;
    this.measurementDetail = objMeasurementDetail;
    this.construction = objConstruction;
    this.constructionInfo = arrConstructionInfo;
    this.constructionDetail = objconstructionDetail;
    this.objectId = strObjectId;
    this.currentGarmentSpec = objGSpec;
    this.currentPatternSpec = objPSpec;
    this.activeSpecId = strSpecId;
    this.activeSeason = strActiveSeasonName;
    this.activeSpecName = strSpecName;
    this.base64DocumentArray = arrBase64Documents;
    this.constructionTableString = strConstructionTableString;
    this.measurementTableString = strMeasTableString;
    this.baseSize = strBaseSize;
    this.sizeRun = strSizeRun;
    this.garmentDoc = new jsPDF('landscape');
    this.displayKeys = arrDisplayKeys
    this.displayValues = arrDisplayValues
    this.blockWeightSpread = arrBlockWeightsSpread;
    this.getMyBlockWeightsTrim = arrBlockWeightsTrim;
    this.colorways = arrColorways;
    //this.colorwayDetails = arrColorwayData;
    //moved to be a property of colorwayobj
    this.blockWeightsSpreadTableString = strBlockWeightsSpreadTableString;
    this.blockWeightsTrimTableString = strTrimSpreadTableString;
};
var fs = require('fs.extra');
var execFile = require('child_process').execFile, child;
var wkhtmltopdf = require('wkhtmltopdf');
var gui = require('nw.gui');
/**
 * @method of @class GarmentProduct
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the construction sits.  All string prior to Windchill.
 * @param {Number} numConstructionBranchId takes the branch id from objConstruction (preferrably) and then turn later constructionDetail of the garmentProduct which runs this to contain all the POMs etc.
 *
 */
garmentProduct.prototype.getMyConstruction = function (strHostUrlPrefix, numConstructionBranchId, constructionData, objSelfReference) {
    var objCurrentRow = {};
    var arrCurrentConstruction = [];
    //namespace is harder to grab so just grabbing the parant element of the first element and then iterating through those
    //need to change this later to correctly use the namespace but, working for now.
    //this probably needs to be changed to a switch case but not a high priority...
    $('id', constructionData).parent().find('*').each(function () {
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
            var strKey = objCurrentElement.text();
            objCurrentRow.hbiLooperThread = getValueDisplayFromKey(strKey, objSelfReference);
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
            var strKey = objCurrentElement.text();
            objCurrentRow.hbiGuageWidth = getValueDisplayFromKey(strKey, objSelfReference);
        }
        else if (objCurrentElement.is("hbiLooperColor")) {
            objCurrentRow.hbiLooperColor = objCurrentElement.text();
        }
        else if (objCurrentElement.is("hbiNeedleThread")) {
            var strKey = objCurrentElement.text();
            objCurrentRow.hbiNeedleThread = getValueDisplayFromKey(strKey, objSelfReference);
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
            arrCurrentConstruction.push(objCurrentRow)
            objCurrentRow = {};
        }

    });
    // and so on for each element that we want to capture
    objSelfReference.constructionDetail = arrCurrentConstruction;
    var strTableHeaderString = '<thead><tr><th>Sorting Number</th><th>Sewing Operation</th><th>Stitch Type / Description</th><th>Gauge Width</th><th>SPI</th><th>Seam/Trimoff Allowance</th><th>Garment Use</th><th>Needle Thread</th><th>Needle Visibility</th><th>Looper Thread</th><th>Looper Visbility</th><th>Comments</th></tr></thead>';
    var strTableBodyString = '<tbody>';
    for (var j = 0; j < objSelfReference.constructionDetail.length; j++) {
        var objThisRow = objSelfReference.constructionDetail[j];
        strTableBodyString += '<tr><td>' + objThisRow.sortingNumber + '</td>';
        strTableBodyString += '<td>' + objThisRow.number + '</td>';
        strTableBodyString += '<td>' + objThisRow.stitchingDisplay + '</td>';
        strTableBodyString += '<td>' + objThisRow.hbiGuageWidth + '</td>';
        strTableBodyString += '<td>' + objThisRow.hbiSpi + '</td>';
        strTableBodyString += '<td>' + objThisRow.seamTypeDisplay + '</td>';
        strTableBodyString += '<td>' + objThisRow.hbiGarmentUseDisplay + '</td>';
        strTableBodyString += '<td>' + objThisRow.hbiNeedleThread + '</td>';
        strTableBodyString += '<td>' + objThisRow.hbiNeedleColor + '</td>';
        strTableBodyString += '<td>' + objThisRow.hbiLooperThread + '</td>';
        strTableBodyString += '<td>' + objThisRow.hbiLooperColor + '</td>';
        strTableBodyString += '<td>' + objThisRow.comments + '</td>';
    };
    strTableBodyString += '</tr>';
    strTableBodyString += '</tbody>';
    objSelfReference.constructionTableString = '<h1>Constructions</h1><table id="construction" class="display responsive col-md-12 compact cell-border">' + strTableHeaderString + strTableBodyString + '</table>';
};
/**
 * @comment Still need to add logic here to deal with size variation and variable columns as a result; this is currently ran within @method getSpecComponentsForActiveSpec
 * @comment SIZE LOGIC NOW DEALT WITH
 * @method of @class GarmentProduct
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {Number} numMeasurementBranchId takes the branch id from objMeasurement (preferrably) and then turns measurementDetail of the garmentProduct which runs this to contain all the POMs etc.
 *
 */
garmentProduct.prototype.getMyMeasurement = function (strHostUrlPrefix, numMeasurementBranchId, measurementData, objSelfReference) {
    //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml?oid=VR:com.lcs.wc.measurements.LCSMeasurements:2394285&instance=net.hbi.res.wsflexappprd1v.windchillAdapter
    var strTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
    var arrCurrentMeasurement = [];
    $('id', measurementData).parent().each(function () {
        var objRow = {};
        objRow.id = $(this).find('id ').text();
        objRow.sortingNumber = $(this).find('sortingNumber').text();
        objRow.name = $(this).find('name ').text();
        objRow.point1 = $(this).find('point1 ').text();
        objRow.point2 = $(this).find('point2 ').text();
        objRow.plusTolerance = $(this).find('plusTolerance').first().text();
        objRow.minusTolerance = $(this).find('minusTolerance').first().text();
        objRow.IDA2A2 = $(this).find('IDA2A2').text();
        objRow.pointsOfMeasureType = $(this).find('pointsOfMeasureType').text();
        objRow.effectSequence = $(this).find('effectSequence ').text();
        objRow.hbiPatternPiece = $(this).find('hbiPatternPiece ').text();
        objRow.placementAmountKey = $(this).find('placementAmount ').text();
        objRow.placementAmount = getValueDisplayFromKey(objRow.placementAmountKey, objSelfReference);
        objRow.actualMeasurement = $(this).find('actualMeasurement ').text();
        objRow.Illustration = $(this).find('Illustration ').text();
        objRow.measurementName = $(this).find('measurementName').text();
        objRow.section = $(this).find('section ').text();
        objRow.hbiGradeCode = $(this).find('hbiGradeCode').text();
        objRow.hbiPiecesPerGarment = $(this).find('hbiPiecesPerGarment').text();
        objRow.htmInstruction = $(this).find('htmInstruction ').text();
        objRow.quotedMeasurementDelta = $(this).find('quotedMeasurementDelta').text();
        objRow.number = $(this).find('number').text();
        objRow.criticalPom = $(this).find('criticalPom ').text();
        objRow.libraryItemReference = $(this).find('libraryItemReference').text();
        objRow.howToMeasure = $(this).find('howToMeasure').text();
        objRow.placementReferenceKey = $(this).find('placementReference').text();
        objRow.placementReference = getValueDisplayFromKey(objRow.placementReferenceKey, objSelfReference);
        objRow.actualMeasurementDelta = $(this).find('actualMeasurementDelta ').text();
        objRow.requestedMeasurement = $(this).find('requestedMeasurement').text();
        objRow.newMeasurement = $(this).find('newMeasurement').text();
        objRow.sampleMeasurementComments = $(this).find('sampleMeasurementComments').text();
        objRow.quotedMeasurement = $(this).find('quotedMeasurement').text();
        objRow.highLight = $(this).find('highLight').text();
        objRow.placeholderRow = $(this).find('placeholderRow ').text();
        objRow.arrSizeArray = [];
        $(this).find('placeholderRow ').nextAll().each(function () {
            var strSizeNameString = $(this).prop('tagName');
            var numStrLength = strSizeNameString.length;
            var numStartPositionForSizeName = strSizeNameString.search('_') + 1;
            var strSizeName = strSizeNameString.substring(numStartPositionForSizeName, numStrLength)
            var strSizePomValue = $(this).text();
            var objSizeValueObject = {};
            objSizeValueObject.sizeName = strSizeName;
            objSizeValueObject.sizeValue = strSizePomValue;
            objRow.arrSizeArray.push(objSizeValueObject);

        });
        arrCurrentMeasurement.push(objRow);
    });
    arrCurrentMeasurement.sort(compare);
    objSelfReference.measurementDetail = arrCurrentMeasurement;
    var objRowOne = objSelfReference.measurementDetail[0];
    var strTableHeaderString = '<thead><tr><th>Sorting Number</th><th>POM Number</th><th>Measurement Name</th><th>Placement Amount</th><th>Placement Reference</th><th>Plus Tolerance</th><th>Minus Tolerance</th><th>HTM Instructions</th><th>Comments</th>';
    var arrSizes = objRowOne.arrSizeArray;
    var objRowOthers = {};
    for (var i = 0; i < arrSizes.length; i++) {
        strTableHeaderString = strTableHeaderString + '<th>' + arrSizes[i].sizeName + '</th>';
    };
    strTableHeaderString = strTableHeaderString + '</tr></thead>';
    var strTableBodyString = '<tbody>';
    for (var j = 0; j < objSelfReference.measurementDetail.length; j++) {
        var objThisRow = objSelfReference.measurementDetail[j];
        var arrSizes2 = objThisRow.arrSizeArray;
        strTableBodyString += '<tr><td>' + objThisRow.sortingNumber + '</td>';
        strTableBodyString += '<td>' + objThisRow.number + '</td>';
        strTableBodyString += '<td>' + objThisRow.measurementName + '</td>';
        strTableBodyString += '<td>' + objThisRow.placementAmount + '</td>';
        strTableBodyString += '<td>' + objThisRow.placementReference + '</td>';
        strTableBodyString += '<td>' + objThisRow.plusTolerance + '</td>';
        strTableBodyString += '<td>' + objThisRow.minusTolerance + '</td>';
        strTableBodyString += '<td>' + objThisRow.htmInstruction + '</td>';
        strTableBodyString += '<td>' + objThisRow.sampleMeasurementComments + '</td>';
        for (var k = 0; k < arrSizes2.length; k++) {
            var strCurrentSizeName = arrSizes2[k].sizeName;
            var strBaseSize = objSelfReference.baseSize;
            if (strCurrentSizeName == strBaseSize) {
                strTableBodyString += '<td class="baseSize">' + arrSizes2[k].sizeValue + '</td>';
            }
            else {
                strTableBodyString += '<td>' + arrSizes2[k].sizeValue + '</td>';
            }

        };

        strTableBodyString += '</tr>';
    };
    strTableBodyString += '</tbody>';
    objSelfReference.measurementTableString = '<h1>Measurements</h1><table id="measurements" class="display responsive col-md-12 compact cell-border">' + strTableHeaderString + strTableBodyString + '</table>';

};
/**
 * @comment this is currently ran within @method getSpecComponentsForActiveSpec
 * @method of @class GarmentProduct, this method returns the active spec and identifies it on the objSelfReference garment and alters that property.
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {String} strGarmentName uses the name of the garmentProduct that is calling this method
 * @param {Function} funCallback passes a function to callback after the modification of the garmentProduct being passed to this function
 * @param {Object} objForCallback provides a container for the callback function to operate on to pass into the objSelfReference object.  This is used to work around scope limitations.
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 * without further developer input but rather in other methods within the class so that no further code is necessary.
 *
 */
garmentProduct.prototype.getSpecByName = function (strHostUrlPrefix, strGarmentName, funCallback, objForCallback, objSelfReference) {
    var strSpecUrl = strHostUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Product+Name=' + strGarmentName + '&oid=OR%3Awt.query.template.ReportTemplate%3A9663785&action=ExecuteReport';
    var numActiveSpecId = 0;
    var strActiveSpecName;
    var arrSpecArray = [];
    var arrSourceArray = [];
    var arrCombinationArray = [];
    var gProdName = '';
    $.get(strSpecUrl, function (specData) { }).done(function (specData) {
        $('row', specData).each(function () {
            gProdName = $(this).find('Garment_product_Name').first().text();
            var techDesignerKey = $(this).find('valueListTechDesigner').text();
            var productManagerKey = $(this).find('valueListProductManager').text();
            var techDesignerDisplay = getValueDisplayFromKey(techDesignerKey, objSelfReference);
            var productManagerDisplay = getValueDisplayFromKey(productManagerKey, objSelfReference);
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
                numActiveSpecId = objSpec.idNumber;
                strActiveSpecName = objSpec.name;
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
            objSelfReference.activeSeason = $(this).find('Garment_Season_Season_Name').text();
            objCombinationObject.seasonSpecCombo = "" + objCombinationObject.seasonName + " _src_" + objCombinationObject.sourceName + " _spec_" + objCombinationObject.specName
            arrCombinationArray.push(objCombinationObject);
        });
        arrSpecArray.reverse();
        arrSourceArray.reverse();
        arrCombinationArray.reverse();

        objForCallback = { arrSpecArray: arrSpecArray, arrSourceArray: arrSourceArray, arrCombinationArray: arrCombinationArray, activeSpecId: numActiveSpecId, gProdName: gProdName, activeSpecName: strActiveSpecName };
        funCallback(objForCallback, objSelfReference);

    });
};
/**
 * @method of @class GarmentProduct, this method gets all spec components for the active spec of the garment for which is passed.  It is run as a deffered call nested within the @method getAllMyDataForMyActiveSpec within @class garmentProduct
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {Object} objDocumentData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objConstructionData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objMeasurementData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objBomData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objProdLinkData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 */
garmentProduct.prototype.getSpecComponentsForActiveSpec = function (strHostUrlPrefix, objDocumentData, objConstructionData, objMeasurementData, objBomData, objProdLinkData, objSelfReference) {
    var arrDocuments = [];
    var arrBoms = [];
    var arrTableDataArray = [];
    var objColorwayProduct = {};
    var objPatternProduct = {};
    var objGarmentProduct = {};
    var objLabelProduct = {};
    var objSellingProduct = {};
    var numObjectId;
    //first pass here gets all product relationships
    //changes in relationship names or type names would need to be later reflected here in the naming structure
    //using actual text names in place of flex path type ids allows us to easier alternate between instances of PLM
    //need to replicate using that approach more
    $('row', objProdLinkData).each(function (index) {
        var linkedProductType = $(this).find('linkedProductType').text();
        var objLinkedProduct = {};
        numObjectId = $(this).find('garmentProductName').first().attr('objectId');
        objLinkedProduct.name = $(this).find('linkedProductName').text();
        objLinkedProduct.objectId = $(this).find('linkedProductName').attr('objectId');
        objLinkedProduct.branchId = $(this).find('linkedProductName').attr('branchId');

        if (linkedProductType == "BASIC CUT & SEW - COLORWAY") {
            objLinkedProduct.type = "Colorway Product";
            objColorwayProduct = objLinkedProduct;
        }
        else if (linkedProductType == "BASIC CUT & SEW - PATTERN") {
            objLinkedProduct.type = "Pattern Product";
            objPatternProduct = objLinkedProduct;
        }
        else if (linkedProductType == "LABEL") {
            objLinkedProduct.type = "Label Product";
            objLabelProduct = objLinkedProduct;
        }
        else if (linkedProductType == "BASIC CUT & SEW - SELLING" || linkedProductType == "Selling") {
            objLinkedProduct.type = "Selling Product";
            objSellingProduct = objLinkedProduct;
        };
    });
    objSelfReference.objectId = numObjectId;
    objSelfReference.colorwayProduct = objColorwayProduct;
    if (typeof (objSelfReference.colorwayProduct) != 'undefined') {
        objSelfReference.getColorwayBoms(strHostUrlPrefix, objSelfReference);
    };
    objSelfReference.patternProduct = objPatternProduct;
    objSelfReference.labelProduct = objLabelProduct;
    objSelfReference.sellingProduct = objSellingProduct;
    var offLineTurnOff = $('#offline').val();
    if (offLineTurnOff != 1) {
        $('row', objDocumentData).each(function (index) {
            var strImgViewerPrefix1 = strHostUrlPrefix + 'Windchill/rfa/jsp/image/ImageViewer.jsp?imageUrl=&appDataOid=OR:wt.content.ApplicationData:';
            var strImgViewerPrefix2 = '&contentHolderOid=OR:com.lcs.wc.document.LCSDocument:';
            var strImgViewerPrefix3 = "file://res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/Prod/";
            if (location.protocol == 'file') {
                //var strImgViewerPrefix3 = "http://res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/Prod/";
            }
            else {
            };
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
            };
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
            objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><img width="' + objComponent.width + '" height="' + objComponent.length + '" class="img-responsive hideImg" src="' + strImgViewerPrefix3 + objComponent.vaultFileName + '" /></div>';
            objComponent.imageUrl = '<img width="' + objComponent.width + '" height="' + objComponent.height + '" class="img-responsive" src="' + objComponent.fullVaultUrl + '" />';
            if (strpSpecId == strCompSpecId) {
                objComponent.ownerType = 'Pattern';
            }
            else {
                objComponent.ownerType = 'Garment';
            };

            arrDocuments.push(objComponent);
            arrTableDataArray.push(objComponent);
        });
    };
    objSelfReference.documents = arrDocuments;
    var objMeasurementComp = {};
    $('row', objMeasurementData).each(function (index) {
        if (index == 0) {
            objSelfReference.baseSize = $(this).find('baseSize').text();
            objSelfReference.sizeRun = $(this).find('sizeRun').text();
        };
        var name = $(this).find('Measurements_Name').text();
        objMeasurementComp = {};
        objMeasurementComp.name = name;
        objMeasurementComp.componentType = 'Measurement';
        objMeasurementComp.ownerType = 'Pattern';
        objMeasurementComp.fileName = "";
        objMeasurementComp.imageUrl = "<img src='' />";
        objMeasurementComp.branchId = $(this).find('branchIdForTaskCall').text();
    });
    objSelfReference.measurement = objMeasurementComp;
    var strMeasTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
    var objDefferedMeasurement = $.ajax({
        url: strMeasTaskUrl,
        type: 'get',
        data: {
            oid: 'VR:com.lcs.wc.measurements.LCSMeasurements:' + objSelfReference.measurement.branchId,
            instance: 'net.hbi.res.wsflexappprd1v.windchillAdapter'
        },
        async: true

    });
    var objConstructionComp = {};
    $('row', objConstructionData).each(function () {
        var name = $(this).find('Construction_Info_Name').text();
        objConstructionComp = {};
        objConstructionComp.name = name;
        objConstructionComp.componentType = 'Construction';
        objConstructionComp.ownerType = 'Pattern';
        objConstructionComp.fileName = "";
        objConstructionComp.imageUrl = "<img src='' />";
        objConstructionComp.branchId = $(this).find('branchIdForTask').text();
    });
    objSelfReference.construction = objConstructionComp;
    var conStrTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/construction/FindConstructionInfo.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
    var objDefferedConstruction = $.ajax({
        url: conStrTaskUrl,
        type: 'get',
        data: {
            oid: 'VR:com.lcs.wc.construction.LCSConstructionInfo:' + objSelfReference.construction.branchId,
            instance: 'net.hbi.res.wsflexappprd1v.windchillAdapter'
        },
        async: true

    });
    $('row', objBomData).each(function () {
        var name = $(this).find('com_lcs_wc_flexbom_FlexBOMPart_Name').text();
        var strpBomSpecId = $(this).find('pSpecId').text();
        var strgBomSpecId = $(this).find('gSpecId').text();
        var strBomCompSpecId = $(this).find('comRefSpecId').text();
        var strFlexBomType = $(this).find('Flex_Type_Type_Name').text();
        objBomComponent = {};
        objBomComponent.name = name;
        objBomComponent.fileName = "";
        objBomComponent.componentType = 'BOM';
        objBomComponent.imageUrl = "<img src='' />";
        objBomComponent.flexType = strFlexBomType;
        var regPprod = new RegExp("Pattern");
        var regGprod = new RegExp("Garment");
        if (regPprod.test(strFlexBomType)) {
            objBomComponent.ownerType = 'Pattern';
        }
        else if (regGprod.test(strFlexBomType)) {
            objBomComponent.ownerType = 'Garment';
        };
        arrTableDataArray.push(objBomComponent);
        arrBoms.push(objBomComponent);

    });
    objSelfReference.boms = arrBoms;
    var arrConstructionDetailDataContainer;
    var arrMeasurementDetailDataContainer;
    $.when(objDefferedConstruction, objDefferedMeasurement).done(function (objDefferedConstruction, objDefferedMeasurement) {
        arrConstructionDetailDataContainer = objDefferedConstruction[0];
        arrMeasurementDetailDataContainer = objDefferedMeasurement[0];
        objSelfReference.getMyConstruction(strHostUrlPrefix, objSelfReference.construction.branchId, arrConstructionDetailDataContainer, objSelfReference);
        objSelfReference.getMyMeasurement(strHostUrlPrefix, objSelfReference.measurement.branchId, arrMeasurementDetailDataContainer, objSelfReference);
    });

};
/**
 * @method of @class GarmentProduct, this method runs a sequence of ajax calls to get all necessary data sets for running @method getSpecComponentsForActiveSpec, then it sequentially calls them
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {Object} strSpecId objectId of active LCSFlexSpecification
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 */
garmentProduct.prototype.getAllMyDataForMyActiveSpec = function (strHostUrlPrefix, strSpecId, objSelfReference) {

    var strSpecGetUrl = strHostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + strSpecId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9999594&action=ExecuteReport"
    var strDocumentsUrl = strHostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + strSpecId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9996723&action=ExecuteReport";
    var strMeasurementsUrl = strHostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + strSpecId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953962&action=ExecuteReport";
    var strConstructionsUrl = strHostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + strSpecId + "&garmentProductName=" + this.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10343155&action=ExecuteReport";
    var strBomsUrl = strHostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + strSpecId + "&garmentProductName=" + this.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953826&action=ExecuteReport";
    var strGetColorwayPatternUrl = strHostUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gProd=' + currentGarmentProduct.name + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10430767&action=ExecuteReport';
    var arrDocumentData = $.ajax({
        url: strDocumentsUrl,
        type: 'get'

    });
    var arrMeasData = $.ajax({
        url: strMeasurementsUrl,
        type: 'get'
    });
    var arrConstructionData = $.ajax({
        url: strConstructionsUrl,
        type: 'get'
    });
    var arrBomData = $.ajax({
        url: strBomsUrl,
        type: 'get'
    });
    var arrProdLinkData = $.ajax({
        url: strGetColorwayPatternUrl,
        type: 'get'
    });
    var objDocData = {};
    var objConData = {};
    var objMeasData = {};
    var objBomData = {};
    var objProdLinkData = {};
    $.when(arrDocumentData, arrConstructionData, arrMeasData, arrBomData, arrProdLinkData).done(function (arrDocumentData, arrConstructionData, arrMeasData, arrBomData, arrProdLinkData) {
        objDocData = arrDocumentData[0];
        objConData = arrConstructionData[0];
        objMeasData = arrMeasData[0];
        objBomData = arrBomData[0];
        objProdLinkData = arrProdLinkData[0];
        console.log(objDocData, objConData, objMeasData, objBomData, arrProdLinkData);
        objSelfReference.getSpecComponentsForActiveSpec(strHostUrlPrefix, objDocData, objConData, objMeasData, objBomData, objProdLinkData, objSelfReference);
        console.log(objSelfReference);
        objSelfReference.generateAvailableReportsList(objSelfReference);
        //saveGarmentProd(objSelfReference);
        //further sequential callbacks should be put here.  Like for constructiong the pom data on measurements and constructions since all data
        //should more or less be available at this juncture.
    });

};
/**
 * @method of @class GarmentProduct, this method runs as a callback to finalize the population of the garmentProduct class
 * @param {Object} objectForCallback Object container passed in callbkac
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 */
garmentProduct.prototype.thenCallSpecs = function (objectForCallback, objSelfReference) {
    objSelfReference.specs = objectForCallback.arrSpecArray
    objSelfReference.sources = objectForCallback.arrSourceArray
    objSelfReference.seasonSourceSpecCombos = objectForCallback.arrCombinationArray
    objSelfReference.activeSpecId = objectForCallback.activeSpecId;
    objSelfReference.activeSpecName = objectForCallback.activeSpecName;
    objSelfReference.name = objectForCallback.gProdName;
    objSelfReference.getAllMyDataForMyActiveSpec(strUrlPrefix, objSelfReference.activeSpecId, objSelfReference);
};
/**
 * @method of @class GarmentProduct, this method runs to determine, based on available spec components in the objSelfReference, what are the available report sets that 
 * could be used.  Currently it is only invoked as a callback.
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 */
garmentProduct.prototype.generateAvailableReportsList = function (objSelfReference) {
    $('#reportsHeader *').remove();
    $('#reportsHeader').append('<table cellpadding="0" cellspacing="0" border="0" class="display compact cell-border" id="reports"><thead><th>Sort Order</th><th>Report</th><th>Name</th></thead><tbody></tbody></table>');
    var reportTable = $('#reports').DataTable({
        'pageLength': 5,
        'dom': '',
        "tableTools": {
            "sSwfPath": "C:/nodeTechPackProject/TechPackProject/js/copy_csv_xls_pdf.swf"
        },
        "responsive": false,
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            }

        ]

    });
    // later will need to add here a few documents that we want to exclude intentionally
    // like front back images that come from pattern products
    var sortOrder = 0;
    if (typeof (objSelfReference.construction) != 'undefined') { reportTable.row.add([sortOrder, '<a href="#" id="getConstructionReport">Construction</a>', objSelfReference.construction.name]); sortOrder++; };
    if (typeof (objSelfReference.measurement) != 'undefined') { reportTable.row.add([sortOrder, '<a href="#" id="getMeasurementReport">Measurements</a>', objSelfReference.measurement.name]); sortOrder++; };
    if (typeof (objSelfReference.boms != 'undefined')) {
        var arrBoms = objSelfReference.boms;
        var boolHaveGarmentCut = false;
        var boolHavePatternSpread = false;
        var boolHavePatternTrimStraight = false;
        var boolHavePatternTrimBias = false;
        if (typeof (arrBoms) != 'undefined') {
            for (var i = 0; i < arrBoms.length; i++) {

                var strBomType = arrBoms[i].flexType;
                if (strBomType == 'Pattern Product Trim Bias BOM') { boolHavePatternTrimBias = true; }
                if (strBomType == 'Garment Cut') { boolHaveGarmentCut = true; }
                if (strBomType == 'Pattern Product Trim Straight BOM') { boolHavePatternTrimStraight = true; }
                if (strBomType == 'Pattern Product Spread BOM') { boolHavePatternSpread = true; }

            };
        };
        var strBlockWeightBomScenario;
        if (boolHaveGarmentCut && boolHavePatternSpread && boolHavePatternTrimStraight && boolHavePatternTrimBias) {
            strBlockWeightBomScenario = 'Spread, Trim Straight and Trim Bias';
        }
        else if (boolHaveGarmentCut && boolHavePatternSpread && boolHavePatternTrimStraight) {
            strBlockWeightBomScenario = 'Spread and Trim Straight';
        }
        else if (boolHaveGarmentCut && boolHavePatternSpread && boolHavePatternTrimBias) {
            strBlockWeightBomScenario = 'Spread and Trim Bias';
        }
        else if (boolHaveGarmentCut && boolHavePatternSpread) {
            strBlockWeightBomScenario = 'Spread, Trim Straight and Trim Bias';
        };
        reportTable.row.add([sortOrder, '<a href="#" class="blockWeights" id="generateBlockWeights">Block Weights Report</a>', strBlockWeightBomScenario]);
        sortOrder++;
    };

    if (typeof (objSelfReference.documents != 'undefined')) {
        var arrdocs = objSelfReference.documents;
        if (typeof (arrdocs) != 'undefined') {
            for (i = 0; i < arrdocs.length; i++) {
                if (i == 0) { $('#imagesDiv').append('<h1>Documents</h1>') };
                $('#imagesDiv').append('<div class="page"><h2>' + arrdocs[i].name + '</h2>' + arrdocs[i].imageUrl + '</div>');
            };
        };

    };
    createRelatedProductsDiv(objSelfReference);
    reportTable.draw();
    $('#getMeasurementReport').click(function () {
        createComponentTable('measurementDiv', 'measurements', objSelfReference.measurementTableString);
        makeMeScrollToDefinedTarget('#measurementDiv', 50, -100);
    });
    $('#getConstructionReport').click(function () {
        createComponentTable('constructionDiv', 'construction', objSelfReference.constructionTableString);
        makeMeScrollToDefinedTarget('#constructionDiv', 50, -100);
    });
    var StrUrlPrefix = 'http://wsflexwebprd1v.res.hbi.net/';
    $('.blockWeights').click(function () {
        objSelfReference.getMyBlockWeightsSpread(StrUrlPrefix, objSelfReference);
        objSelfReference.getBlockWeightsTrim(StrUrlPrefix, objSelfReference);
    });
};
/*
needs comments
*/

garmentProduct.prototype.getMyValueLists = function (strUrlPrefix, arrListIds, objSelfReference) {
    //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?attValueListId=2381876%2C102771%2C2381693&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10596321&action=ExecuteReport
    var strUrl1 = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?attValueListId=';
    var strUrl2 = '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10596321&action=ExecuteReport';
    var strInStringForQuery = '';
    objSelfReference.displayValues = [];
    objSelfReference.displayKeys = [];
    for (var i = 0; i < arrListIds.length; i++) {
        if (i != arrListIds.length - 1) {
            strInStringForQuery += arrListIds[i] + "%2C";
        }
        else {
            strInStringForQuery += arrListIds[i];
        }
    };
    var strFullUrl = strUrl1 + strInStringForQuery + strUrl2;
    $.get(strFullUrl, function (data) { }).done(function (data) {
        $('row', data).each(function () {
            objSelfReference.displayValues.push($(this).find('Display').text());
            objSelfReference.displayKeys.push($(this).find('Value_Key').text());

        });
        console.log(objSelfReference.displayValues, objSelfReference.displayKeys);
    });

};

garmentProduct.prototype.getMyBlockWeightsSpread = function (strUrlPrefix, objSelfReference) {
    //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Garment+Product+Season=Garment%20%20BIW&Product+Name=10188%20Boys%20Knit%20Brief%20ExpWB%20B252&Spec+Name=002&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A3009695&action=ExecuteReport
    $('#blockWeightSpreadDiv *').remove();
    var reportStringSpread = "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Garment+Product+Season=";
    var reportStringSpread2 = "&Product+Name=";
    var reportStringSpread3 = "&Spec+Name=";
    var reportStringSpread4 = "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A3009695&action=ExecuteReport"
    var arrOfRowsForFunctionScope = [];
    var arrDupChecker = [];
    var strSpreadTableString = '<table id="spreadReport" class="display responsive col-md-12 compact cell-border"><thead id="spreadHeader"><tr><th>Part Code</th><th>Cut Method Code</th><th>Mfg Fabric</th><th>Size Sort</th><th>Shade</th><th>Size</th><th>Marker</th><th>Conditioned Width</th><th>#Gmts</th><th>MU%</th><th>Total Length</th><th>Ply</th><th>Usage Yd/Dz</th><th>Usage Lb/Dz</th></tr></thead><tbody>';
    var strSpreadLocalHeaderStringEmptyBody = '<h1>Block Weights</h1><h2>Block Weights - Spread</h1><table id="spreadReport" class="display responsive col-md-12 compact cell-border"><thead id="spreadHeader"><tr><th>Part Code</th><th>Cut Method Code</th><th>Mfg Fabric</th><th>Size Sort</th><th>Shade</th><th>Size</th><th>Marker</th><th>Conditioned Width</th><th>#Gmts</th><th>MU%</th><th>Total Length</th><th>Ply</th><th>Usage Yd/Dz</th><th>Usage Lb/Dz</th></tr></thead><tbody></tbody>';
    //var fullSpreadUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Garment+Product+Season=" & objSelfReference.activeSeason & "&Product+Name=" & objSelfReference.name & "&Spec+Name=" & objSelfReference.activeSpecName & "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A3009695&action=ExecuteReport";
    //var currentGarmentProductFromThis = this;
    var sortingArray = ['sizeXXS', '1', 'sizeXS', '2', 'sizeS', '3', 'sizeM', '4', 'sizeL', '5', 'sizeXL', '6', 'size2X', '7', 'size3X', '8', 'size4X', '9', 'size5X', '10', 'size6X', '11', 'size3M', '1', 'size6M', '2', 'size9M', '3', 'size12M', '4', 'size18M', '5', 'size24M', '6', 'size2T', '7', 'size3T', '8', 'size4T', '9', 'size5T', '10', 'size2', '1', 'size4', '2', 'size5', '3', 'size6', '4', 'size7', '5', 'size8', '6', 'size9', '7', 'size10', '8', 'size11', '9', 'size12', '10', 'size13', '11', 'size14', '12', 'size16', '13', 'size18', '14', 'size20', '15', 'size22', '16', 'size24', '17', 'size26', '18', 'size28', '19', 'size30', '20', 'size32', '21', 'size34', '22', 'size36', '23', 'size38', '24', 'size40', '25', 'size42', '26', 'size44', '27', 'size46', '28', 'size48', '29', 'size50', '30', 'size52', '31', 'size54', '32', 'size56', '33', 'size58', '34', 'size60', '35', 'size62', '36', 'sizeS/M', '1', 'sizeL/XL', '2', 'size16W', '1', 'size20W', '2', 'size24W', '3', 'size28W', '4', 'size32W', '5', 'size36W', '6'];
    var strPnameForParam = objSelfReference.name;
    var strSeasonNameForParam = objSelfReference.activeSeason;
    var strSpecNameForParam = objSelfReference.activeSpecName;
    strPnameForParam = strPnameForParam.replace('/\s/g', '%20');
    strSeasonNameForParam = strSeasonNameForParam.replace('/\s/g', '%20');
    strSpecNameForParam = strSpecNameForParam.replace('/\s/g', '%20');
    var fullSpreadUrl = strUrlPrefix + reportStringSpread + strSeasonNameForParam + reportStringSpread2 + strPnameForParam + reportStringSpread3 + strSpecNameForParam + reportStringSpread4;
    //var fullSpreadUrl = 'dataSetSamples/spread.xml';
    if (typeof (objSelfReference.blockWeightSpread) == 'undefined') {
        $.get(fullSpreadUrl, function (data) { }).done(function (data) {
            $('row', data).each(function () {
                var objRow = {};
                strSpreadTableString += '<tr>';
                objRow.pProdSpread = $(this).find("Pattern_Product").text();
                objRow.pMastSpread = $(this).find("Pattern_Master_Material").text();
                objRow.gProdSpread = $(this).find("Garment_product").text();
                objRow.seasonSpread = $(this).find("Season").text();
                objRow.specNameSpread = $(this).find("Spec_Name").text();
                objRow.sizeSpreadForLookUp = $(this).find("Size").text();
                objRow.sizeSpread = "  " + objRow.sizeSpreadForLookUp + "  ";
                objRow.pCodeSpread = $(this).find("Part_Code").text();
                objRow.allowanceSpread = $(this).find("Allowance__").text();
                objRow.numGarmentsSpread = $(this).find("__Garments").text();
                objRow.manfOptionSpread = $(this).find("Manufacturing_option").text();
                objRow.conWidthSpread = $(this).find("Conditioned_Width").text();
                objRow.plySpread = $(this).find("Ply").text();
                objRow.totLengthSpread = $(this).find("Total_Length").text();
                objRow.totLengthSpread = Math.round(objRow.totLengthSpread * 10000) / 10000;
                objRow.useYdDzSpread = $(this).find("Usage_Yd_Dz").text();
                objRow.useYdDzSpread = Math.round(objRow.useYdDzSpread * 100) / 100;
                objRow.cMethCodeSpread = $(this).find("Cut_Method_Code").text();
                objRow.muSpread = $(this).find("MU_").text();
                objRow.shadeSpread = $(this).find("Shade").text().toUpperCase().substring(0, 1);
                objRow.shadeSpread = "  " + objRow.shadeSpread + "  ";
                objRow.gBOMallowanceSpread = $(this).find("Garment_BOM_Allowance").text();
                objRow.manfFabricWeightSpread = $(this).find("Manf__Option___Weight__oz_yd__").text();
                objRow.pMastTypeSpread = $(this).find("Pattern_Master_Material_Type").text();
                objRow.cylinderValueSpread = $(this).find("Cylinder").text();
                objRow.usageLBDZSpread = Math.round((objRow.conWidthSpread * objRow.totLengthSpread / objRow.numGarmentsSpread * 12 * objRow.plySpread / 36 / 36) * (objRow.manfFabricWeightSpread / 16) * 100) / 100;
                var sortLookup = "size" + objRow.sizeSpreadForLookUp;
                objRow.sortValue = sortingArray.indexOf(sortLookup);
                objRow.patternDimId = $(this).find('patDimId').text();
                objRow.garDimId = $(this).find('garDimID').text();
                objRow.combinedDimId = objRow.patternDimId + objRow.garDimId;
                var numDupChecker = objRow.combinedDimId;
                objRow.plySpread = "   " + objRow.plySpread + "   ";
                objRow.conWidthSpread = "   " + objRow.conWidthSpread + "   ";
                for (var name in objRow) {
                    if (typeof (name) == 'undefined') {
                        objRow.name = '';
                    }
                };
                strSpreadTableString += '<td>' + objRow.pCodeSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.cMethCodeSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.manfOptionSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.sortValue + '</td>';
                strSpreadTableString += '<td>' + objRow.shadeSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.sizeSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.pMastSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.conWidthSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.numGarmentsSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.muSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.totLengthSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.plySpread + '</td>';
                strSpreadTableString += '<td>' + objRow.useYdDzSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.usageLBDZSpread + '</td>';
                strSpreadTableString += '</tr>';
                arrOfRowsForFunctionScope.push(objRow);
                arrDupChecker.push(numDupChecker);
            });
            strSpreadTableString += '</tbody></table>';
            objSelfReference.blockWeightsSpreadTableString = strSpreadTableString;
            objSelfReference.blockWeightSpread = arrOfRowsForFunctionScope;
            console.log(objSelfReference);
            $('#blockWeightSpreadDiv').append(strSpreadLocalHeaderStringEmptyBody);
            $('#spreadReport').DataTable({
                'scrollY': 600,
                'paging': false,
                'length': 1000,
                'data': objSelfReference.blockWeightSpread,
                'columns': [
                    { 'data': 'pCodeSpread' },
                 { 'data': 'cMethCodeSpread' },
                 { 'data': 'manfOptionSpread' },
                 { 'data': 'sortValue' },
                 { 'data': 'shadeSpread' },
                 { 'data': 'sizeSpread' },
                 { 'data': 'pMastSpread' },
                 { 'data': 'conWidthSpread' },
                 { 'data': 'numGarmentsSpread' },
                 { 'data': 'muSpread' },
                 { 'data': 'totLengthSpread' },
                 { 'data': 'plySpread' },
                 { 'data': 'useYdDzSpread' },
                 { 'data': 'usageLBDZSpread' }


                ],
                'order': [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc']],
                'responsive': false
            });
        });
    }
    else {
        $('#blockWeightSpreadDiv').append(strSpreadLocalHeaderStringEmptyBody);
        $('#spreadReport').DataTable({
            'scrollY': 800,
            'paging': false,
            'length': 1000,
            'data': objSelfReference.blockWeightSpread,
            'columns': [
                    { 'data': 'pCodeSpread' },
                 { 'data': 'cMethCodeSpread' },
                 { 'data': 'manfOptionSpread' },
                 { 'data': 'sortValue' },
                 { 'data': 'shadeSpread' },
                 { 'data': 'sizeSpread' },
                 { 'data': 'pMastSpread' },
                 { 'data': 'conWidthSpread' },
                 { 'data': 'numGarmentsSpread' },
                 { 'data': 'muSpread' },
                 { 'data': 'totLengthSpread' },
                 { 'data': 'plySpread' },
                 { 'data': 'useYdDzSpread' },
                 { 'data': 'usageLBDZSpread' }
            ],
            'order': [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc']],
            'responsive': false
        });
    };
};


garmentProduct.prototype.getBlockWeightsTrim = function updateTrim(strUrlPrefix, objSelfReference) {
    var sortingArray = ['sizeXXS', '1', 'sizeXS', '2', 'sizeS', '3', 'sizeM', '4', 'sizeL', '5', 'sizeXL', '6', 'size2X', '7', 'size3X', '8', 'size4X', '9', 'size5X', '10', 'size6X', '11', 'size3M', '1', 'size6M', '2', 'size9M', '3', 'size12M', '4', 'size18M', '5', 'size24M', '6', 'size2T', '7', 'size3T', '8', 'size4T', '9', 'size5T', '10', 'size2', '1', 'size4', '2', 'size5', '3', 'size6', '4', 'size7', '5', 'size8', '6', 'size9', '7', 'size10', '8', 'size11', '9', 'size12', '10', 'size13', '11', 'size14', '12', 'size16', '13', 'size18', '14', 'size20', '15', 'size22', '16', 'size24', '17', 'size26', '18', 'size28', '19', 'size30', '20', 'size32', '21', 'size34', '22', 'size36', '23', 'size38', '24', 'size40', '25', 'size42', '26', 'size44', '27', 'size46', '28', 'size48', '29', 'size50', '30', 'size52', '31', 'size54', '32', 'size56', '33', 'size58', '34', 'size60', '35', 'size62', '36', 'sizeS/M', '1', 'sizeL/XL', '2', 'size16W', '1', 'size20W', '2', 'size24W', '3', 'size28W', '4', 'size32W', '5', 'size36W', '6'];
    var param = objSelfReference.name;
    var paramSeasonTrim = objSelfReference.activeSeason;
    var paramSpecTrim = objSelfReference.activeSpecName;
    param = param.replace('/\s/g', '%20');
    paramSeasonTrim = paramSeasonTrim.replace('/\s/g', '%20');
    paramSpecTrim = paramSpecTrim.replace('/\s/g', '%20');
    var reportStringTrim1 = "http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Garment+Product+Season="
    var reportStringTrim2 = "&Product+Name=";
    var reportStringTrim3 = "&Spec+Name=";
    var reportStringTrim4 = "&oid=OR%3Awt.query.template.ReportTemplate%3A4490123&action=ExecuteReport";
    var fullReportString = reportStringTrim1 + paramSeasonTrim + reportStringTrim2 + param + reportStringTrim3 + paramSpecTrim + reportStringTrim4;
    var strTrimTableString = '<table id="trimReport" class="display responsive col-md-12 compact cell-border"><thead id="trimHeader"><tr><th>Part Code</th><th>Cut Method Code</th><th>Mfg Fabric</th><th>Shade</th><th>SizeSort</th><th>Size</th><th>Pattern# Version</th><th>#Gmts</th><th>Trim Cut Width</th><th>Total Length</th><th>UsageYd/Dz</th><th>UsageLb/Dz</th></tr></thead><tbody>';
    var strLocalHeaderStringEmptyBody = '<h2>Block Weights - Trim</h1><table id="trimReport" class="display responsive col-md-12 compact cell-border"><thead id="trimHeader"><tr><th>Part Code</th><th>Cut Method Code</th><th>Mfg Fabric</th><th>Shade</th><th>SizeSort</th><th>Size</th><th>Pattern# Version</th><th>#Gmts</th><th>Trim Cut Width</th><th>Total Length</th><th>UsageYd/Dz</th><th>UsageLb/Dz</th></tr></thead><tbody></tbody>';
    var arrRowsArray = [];
    var dimIdArrays = [];
    if (typeof (objSelfReference.blockWeightTrim) == 'undefined') {
        $.get(fullReportString, function (result) { }).done(function (result) {
            $('row', result).each(function () {
                var objRow = {}; //objRow.
                objRow.pProd = $(this).find("Pattern_Product").text();
                objRow.pMast = $(this).find("Pattern_Master_Material").text();
                objRow.gProd = $(this).find("Garment_product").text();
                objRow.season = $(this).find("Season").text();
                objRow.specName = $(this).find("Spec_Name").text();
                objRow.sizeForLookUp = $(this).find("Size").text();
                objRow.size = "  " + objRow.sizeForLookUp + "  ";
                objRow.pCode = $(this).find("Part_Code").text();
                objRow.allowance = $(this).find("Allowance__").text();
                objRow.trimCutWidth = $(this).find("Trim_Cut_Width").text();
                objRow.numGarments = $(this).find("__Garments").text();
                objRow.edgeLoss = $(this).find("Edge_Loss__IN_").text();
                objRow.runoff = $(this).find("Runoff").text();
                objRow.manfOption = $(this).find("Manufacturing_option").text();
                objRow.ply = $(this).find("Ply").text();
                objRow.totLength = $(this).find("Total_Length").text();
                objRow.useYdDz = $(this).find("Usage_Yd_Dz").text().substring(0, 6);
                objRow.cMethCode = $(this).find("Cut_Method_Code").text();
                objRow.mu = $(this).find("MU_").text();
                objRow.shade = $(this).find("Shade").text().toUpperCase().substring(0, 1);
                objRow.shade = "  " + objRow.shade + "  ";
                objRow.gBOMallowance = $(this).find("Garment_BOM_Allowance").text();
                objRow.cylinder = $(this).find("Cylinder").text();
                objRow.manfFabricWeight = $(this).find("Manf__Option___Weight__oz_yd__").text();
                objRow.pMastType = $(this).find("Pattern_Master_Material_Type").text();
                objRow.trimPatternNumAndVersion = $(this).find("patternNumVersion").text();
                objRow.usageLBDZ = 0;
                if (objRow.pMastType == "Bias") {
                    objRow.usageLBDZ = (objRow.trimCutWidth * objRow.totLength * 12 / objRow.numGarments / 1296 * objRow.manfFabricWeight / 16)
                };
                if (objRow.pMastType == "Straight") {
                    objRow.usageLBDZ = (objRow.trimCutWidth * objRow.totLength * 12 / objRow.numGarments / 1296 * objRow.manfFabricWeight / 16)
                };
                var sortLookup = "size" + objRow.sizeForLookUp;
                objRow.sortValue = sortingArray.indexOf(objRow.sortLookup);
                objRow.usageLBDZ = Math.round(objRow.usageLBDZ * 100) / 100;
                objRow.useYdDz = Math.round(objRow.useYdDz * 100) / 100;
                objRow.totLength = Math.round(objRow.totLength * 10000) / 10000;
                objRow.patternDimId = $(this).find('patDimId').text();
                objRow.garDimId = $(this).find('garDimID').text();
                objRow.combinedDimId = objRow.patternDimId + objRow.garDimId;
                objRow.ply = "   " + objRow.ply + "   ";
                objRow.trimCutWidth = "   " + objRow.trimCutWidth + "   ";
                arrRowsArray.push(objRow);
            });
            var arrOfProperties = ['pCode', 'cMethCode', 'manfOption', 'shade', 'sortValue', 'size', 'trimPatternNumAndVersion', 'numGarments', 'trimCutWidth', 'totLength', 'useYdDz', 'usageLBDZ'];
            for (var i = 0; i < arrRowsArray.length; i++) {
                var objGetObject = {};
                objGetObject = arrRowsArray[i];
                strTrimTableString += '</tr>'
            };
            strTrimTableString += '</tbody></table>';
            objSelfReference.blockWeightsTrimTableString = strTrimTableString;
            objSelfReference.blockWeightTrim = arrRowsArray;
            $('#blockWeightTrimDiv').append(strLocalHeaderStringEmptyBody);
            $('#trimReport').DataTable({
                'scrollY': 700,
                'paging': false,
                'length': 1000,
                'data': objSelfReference.blockWeightTrim,
                'columns': [
                        { 'data': 'pCode' },
                        { 'data': 'cMethCode' },
                        { 'data': 'manfOption' },
                        { 'data': 'shade' },
                        { 'data': 'sortValue' },
                        { 'data': 'size' },
                        { 'data': 'trimPatternNumAndVersion' },
                        { 'data': 'numGarments' },
                        { 'data': 'trimCutWidth' },
                        { 'data': 'totLength' },
                        { 'data': 'useYdDz' },
                        { 'data': 'usageLBDZ' }
                ],
                'order': [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc']],
                'responsive': false
            });
        });
    }
    else {
        $('#blockWeightTrimDiv').append(strLocalHeaderStringEmptyBody);
        $('#trimReport').DataTable({
            'scrollY': 350,
            'paging': false,
            'length': 1000,
            'data': objSelfReference.blockWeightTrim,
            'columns': [
                    { 'data': 'pCode' },
                    { 'data': 'cMethCode' },
                    { 'data': 'manfOption' },
                    { 'data': 'shade' },
                    { 'data': 'sizeForLookUp' },
                    { 'data': 'size' },
                    { 'data': 'trimPatternNumAndVersion' },
                    { 'data': 'numGarments' },
                    { 'data': 'trimCutWidth' },
                    { 'data': 'totLength' },
                    { 'data': 'useYdDz' },
                    { 'data': 'usageLBDZ' }
            ],
            'order': [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc']],
            'responsive': false
        });
    };
};

garmentProduct.prototype.saveMe = function (objSelfReference) {
    var garmentProductString = JSON.stringify(objSelfReference);
    fs.writeFile(objSelfReference.name + '.json', garmentProductString, function (err) {
        if (err) throw err;
        alert('saved ' + objSelfReference.name);
    });
};

garmentProduct.prototype.getColorwayBoms = function (strUrlPrefix, objSelfReference) {
    var strBeginUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction'//objectId=<param>&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10734353&action=ExecuteReport';
    var strTrimCwayBomString = '<h2>Colorway BOM</h2><table id="colorwayReport" class="display responsive col-md-12 compact cell-border"><thead><tr>';//<th>Part Name</th><th>Desc</th><th>Garment Use</th><th>Material</th>';</tr></thead><tbody>';
    var strTrimCwaysTableString = '<h1>Colorways</h1><h2>Colorways by Group</h2><table id="colorwaysListTable" class="display responsive col-md-12 compact cell-border"><thead><tr><th>Colorway Group</th><th>Colorway Name</th></tr></thead><tbody>';
    var objDefferedBranch = $.ajax({
        url: strBeginUrl,
        type: 'get',
        data: {
            objectId: objSelfReference.colorwayProduct.objectId,
            oid: 'OR:wt.query.template.ReportTemplate:10734353',
            xsl2: '',
            xsl2: '',
            format: 'formatDelegate',
            delegateName: 'XML',
            action: 'ExecuteReport'
        }
    });
    var objDefferedSkuData = $.ajax({
        url: strBeginUrl,
        type: 'get',
        data: {
            objectId: objSelfReference.colorwayProduct.objectId,
            oid: 'OR:wt.query.template.ReportTemplate:10732525',
            format: 'formatDelegate',
            xsl2: '',
            xsl2: '',
            delegateName: 'XML',
            action: 'ExecuteReport'
            //jrb: 'wt.query.template.reportTemplateRB'
        }
    });
    var objDefferedColorways = $.ajax({
        url: strBeginUrl,
        type: 'get',
        data: {
            objectId: objSelfReference.colorwayProduct.objectId,
            oid: 'OR:wt.query.template.ReportTemplate:10777566',
            format: 'formatDelegate',
            xsl2: '',
            xsl2: '',
            delegateName: 'XML',
            action: 'ExecuteReport'
        }
    });
    var arrBranch = [];
    var arrSku = [];
    var arrColorways = [];
    var arrColumns = ['Grouping', 'Part Name', 'Garment Use', 'Material'];
    var arrGroupings = [];
    var arrGroupingsTableStrings = [];
    $.when(objDefferedBranch, objDefferedSkuData, objDefferedColorways).done(function (objDefferedBranch, objDefferedSkuData, objDefferedColorways) {
        arrBranch = objDefferedBranch[0];
        arrSku = objDefferedSkuData[0];
        arrColorways = objDefferedColorways[0];
        var arrColorwayObjects = [];
        var initCwayString0 = '<h2 class="page">';
        var initCwayString1 = '</h2><table id="';
        var initCwayString2 = '" class="display responsive col-md-12 compact cell-border"><thead><tr><th>Part Name</th><th>Garment Use</th><th>Material</th>';
        $('row', arrColorways).each(function (index) {
            var objRow = {};
            objRow.cwayGrouping = $(this).find('cwayGroupDescription').text();
            objRow.colorwayName = $(this).find('Colorway_Name').text();
            objRow.Sku_ARev_Id = $(this).find('Sku_ARev_Id').text();
            objRow.skuBranchId = $(this).find('skuBranchId').text();
            objRow.skuObjectId = $(this).find('skuObjectId').text();
            objRow.parentProductArevId = $(this).find('Product_ARev_Id').text();
            objRow.parentProductObjectId = $(this).find('Colorway_Product_Name_Link').attr('objectId');
            objRow.parentProductName = $(this).find('Colorway_Product_Name_Link').text();
            objRow.parentProductBranchId = $(this).find('Colorway_Product_Name_Link').attr('branchId');
            strTrimCwaysTableString += '<tr>' + '<td>' + objRow.cwayGrouping + '</td>' + '<td>' + objRow.colorwayName + '</td>' + '</tr>'
            arrColumns.push(objRow.colorwayName);
            arrColorwayObjects.push(objRow);
            if (arrGroupings.indexOf(objRow.cwayGrouping) == -1) {
                arrGroupings.push(objRow.cwayGrouping);
                arrGroupingsTableStrings.push(initCwayString0 + objRow.cwayGrouping + initCwayString1 + objRow.cwayGrouping.replace(/\s/g, "_") + initCwayString2 + '<th>' + objRow.colorwayName + '</th>');
            }
            else {
                var numActualIndex = arrGroupings.indexOf(objRow.cwayGrouping);
                arrGroupingsTableStrings[numActualIndex] = arrGroupingsTableStrings[numActualIndex] + '<th>' + objRow.colorwayName + '</th>';
            };
        });
        for (var i = 0; i < arrGroupingsTableStrings.length; i++) {
            arrGroupingsTableStrings[i] = arrGroupingsTableStrings[i] + '</tr></thead><tbody></tbody></table>';
        };
        strTrimCwaysTableString += '</tbody></table>';
        $('#colorwaysListDiv').append(strTrimCwaysTableString);
        $('#colorwaysListTable').DataTable({
            'paging': false,
            'length': 1000,
            'dom': ''
        });
        var arrTopLevelRows = [];
        var arrSkuLevelRows = [];
        $('row', arrBranch).each(function () {
            var objRow = {};
            objRow.specName = $(this).find('com_lcs_wc_specification_FlexSpecification_Name').text();
            objRow.bomName = $(this).find('bomName').text();
            objRow.Material = $(this).find('Material').text();
            objRow.bomPartId = $(this).find('com_lcs_wc_flexbom_FlexBOMPart').attr('objectId');
            objRow.Branch_Id = $(this).find('Branch_Id').text();
            objRow.garmentUseBranchId = $(this).find('garmentUseBranchId').text();
            objRow.masterMaterialDesc = $(this).find('masterMaterialDesc').text();
            objRow.partName = $(this).find('partName').text();
            objRow.matrlObjectId = $(this).find('matrlObjectId').text();
            objRow.Dimension_Id = $(this).find('Dimension_Id').text();
            objRow.variationRows = [];
            arrTopLevelRows.push(objRow);
        });
        $('row', arrSku).each(function () {
            var objRow = {};
            objRow.cWayName = $(this).find('cWayName').text();
            objRow.bomName = $(this).find('bomName').text();
            objRow.Color_Code = $(this).find('Color_Code').text();
            objRow.specName = $(this).find('Spec_Name').text();
            objRow.Material = $(this).find('Material').text();
            objRow.Branch_Id = $(this).find('bomLinkBranch_Id').text();
            objRow.Dimension_Id = $(this).find('Dimension_Id').text();
            objRow.Dimension_Name = $(this).find('Dimension_Name').text();
            objRow.colorName = $(this).find('Att_').text();
            objRow.hex = $(this).find('hex').text();
            objRow.Thumbnail = $(this).find('Thumbnail').text();
            objRow.bPartMaster_bLinkBranchId = $(this).find('bPartMaster_bLinkBranchId').text();
            objRow.bPartBranch = $(this).find('bPartBranch').text();
            objRow.bPartObjectId = $(this).find('bPartObjectId').text();
            arrSkuLevelRows.push(objRow);

        });
        for (var i = 0; i < arrTopLevelRows.length; i++) {
            var strCurrentDimsionId = arrTopLevelRows[i].Dimension_Id;
            var arrThisLoop = [];
            arrThisLoop = $.grep(arrSkuLevelRows, function (e) {
                return e.Dimension_Id.search(strCurrentDimsionId) != -1;
            }, false);
            if (typeof (arrThisLoop) != 'undefined') {
                for (var j = 0; j < arrThisLoop.length; j++) {
                    arrTopLevelRows[i].variationRows.push(arrThisLoop[j]);
                };
            };
        };
        for (var i = 0; i < arrColumns.length; i++) {
            strTrimCwayBomString += '<th>' + arrColumns[i] + '</th>';
        };
        strTrimCwayBomString += '</tr></thead>';
        for (var i = 0; i < arrGroupingsTableStrings.length; i++) {
            $('#colorwaysDiv').append(arrGroupingsTableStrings[i]);
        };
        objSelfReference.colorwayProduct.colorwayBomDetail = arrTopLevelRows;
        $('#colorwaysDiv table').DataTable();
        $('#colorwayReport').DataTable({
            'responsive': false,
            'length': 50
        });
    });
};
//utility functions to work with garmentProduct class below
/*
 * @param {String} strkey key value of item in list to be passed to key array to get back display
 * @param {Object} objGarmentProduct takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 * @return {String} strvalue return the display value from the key
 */
function getValueDisplayFromKey(strkey, objGarmentProduct) {
    var numIndexPositionOfKeyInKeyArray = objGarmentProduct.displayKeys.indexOf(strkey);
    var strvalue = objGarmentProduct.displayValues[numIndexPositionOfKeyInKeyArray];
    return strvalue;
};
/*
fs.readFile(image_origial, function (err, original_data) {
    fs.writeFile('image_orig.jpg', original_data, function (err) { });
    var base64Image = original_data.toString('base64');
    var decodedImage = new Buffer(base64Image, 'base64');
    fs.writeFile('image_decoded.jpg', decodedImage, function (err) { });
});*/
function pdfPage(objForFile) {
    var header = $('head').html();
    var pageHtml = $('body').html();
    var allHtml = header + pageHtml;
    var fileName = 'testFile.html';
    //add in error catching for if file exists
    fs.writeFileSync('testFile.html', allHtml);

    var filePath = '/wkhtmltopdf/bin/wkhtmltopdf';
    child = execFile(filePath, ['file:///nodeTechPackProject/TechPackProject/testFile.html?dontRunPrompt', objForFile.name + '.pdf'], function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' +
                   error.signal);
        }
        console.log('Child Process stdout: ' + stdout);
        console.log('Child Process stderr: ' + stderr);
    });
};
