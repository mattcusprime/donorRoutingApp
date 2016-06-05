var widthArray = [];
var widthArrayTrim = [];
var rectY = 30;
var imgData = 'data:image/jpeg;base64,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'
var whatRun;
function createTheHeaderSpread(documentToPDF) {
    var rectX = 0;
    //var rectY = 30;	
    var i = 0;
    var rectAngleWidth = 20;
    var rectAngleHeight = 10;
    documentToPDF.setFontSize(13);
    while (i < 15) {
        switch (i) {

            case 0:
                rectAngleWidth = 70;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 1:
                rectAngleWidth = 10;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 2:
                rectAngleWidth = 22;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;

                break;
            case 3:
                rectAngleWidth = 10;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 4:
                rectAngleWidth = 15;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 5:
                rectAngleWidth = 35;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 6:
                rectAngleWidth = 20;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 7:
                rectAngleWidth = 20;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 8:
                rectAngleWidth = 20;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 9:
                rectAngleWidth = 25;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 10:
                rectAngleWidth = 10;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 11:
                rectAngleWidth = 20;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 12:
                rectAngleWidth = 35;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 13:
                rectAngleWidth = 35;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            default:
                //documentToPDF.setDrawColor(255,255,255);
                //documentToPDF.rect(rectX, 0, 25, 20, 'FD');
        }
        i++;
        widthArray.push(rectAngleWidth);
    };
    rectX = 0;
    var textX = 0;

    var textY = rectY + 4;
    var counterFromArray = 0;
    var amountToIncrement = widthArray[counterFromArray];
    var plusNextWord = 5
    documentToPDF.setTextColor(255, 255, 255);
    documentToPDF.text('Part', 1, textY);
    documentToPDF.text('Code', 1, textY + plusNextWord);

    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Cut', textX, textY);
    documentToPDF.text('Mtd', textX, textY + plusNextWord);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Mfg', textX, textY);
    documentToPDF.text('Fabric', textX, textY + plusNextWord);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Shd', textX, textY);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Size', textX, textY);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Marker', textX, textY);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Cond', textX, textY);
    documentToPDF.text('Width', textX, textY + plusNextWord);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('#Gmts', textX, textY);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('MU', textX, textY);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Total', textX, textY);
    documentToPDF.text('Length', textX, textY + plusNextWord);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;

    documentToPDF.text('Ply', textX, textY);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Usage', textX, textY);
    documentToPDF.text('Yd/Dz', textX, textY + plusNextWord);
    amountToIncrement = widthArray[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Usage', textX, textY);
    documentToPDF.text('Lb/Dz', textX, textY + plusNextWord);


};

function createSpecProdSeasHeader(documentToPDF) {
    var headerProdName = $('#prodName').text();
    var headerSpecName = $('#specName').text();
    var headerSeasonName = $('#seasName').text();
    var spacer = 8

    documentToPDF.setFontSize(12);

    initialHeaderHeight = 10;

    documentToPDF.text('Product Name:', 10, initialHeaderHeight);
    documentToPDF.text(headerProdName, 51, initialHeaderHeight);
    initialHeaderHeight += spacer

    documentToPDF.text('Spec Name:', 10, initialHeaderHeight);
    documentToPDF.text(headerSpecName, 51, initialHeaderHeight);
    initialHeaderHeight += spacer
    documentToPDF.text('Confidential: Not to be copied or distributed without the permission of Hanesbrands, Inc.', 130, initialHeaderHeight);
    documentToPDF.text('Season Name:', 10, initialHeaderHeight);
    documentToPDF.text(headerSeasonName, 51, initialHeaderHeight);
    initialHeaderHeight += spacer

    //documentToPDF.text('Usages in this report are for directional purposes only.  They are not used for loading.', 130,initialHeaderHeight + 15);
    documentToPDF.addImage(imgData, 'JPEG', 210, 5, 50, 16);
    documentToPDF.setDrawColor(0, 0, 0);
    documentToPDF.setLineWidth(0.1);

    documentToPDF.setFontSize(13);

}

function createTheHeaderTrim(documentToPDF) {
    widthArrayTrim = [];
    var rectX = 0;
    var i = 0;
    var rectAngleWidth = 0;
    var rectAngleHeight = 10;
    documentToPDF.setFontSize(13);
    while (i < 15) {
        switch (i) {

            case 0:
                rectAngleWidth = 80;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 1:
                rectAngleWidth = 15;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 2:
                rectAngleWidth = 25;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;

                break;
            case 3:
                rectAngleWidth = 10;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 4:
                rectAngleWidth = 20;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 5:
                rectAngleWidth = 25;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 6:
                rectAngleWidth = 20;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 7:
                rectAngleWidth = 20;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 8:
                rectAngleWidth = 20;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 9:
                rectAngleWidth = 25;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
            case 10:
                rectAngleWidth = 100;
                documentToPDF.setDrawColor(255, 255, 255);
                documentToPDF.rect(rectX, rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
                /*case 11:
                rectAngleWidth = 20;
                documentToPDF.setDrawColor(255,255,255);
                documentToPDF.rect(rectX,rectY, 100, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
                case 12:
                rectAngleWidth = 35;
                documentToPDF.setDrawColor(255,255,255);
                documentToPDF.rect(rectX,rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;
                case 13:
                rectAngleWidth = 35;
                documentToPDF.setDrawColor(255,255,255);
                documentToPDF.rect(rectX,rectY, rectAngleWidth, rectAngleHeight, 'FD');
                rectX += rectAngleWidth;
                break;*/
            default:
                //documentToPDF.setDrawColor(255,255,255);
                //documentToPDF.rect(rectX,rectY, 25, 20, 'FD');
        }
        i++;
        widthArrayTrim.push(rectAngleWidth);
    };
    rectX = 0;
    var textX = 0;

    var textY = rectY + 4;
    var counterFromArray = 0;
    var amountToIncrement = widthArrayTrim[counterFromArray];
    var plusNextWord = 5
    documentToPDF.setTextColor(255, 255, 255);
    documentToPDF.text('Part', 1, textY);
    documentToPDF.text('Code', 1, textY + plusNextWord);

    amountToIncrement = widthArrayTrim[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Cut', textX, textY);
    documentToPDF.text('Mtd', textX, textY + plusNextWord);
    amountToIncrement = widthArrayTrim[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Mfg', textX, textY);
    documentToPDF.text('Fabric', textX, textY + plusNextWord);
    amountToIncrement = widthArrayTrim[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Shd', textX, textY);
    amountToIncrement = widthArrayTrim[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Size', textX, textY);
    amountToIncrement = widthArrayTrim[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Pattern', textX, textY);
    documentToPDF.text('#/Version', textX, textY + plusNextWord);
    amountToIncrement = widthArrayTrim[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('#Gmts', textX, textY);
    //documentToPDF.text('Width',textX,textY + plusNextWord);
    amountToIncrement = widthArrayTrim[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Trim Cut', textX, textY);
    documentToPDF.text('Width', textX, textY + plusNextWord);
    amountToIncrement = widthArrayTrim[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Total', textX, textY);
    documentToPDF.text('Length', textX, textY + plusNextWord);
    amountToIncrement = widthArrayTrim[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Usage', textX, textY);
    documentToPDF.text('Yd/Dz', textX, textY + plusNextWord);
    amountToIncrement = widthArrayTrim[counterFromArray];
    textX += amountToIncrement;
    counterFromArray++;
    documentToPDF.text('Usage', textX, textY);
    documentToPDF.text('Lb/Dz', textX, textY + plusNextWord);


};


$('document').ready(function () {
    $('#createPDF').click(function () {
        var numberOfHeaders = $('th').length;

        //make it as an "each page" function
        var doc = new jsPDF('landscape');
        whatRun = $("input:checked").val();
        if (whatRun == "Both" || whatRun == "Spread") {
            createSpecProdSeasHeader(doc);
            createTheHeaderSpread(doc);

            doc.setTextColor(0, 0, 0);
            var rowIndex = 16 + rectY; //(for depth)
            doc.setFontSize(10);

            $('#spreadReport tbody tr').each(function (index) {
                var cellCounter = 0;
                var hasItBeenTwentyFiveRows = index % 16;
                if (hasItBeenTwentyFiveRows == 0 && index != 0) {

                    doc.addPage();
                    createSpecProdSeasHeader(doc);
                    createTheHeaderSpread(doc);

                    rowIndex = 16 + rectY;


                };
                var evenOdd = index % 2;


                if (evenOdd == 0) {
                    doc.setFillColor(169, 169, 169);
                }
                else {
                    doc.setFillColor(192, 192, 192);
                };
                doc.rect(0, rowIndex - 6, 500, 10, 'FD'); //  Black sqaure with rounded corners		
                var cellIndex = 0; //(for horizontal)

                $(this).find('td').each(function (tdIndex) {
                    doc.setFontSize(13);
                    doc.setTextColor(0, 0, 0);
                    var cellTextValue = $(this).text();
                    cellCounter++;
                    var xValue = 0;
                    for (var j = 0; j < tdIndex; j++) {
                        xValue += widthArray[j];
                        doc.setDrawColor(0, 0, 0);
                        doc.setLineWidth(0.1);
                        //var littleToTheLeft = xValue;
                        doc.line(xValue, rowIndex + 3.5, xValue, rectY);

                    };
                    xValue += 1;
                    //insert something here for when it's longer than a certain amount.
                    doc.text(cellTextValue, xValue, rowIndex);






                });
                rowIndex += 10;



            });
        };
        if (whatRun == "Both") {
            doc.addPage();
        };
        if (whatRun == "Both" || whatRun == "Trim") {
            rowIndex = 16 + rectY;
            createSpecProdSeasHeader(doc);
            createTheHeaderTrim(doc);

            //this piece is for the trim table now
            $('#trimReport tbody tr').each(function (index) {
                var cellCounter = 0;
                var hasItBeenTwentyFiveRows = index % 16;
                if (hasItBeenTwentyFiveRows == 0 && index != 0) {



                    doc.addPage();
                    //doc.setFontSize(16);
                    createSpecProdSeasHeader(doc);
                    createTheHeaderTrim(doc);

                    rowIndex = 16 + rectY;


                };
                var evenOdd = index % 2;
                if (evenOdd == 0) {
                    doc.setFillColor(169, 169, 169);
                }
                else {
                    doc.setFillColor(192, 192, 192);
                };
                doc.rect(0, rowIndex - 6, 500, 10, 'FD');
                var cellIndex = 0;

                $(this).find('td').each(function (tdIndex) {
                    doc.setFontSize(13);
                    doc.setTextColor(0, 0, 0);
                    var cellTextValue = $(this).text();

                    cellCounter++;
                    var xValue = 0;
                    for (var j = 0; j < tdIndex; j++) {
                        xValue += widthArrayTrim[j];
                        doc.setDrawColor(0, 0, 0);
                        doc.setLineWidth(0.1);
                        //var littleToTheLeft = xValue;
                        doc.line(xValue, rowIndex + 3.5, xValue, rectY);

                    };
                    xValue += 1;
                    var fieldLength = cellTextValue.length;
                    if (fieldLength > 20) {
                        var firstHalfString = cellTextValue.substring(0, 20);
                        var secondHalfString = cellTextValue.substring(20, 50);

                        doc.text(cellTextValue, xValue, rowIndex);
                    }
                    else {
                        doc.text(cellTextValue, xValue, rowIndex);
                    };


                });
                rowIndex += 10;



            });
        };
        //doc.text('Confidential: Not to be copied or distributed without the permission of Hanesbrands, Inc.', 0,rowIndex);
        //doc.text(headerProdName, 185,rowIndex);
        var prodNameForPdf = $('#prodName').text();
        var pdfString = '.pdf'
        var fileName = prodNameForPdf.concat(pdfString);
        doc.save(prodNameForPdf);

    });

})
