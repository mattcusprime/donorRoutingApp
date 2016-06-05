/// <reference path="../Scripts/jquery-2.1.0-vsdoc.js" />
/// <reference path="../Scripts/jquery-2.1.4.js" />
/// <reference path="../Scripts/jquery-2.1.4.intellisense.js" />
//custom events
function protGarmentProduct(strName, arrAttributes, arrSpecs, strName, arrSources, objColorwayProduct, objPatternProduct, strLabelProduct, arrBoms, arrSeasonSourceSpecCombos, arrDocuments, objMeasurement, objConstruction, strObjectId, objGSpec, objPSpec, arrBase64Documents, arrConstructionInfo, objconstructionDetail, objMeasurementDetail, strSpecId) {
    this.specs = arrSpecs;
    this.attributes = arrAttributes;
    this.name = strName;
    this.sources = arrSources;
    this.colorwayProduct = objColorwayProduct;
    this.patternProduct = objPatternProduct;
    this.labelProduct = strLabelProduct;
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
    this.base64DocumentArray = arrBase64Documents;
    this.garmentDoc = new jsPDF('landscape');
    /*this.savePDF = function () {
        this.garmentDoc.text('Colorway Product:   ' + this.colorwayProduct.name, 0, 40);
        this.garmentDoc.text('Pattern Product:  ' + this.patternProduct.name, 0, 80);

        this.garmentDoc.save(this.name + '.pdf');

    };*/
    //measurements url getter is http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml?oid=VR:com.lcs.wc.measurements.LCSMeasurements:2394285&instance=net.hbi.res.wsflexappprd1v.windchillAdapter
    //get branchIdForTaskCall from mesaurements call at beginning and send that in the string above, it's the branch id
};
// should have use this approach instead of placing it internally with a this.
protGarmentProduct.prototype.savePDF = function () {
    this.garmentDoc.text('Colorway Product:   ' + this.colorwayProduct.name, 0, 40);
    this.garmentDoc.text('Pattern Product:  ' + this.patternProduct.name, 0, 80);
    this.garmentDoc.save(this.name + '.pdf');

};

protGarmentProduct.prototype.getMyConstruction = function (hostUrlPrefix, numConstructionBranchId) {
    var strTaskUrl = hostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/construction/FindConstructionInfo.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
    var arrCurrentConstruction = [];
    //uncomment this for test runs offline
    if (location.protocol == 'file:') {
        strTaskUrl = 'dataSetSamples/findConstructions2.xml'
    };
    //
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
        //namespace is harder to grab so just grabbing the parant element of the first element and then iterating through those
        // need to change this later to correctly use the namespace but, working for now.
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
                arrCurrentConstruction.push(objCurrentRow)
                objCurrentRow = {};
            }

        });
        // and so on for each element that we want to capture
    });
    // and so on for each element that we want to capture
    this.constructionDetail = arrCurrentConstruction;
    console.log(this);
    console.dir(this);
    //alert(objGarmentProductToModify.construction.constructionData);


};
//need to spot check why not finding 'FindMeasurements2.xml' as a task in production.  This one seems to bring the whole library back.
//logic should be the same though.
//*fixed this by correctly using the name space element below wc:\\INSTANCE
protGarmentProduct.prototype.getMyMeasurement = function (hostUrlPrefix, numMeasurementBranchId) {
    //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml?oid=VR:com.lcs.wc.measurements.LCSMeasurements:2394285&instance=net.hbi.res.wsflexappprd1v.windchillAdapter
    var strTaskUrl = hostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
    var arrCurrentMeasurement = [];
    //uncomment this for test runs offline
    if (location.protocol == 'file:') {
        strTaskUrl = 'dataSetSamples/FindMeasurements.xml'
    };
    //
    $.ajax({
        url: strTaskUrl,
        type: 'get',
        data: {
            oid: 'VR:com.lcs.wc.measurements.LCSMeasurements:' + numMeasurementBranchId,
            instance: 'net.hbi.res.wsflexappprd1v.windchillAdapter'
        },
        async: true

    }).done(function (data) {
        $('wc\\:INSTANCE', data).each(function () {
            var objRow = {};
            objRow.id = $(this).find('id ').text();
            objRow.sortingNumber = $(this).find('sortingNumber ').text();
            objRow.name = $(this).find('name ').text();
            objRow.point1 = $(this).find('point1 ').text();
            objRow.point2 = $(this).find('point2 ').text();
            objRow.plusTolerance = $(this).find('plusTolerance ').text();
            objRow.plusTolerance = $(this).find('plusTolerance ').text();
            objRow.minusTolerance = $(this).find('minusTolerance ').text();
            objRow.minusTolerance = $(this).find('minusTolerance ').text();
            objRow.IDA2A2 = $(this).find('IDA2A2').text();
            objRow.pointsOfMeasureType = $(this).find('pointsOfMeasureType').text();
            objRow.effectSequence = $(this).find('effectSequence ').text();
            objRow.hbiPatternPiece = $(this).find('hbiPatternPiece ').text();
            objRow.placementAmount = $(this).find('placementAmount ').text();
            objRow.actualMeasurement = $(this).find('actualMeasurement ').text();
            objRow.Illustration = $(this).find('Illustration ').text();
            objRow.measurementName = $(this).find('measurementName').text();
            objRow.section = $(this).find('section ').text();
            objRow.hbiGradeCode = $(this).find('hbiGradeCode').text();
            objRow.hbiPiecesPerGarment = $(this).find('hbiPiecesPerGarment ').text();
            objRow.htmInstruction = $(this).find('htmInstruction ').text();
            objRow.quotedMeasurementDelta = $(this).find('quotedMeasurementDelta ').text();
            objRow.number = $(this).find('number').text();
            objRow.criticalPom = $(this).find('criticalPom ').text();
            objRow.libraryItemReference = $(this).find('libraryItemReference').text();
            objRow.howToMeasure = $(this).find('howToMeasure').text();
            objRow.placementReference = $(this).find('placementReference').text();
            objRow.actualMeasurementDelta = $(this).find('actualMeasurementDelta ').text();
            objRow.requestedMeasurement = $(this).find('requestedMeasurement ').text();
            objRow.newMeasurement = $(this).find('newMeasurement ').text();
            objRow.sampleMeasurementComments = $(this).find('sampleMeasurementComments ').text();
            objRow.quotedMeasurement = $(this).find('quotedMeasurement ').text();
            objRow.highLight = $(this).find('highLight ').text();
            objRow.placeholderRow = $(this).find('placeholderRow ').text();
            /*
            Still need to add logic here to deal with size variation and variable columns as a result.
            */
            arrCurrentMeasurement.push(objRow);
        });

    });
    this.measurementDetail = arrCurrentMeasurement;
}

protGarmentProduct.prototype.processProductRelationships = function (strGprodQueryString,currentGarmentToModify,hostUrlPrefix) {
    var strGetColorwayPatternUrl = hostUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gProd=' + strGprodQueryString + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9990008&action=ExecuteReport';
    //if offline use this
    if (location.protocol == 'file:') {
        strGetColorwayPatternUrl = 'dataSetSamples/garmentToPatternToColorway.xml';
    };
    //if offline use this
    $.get(strGetColorwayPatternUrl, function () { }).done(function (prodLinkData) {
        $('row', prodLinkData).each(function () {
            protGarmentProduct.name = $(this).find('Garment_Product_Name').first().text();
            var objColorwayProduct = {};
            var objPatternProduct = {};
            objColorwayProduct.name = $(this).find('Colorway_Product_Name').text();
            objColorwayProduct.objectId = $(this).find('Colorway_Product_Name').attr('objectId');
            objColorwayProduct.branchId = $(this).find('Colorway_Product_Name').attr('branchId');
            objPatternProduct.name = $(this).find('Pattern_Product_Name').text();
            objPatternProduct.objectId = $(this).find('Pattern_Product_Name').attr('objectId');
            objPatternProduct.branchId = $(this).find('Pattern_Product_Name').attr('branchId');
            currentGarmentToModify.colorwayProduct = objColorwayProduct;
            currentGarmentToModify.patternProduct = objPatternProduct;
            currentGarmentToModify.objectId = $(this).find('Garment_Product_Name').attr('objectId');

        });
    }).done(function () {
        localStorage.setItem('lastGarmentRan', this.name);
        currentGarmentToModify.processGarmentSpecs(hostUrlPrefix, this);
        //consider moving this off of 
        $('#topLeftNav').text(this.name);
    });
}

protGarmentProduct.prototype.getSpecComponentsForActiveSpec = function (hostUrlPrefix, currentGarmentToModify) {

    //compose url variables for ajax calls
    var strSpecGetUrl = hostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + this.activeSpecId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9999594&action=ExecuteReport"
    var strDocumentsUrl = hostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + this.activeSpecId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9996723&action=ExecuteReport";
    var strMeasurementsUrl = hostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + this.activeSpecId + "&garmentProductName=" + this.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953962&action=ExecuteReport";
    var strConstructionsUrl = "http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + this.activeSpecId + "&garmentProductName=" + this.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10343155&action=ExecuteReport";
    var strBomsUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + this.activeSpecId + "&garmentProductName=" + this.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953826&action=ExecuteReport";
    //compose url variables for ajax calls
    if (location.protocol == 'file:') {
        //strSpecGetUrl = "dataSetSamples/"; not used?
        strDocumentsUrl = "dataSetSamples/garmentProdSpecsGarmentAndPatternComponentsWEachConnectionDOCUMENTS.xml";
        strMeasurementsUrl = "dataSetSamples/garmentProdSpecsGarmentAndPatternComponentsWEachConnectionMEASUREMENTS.xml";
        strConstructionsUrl = "dataSetSamples/garmentProdSpecGarmentAndPatternComponentsWEachConnectionCONSTRUCTION.xml";
        strBomsUrl = "dataSetSamples/garmentProdSpecGarmentAndPatternComponentsWEachConnectionBOMS.xml";

    };
    var arrTableDataArray = [];
    var arrDocuments = [];
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
                currentGarmentToModify.currentGarmentSpec = objGSpec;
                currentGarmentToModify.currentGarmentSpec = objPSpec;
                //this.currentGarmentSpec = objGSpec;
                //this.currentPatternSpec = objPSpec;

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
        currentGarmentToModify.documents = arrDocuments;
        //this.documents = arrDocuments;

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
                currentGarmentToModify.measurement = objComponent;
                //this.measurement = objComponent;
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
                    currentGarmentToModify.construction = objComponent;
                    //this.construction = objComponent;
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
                    currentGarmentToModify.boms = arrBoms;
                    //this.boms = arrBoms;



                });
            });
        })
    }).done(function () {
        console.log(currentGarmentToModify);
        createRelatedProductsDiv(currentGarmentToModify);

    });





};

protGarmentProduct.prototype.processGarmentSpecs = function (strUrlPrefixGmt,currentGarmentToModify) {
    //this.name = $('Garment_product_Name', specData).first().text();
    //moved the above to relationship function
    // not needed herevar strGetColorwayPatternUrl = strUrlPrefixGmt + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gProd=' + this.name + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9990008&action=ExecuteReport';
    var strGetSpecDataUrl = strUrlPrefixGmt + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gProd=' + this.name + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9990008&action=ExecuteReport';
    if (location.protocol == 'file:') {
        strGetSpecDataUrl = 'dataSetSamples/garmentProdToGarmentSpecs.xml';
    };

    var arrSpecArray = [];
    var arrSourceArray = [];
    var arrCombinationArray = [];
    $.get(strGetSpecDataUrl, function () { }).done(function (specData) {
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
        currentGarmentToModify.specs = arrSpecArray;
        currentGarmentToModify.sources = arrSourceArray;
        currentGarmentToModify.seasonSourceSpecCombos = arrCombinationArray;

        //This is where you need to add in getSpecComps for activeSpec 
        for (var i = 0; i < currentGarmentToModify.specs.length; i++) {
            if (currentGarmentToModify.specs[i].active) {
                currentGarmentToModify.activeSpecId = currentGarmentToModify.specs[i].idNumber;
                //getSpecComponentsForActiveSpec(this.specs[i].id, hostUrlPrefix, this);
                
            };
        };

    });
    currentGarmentToModify = this;
    currentGarmentToModify.getSpecComponentsForActiveSpec(strUrlPrefixGmt, this);
};
/*
    Creates a simple 0 configuration table.  Parameter 0 is the id to give to the table as a string, parameter 1 is an array that will populate the number of columns and headers with the text values in that array.  
    The length of the headerArray will deterimine the number of columns in the table.
    */
function createBaseDataTableHtml(strTableId, arrHeaderObjects) {
    var strTableString = '<table id="' + strTableId + '" class="col-xs-12 col-md-8"> <thead><tr>';
    for (var i = 0; i < arrHeaderObjects.length; i++) {
        var strHeaderString = arrHeaderObjects[i];
        strTableString = strTableString + '<th>' + strHeaderString + '</th>';

    };
    strTableString = strTableString + '</tr></thead></table>';
    return strTableString;

};
/*
Returns a div strong that contains a 'page' -> container -> article string with the article having a class of col-md-4 col-sm-6 col-xs-12
param 0 div id
param 1 number of rows

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
/*Pass the img(html) tag to this function. It will return the image in base64 encoding. It will be re-encoded though. So you cannot access the original image data.*/
/*
This function will be used to take the operative current specs and select the potential reports that can be generated.  



*/
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

function generateAvailableReportsList() {


};

var getImageFromUrl = function (url, callback) {
    var img = new Image, data, ret = { data: null, pending: true };

    img.onError = function () {
        throw new Error('Cannot load image: "' + url + '"');
    }
    img.onload = function () {
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        // Grab the image as a jpeg encoded in base64, but only the data
        data = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
        // Convert the data to binary form
        data = atob(data)
        document.body.removeChild(canvas);

        ret['data'] = data;
        ret['pending'] = false;
        if (typeof callback === 'function') {
            callback(data);
        }
    }
    img.src = url;

    return ret;
}
/*
param 0 array to pass through 
*/
function getBase64StringsFromUrls(arrImgUrls) {
    var strBase64StringDataUrl = '';

    for (var i = 0; i < arrImgUrls.length; i++) {
        $.ajax({
            url: arrImgUrls[i],
            async: false
        }).done(function (data) {
            convertImgToBase64(arrImgUrls[i], function (base64Img) {
                var imgForDoc = new Image();
                imgForDoc.src = base64Img
                arrImgUrls.push(imgForDoc);

            })

        });

    };

    return arrImgUrls;

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


//this below function should become a method of the garmentProduct class
function createRelatedProductsDiv(currentGarmentProduct) {
    //$('#relationships').fadeOut().remove();
    $('#garmentHeader *').remove();
    var strSpecsDivString = appendBootStrapDivPage('relationships', 1);
    var strTableString = '<table class="table" id="tblRelationships"><tr><th>Relationship</th><th>Product</th></tr><tbody>';
    strTableString = strTableString + "<tr><td>Colorway Product</td><td>" + currentGarmentProduct.colorwayProduct.name + "</td></td>";
    strTableString = strTableString + "<tr><td>Pattern Product</td><td>" + currentGarmentProduct.patternProduct.name + "</td></td>";
    strTableString = strTableString + "</tbody></table>";
    //$('head').append(strSpecsDivString);
    $('#garmentHeader').append(strTableString);
    //$('#navbar ul').first().append("<li><a href='#garmentHeader'>Relationships</a></li>");

};
/*

Takes the id of an html element in param 0 and attempts to infer how to turn this into a pdf without explicit direction
*/
function pdfFromHtml(id) {

    var doc = new jsPDF('landscape');
    var tblFromHtml = document.getElementById(id);
    //doc.fromHTML(tblFromHtml);
    for (var i = 0; i < currentGarmentProduct.base64DocumentArray.length; i++) {
        var objLoopObject = {};
        objLoopObject = currentGarmentProduct.base64DocumentArray[i];
        doc.addImage(objLoopObject.imageBase.src, 'PNG', 0, 0, 200, 200);
        doc.addPage();

    };

    doc.save('imageTest.pdf');

};


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


var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;
        // an array that will be populated with substring matches
        matches = [];
        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function (i, str) {
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
param0 url from which to get data
param1 jquery selector string for element which will receive the typeahead functionality
param2 jquery selector string to use on the document element within the xml response to populate the array for the typeahead
*/
function applyTypeAheadToElement(functionUrl, strJquerySelector, strDataDocumentSelector) {
    var arrGarmentProductsArrayForTypeAhead = [];
    $.ajax({
        url: functionUrl

    }).done(function (data) {
        $(strDataDocumentSelector, data).each(function () {
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

//allows for slow animated scroll
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

//prepopulates the elemSelector field based on a check of local storage for param 0
function checkStorageFor(strCheckFor, jqSelectorToPopulateIfStorageExists) {
    if (typeof (localStorage.getItem(strCheckFor)) == 'undefined') {
        //alert('nothing');
    }
    else {
        //alert(localStorage.getItem('lastGarmentRan'));
        $(jqSelectorToPopulateIfStorageExists).val(localStorage.getItem(strCheckFor));
    };
};

protGarmentProduct.prototype.getAllMyData = function (strUrlPrefix,specId) {
    var strSpecGetUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9999594&action=ExecuteReport"
    var strDocumentsUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9996723&action=ExecuteReport";
    var strMeasurementsUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&garmentProductName=" + this.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953962&action=ExecuteReport";
    var strConstructionsUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&garmentProductName=" + this.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10343155&action=ExecuteReport";
    var strBomsUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + specId + "&garmentProductName=" + this.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953826&action=ExecuteReport";
    var strConTaskUrl = strUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/construction/FindConstructionInfo.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
   
    var d1 = $.ajax({
        url: strDocumentsUrl,
        type: 'get'

    });

    var d2 = $.ajax({
        url: strMeasurementsUrl,
        type: 'get'

    });

    var d3 = $.ajax({
        url: strConstructionsUrl,
        type: 'get'

    });

   

  

    $.when(d1, d2, d3).done(function (d1, d2, d3) {
        console.log(d1[0]); // v1 is undefined
        console.log(d2[0]); // v2 is "abc"
        console.log(d3[0]); // v3 is an array [ 1, 2, 3, 4, 5 ]
        
    });
};