const subTitleValue			= "Ver. Alpha";
const TEXTS					= {
	empty_list: "Create a trade, click on the '+ Trade' button or from admin section, data import.",
	empty_list_or_clear: "or clear the search",
	empty_list_select: "Select or unselect a filter",
	empty_list_trades: "trades available.",
	totals_1: "not profitable",
	totals_2: "profitable",
	totals_3: "More stop loss than take profits",
	totals_4: "neutral position size",
	totals_5: "Aggressive Position",
	totals_6: "¿Leverage in losses very high?",
	totals_7: "¿low RRR?",
	totals_8: "¿stop-loss too close to entry?",
};

//
// Layout
//
let navbar 					= document.getElementById("navbar");
let footer 					= document.getElementById("footer");
let headerSubTitle			= document.getElementById("subTitle");

//
// Sections
//
let sectionTradeList 		= document.getElementById("trade_list");
let sectionForm				= document.getElementById("trade_form");
let sectionAdmin			= document.getElementById("admin");

//
// Controls section trade list
//
let btnAdmin				= document.getElementById("btnAdmin");
let tradesCountFilter 		= document.getElementById("tradesCountFilter");
let btnFilterOpen 			= document.getElementById("btnFilterOpen");
let btnFilterClosed 		= document.getElementById("btnFilterClosed");
let btnFilterShort 			= document.getElementById("btnFilterShort");
let btnFilterLong 			= document.getElementById("btnFilterLong");
let btnFilterTest 			= document.getElementById("btnFilterTest");
let inputSearch				= document.getElementById("inputSearch");
let btnSearch 				= document.getElementById("btnSearch");
let totalAvgReturn 			= document.getElementById("totalAvgReturn");
let totalAvgHits 			= document.getElementById("totalAvgHits");
let totalMat 				= document.getElementById("totalMat");
let totalFK 				= document.getElementById("totalFK");
let messages 				= document.getElementById("messages");
let btnNewTrade 			= document.getElementById("btnNewTrade"); 
let tableTradeList 			= document.getElementById("tableTradeList"); 
let tableTradeListMobile	= document.getElementById("tableTradeListMobile");

//
// Controls section admin
//
let btnLightTheme			= document.getElementById("btnLightTheme");
let btnDarkTheme			= document.getElementById("btnDarkTheme");
let btnExportData			= document.getElementById("btnExportData");
let exportDataLink 			= document.getElementById('exportDataLink');
let btnImportData			= document.getElementById("btnImportData");
let btnRemoveDataConfirm	= document.getElementById("btnRemoveDataConfirm");
let btnRemoveDataYes		= document.getElementById("btnRemoveDataYes");
let btnRemoveDataCancel		= document.getElementById("btnRemoveDataCancel");

//
// Controls section form trade
//
let tradesID 				= {};
let form 					= document.getElementById("formTrade");
let inputHiddenID			= document.getElementById("inputHiddenID");
let inputTextPer 			= document.getElementById("inputTextPer");
let inputTextLeverage 		= document.getElementById("inputTextLeverage");
let inputTextEntryPrice 	= document.getElementById("inputTextEntryPrice");
let inputTextStopLoss 		= document.getElementById("inputTextStopLoss");
let inputTextTakeProfit 	= document.getElementById("inputTextTakeProfit");
let inputTextClosePrice 	= document.getElementById("inputTextClosePrice");
let inputRadioPosition		= document.querySelectorAll("input[name='inputRadioPosition']");
let inputRadioPositionShort = document.getElementById("inputRadioPositionShort");
let inputRadioPositionLong 	= document.getElementById("inputRadioPositionLong");
let inputRadioMarketOrLimit1= document.querySelectorAll("input[name='inputRadioMarketOrLimit1']"); 
let inputRadioMarket1 		= document.getElementById("inputRadioMarket1");
let inputRadioLimit1 		= document.getElementById("inputRadioLimit1");
let inputRadioMarketOrLimit2= document.querySelectorAll("input[name='inputRadioMarketOrLimit2']"); 
let inputRadioMarket2 		= document.getElementById("inputRadioMarket2");
let inputRadioLimit2 		= document.getElementById("inputRadioLimit2");
let inputTextComment 		= document.getElementById("inputTextComment");
let inputTextOrderTypeTest	= document.getElementById("inputTextOrderTypeTest");
let divCalcR				= document.getElementById("calcR");
let divCalcR2				= document.getElementById("calcR2");
let divCalcRF				= document.getElementById("calcRF");
let divCalcRisk				= document.getElementById("calcRisk");
let divCalcRrr				= document.getElementById("calcRrr");
let divCalcReturn			= document.getElementById("calcReturn");
let btnSaveTrade 			= document.getElementById("btnSaveTrade");
let btnDuplicateTrade		= document.getElementById("btnDuplicateTrade");
let btnCancelTrade 			= document.getElementById("btnCancelTrade"); 
let smallTextDates			= document.getElementById("smallTextDates");
let calculateRisk 			= 0;
let calculateRF 			= 0;
let calculateR 				= 0;
let calculateR2				= 0;

//
// load page
//
window.addEventListener("load", function(event) {
	headerSubTitle.innerHTML = subTitleValue;
	loadSection();
});

//
// controls events
//
btnLightTheme.addEventListener("click", function() {
	setTheme('light');
});

btnDarkTheme.addEventListener("click", function() {
	setTheme('dark');
});

btnAdmin.addEventListener("click", function() {
	sectionAdmin.classList.remove("d-none");
	sectionForm.classList.add("d-none");
	sectionTradeList.classList.add("d-none");
});

btnCancelTrade.addEventListener("blur", function() {
	this.classList.add("shadow-sm");
});

btnCancelTrade.addEventListener("focus", function() {
	this.classList.remove("shadow-sm");
});

btnCancelTrade.addEventListener("click", function() {
	sectionForm.classList.add("d-none");
});

btnNewTrade.addEventListener("click", function() {
	sectionForm.classList.remove("d-none");
	form.reset();
	inputHiddenID.value = '0';
	smallTextDates.innerHTML = "&nbsp;";
	formTradeCalcReset();
	inputTextPer.focus();
});

btnSaveTrade.addEventListener("blur", function() {
	this.classList.add("shadow-sm");
});

btnSaveTrade.addEventListener("focus", function() {
	this.classList.remove("shadow-sm");
});

btnSaveTrade.addEventListener("click", function() {
	tradeSave();
	sectionForm.classList.add("d-none");
});

btnDuplicateTrade.addEventListener("blur", function() {
	this.classList.add("shadow-sm");
});

btnDuplicateTrade.addEventListener("focus", function() {
	this.classList.remove("shadow-sm");
});

btnDuplicateTrade.addEventListener("click", function() {
	inputHiddenID.value = '0';
	tradeSave();
	sectionForm.classList.add("d-none");
});

btnFilterShort.addEventListener("click", function() {
	renderTableTradeList();
});

btnFilterLong.addEventListener("click", function() {
	renderTableTradeList();
});

btnFilterTest.addEventListener("click", function() {
	renderTableTradeList();
});

btnFilterOpen.addEventListener("click", function() {
	renderTableTradeList();
});

btnFilterClosed.addEventListener("click", function() {
	renderTableTradeList();
});

btnSearch.addEventListener("click", function() {
	renderTableTradeList();
});

inputSearch.addEventListener("keypress", function(event) {
	if (event.keyCode === 13) {
		renderTableTradeList();
    }
});

inputRadioPositionShort.addEventListener("click", function(event) {
	reloadCalcR();
});

inputRadioPositionLong.addEventListener("click", function(event) {
	reloadCalcR();
});

inputTextLeverage.addEventListener("keyup", function(event) {
	reloadCalcFor('leverage');
});

inputTextEntryPrice.addEventListener("keyup", function(event) {
	reloadCalcFor('entryPrice');
});

inputTextStopLoss.addEventListener("keyup", function(event) {
	reloadCalcFor('stopLoss');
});

inputTextTakeProfit.addEventListener("keyup", function(event) {
	reloadCalcFor('takeProfit');
});

inputTextClosePrice.addEventListener("keyup", function(event) {
	reloadCalcFor('closePrice');
});

inputRadioMarket1.addEventListener("click", function(event){
	reloadCalcFor("marketOrLimit");
});

inputRadioLimit1.addEventListener("click", function(event){
	reloadCalcFor("marketOrLimit");
});

//
// functions trade list
//
let filterData = function() {
	let data = Object.values(appData.items);
	data.sort(function(a,b) { return b.createdAt - a.createdAt;});
	let countData = 0;
	let searchValue = inputSearch.value;
	for(let id in data) {
		countData++;
		let trade = data[id];
		if(!trade.comment.includes(searchValue) && !trade.per.includes(searchValue)) delete data[id];
		if(!btnFilterClosed.checked && !btnFilterOpen.checked) delete data[id];
		if(!btnFilterClosed.checked || !btnFilterOpen.checked) {
			if(trade.closePrice !== "" 		&& btnFilterOpen.checked) delete data[id];
			if(trade.closePrice === "" 		&& btnFilterClosed.checked) delete data[id];
		}
		if(trade.position === "short" 	&& btnFilterLong.checked) delete data[id];
		if(trade.position === "long" 	&& btnFilterShort.checked) delete data[id];
		if(trade.orderType !== "test" 	&& btnFilterTest.checked) delete data[id];
	}
	return { countAll: countData, data };
};

let renderTableTradeList = function() {
	let tradesFiltered 				= filterData();
	let tradesFilteredData 			= tradesFiltered.data;
	let tradesCountAll 				= tradesFiltered.countAll;
	let tradesFilteredCount 		= 0;
	tableTradeList.innerHTML 		= "";
	tableTradeListMobile.innerHTML 	= "";

	for(let id in tradesFilteredData) {
		tradesFilteredCount++;
		let trade 			= tradesFilteredData[id];
		let calcR 			= myFormatNumber(trade.calcR);
		let calcR2 			= myFormatNumber(trade.calcR2);
		let calcRF 			= myFormatNumber(trade.calcRF);
		let calcRisk 		= myFormatNumber(trade.calcRisk);
		let calcRrr 		= trade.calcRrr;
		let calcReturn 		= myFormatNumber(trade.calcReturn, "%");
		let positionColor 	= trade.position === "long" ? "success" : "danger";

		let trHTML			= "";
		let trHTMLMobile	= "";
		let classTD 		= "border-0 border-top py-1 pb-0 text-end";
		let classBadgeTotal = "fw-normal badge bg-light border-0 text-secondary px-3 border-1 border-start border-primary ms-1";
		let classBadgeTimes = "fw-normal badge bg-light border-0 text-secondary px-3 border-1 border-start border-secondary";
		let btnTradeEdit	= "<a href='#"+trade.id+"' title='"+trade.comment+"' class='btn d-block text-start border-0 btn-sm btn-primary bg-primary bg-opacity-10 text-primary shadow-sm position-relative'>"+trade.per+"</a>";
		let btnTradeRemove	= "<a href='#section/trade-list' class='btnTradeDelete px-2 btn btn-sm btn-danger text-danger bg-danger bg-opacity-10 border-0 shadow-sm' onclick='tradeDelete("+trade.id+");'>X</a>";

		let checkTrades 	= "<span class='fw-normal ms-1 badge bg-"+positionColor+" bg-opacity-10 border-0 text-"+positionColor+" px-2 border-1 border-start border-"+positionColor+"'>"+trade.position+"</span>";
		checkTrades 		+="<span class='fw-normal ms-1 badge bg-secondary bg-opacity-10 border-0 text-secondary px-2 border-1 border-start border-secondary'>1"+trade.marketOrLimit1.substr(0,1).toUpperCase()+"</span>";
		checkTrades 		+="<span class='fw-normal ms-1 badge bg-secondary bg-opacity-10 border-0 text-secondary px-2 border-1 border-start border-secondary'>2"+trade.marketOrLimit2.substr(0,1).toUpperCase()+"</span>";
		checkTrades 		+="<span class='fw-normal ms-1 badge bg-warning bg-opacity-10 border-0 text-secondary px-2 border-1 border-start border-warning'>"+trade.orderType+"</span>";

		let totalTrades 	= "";
		totalTrades 		+= (calcR !== "") 		? "<span class='" + classBadgeTotal + "'>R " + calcR + "</span>" 			: "";
		totalTrades 		+= (calcR2 !== "") 		? "<span class='" + classBadgeTotal + "'>R2 " + calcR2 + "</span>" 			: "";
		totalTrades 		+= (calcRF !== "") 		? "<span class='" + classBadgeTotal + "'>RF " + calcRF + "</span>" 			: "";
		totalTrades 		+= (calcRisk !== "") 	? "<span class='" + classBadgeTotal + "'>Risk " + calcRisk + "</span>" 		: "";
		totalTrades 		+= (calcRrr !== "") 	? "<span class='" + classBadgeTotal + "'>Rrr " + calcRrr + "</span>" 		: "";
		totalTrades 		+= (calcReturn !== "") 	? "<span class='" + classBadgeTotal + "'>Return " + calcReturn + "</span>" 	: "";

		// -- NO MOBILE --
		//
		trHTML += "<tr>";
		trHTML += "	<td class='" + classTD + "'>" + btnTradeEdit + "</td>";
		trHTML += "	<td class='" + classTD + "'>" + trade.leverage + "</td>";
		trHTML += "	<td class='" + classTD + "'>" + trade.entryPrice + "</td>";
		trHTML += "	<td class='" + classTD + "'>" + trade.stopLoss + "</td>";
		trHTML += "	<td class='" + classTD + "'>" + trade.takeProfit + "</td>";
		trHTML += "	<td class='" + classTD + "'>" + trade.closePrice + "</td>";
		trHTML += "	<td class='" + classTD + "'>" + btnTradeRemove + "</td>";
		trHTML += "</tr>";
		trHTML += "<tr>";
		trHTML += "	<td class='py-1 pt-0'>" + checkTrades.split("ms-1").join("me-1") + "</td>";
		trHTML += "	<td class='py-1 pt-0' colspan='5'>" + totalTrades.split("ms-1").join("me-1") + "</td>";
		// trHTML += "	<td class='py-1' colspan='5'>" + totalTrades + " ";
		// trHTML += "		<span class='" + classBadgeTimes + "'>Ago " + timeElapsed(trade.createdAt) + "</span>";
		// trHTML += "	</td>";
		trHTML += "	<td class='py-1 pt-0'>&nbsp;</td>";
		trHTML += "</tr>";

		// -- OK MOBILE --
		// 
		// trHTMLMobile += "<tr>";
		// trHTMLMobile += "	<td class='border-top border-0' colspan='6'>";
		// trHTMLMobile += " 		<span class='" + classBadgeTimes.split("px-3").join("px-2") + "'>Ago " + timeElapsed(trade.createdAt) + "..</span></span>";
		// trHTMLMobile += " 	</td>";
		// trHTMLMobile += "</tr>";
		trHTMLMobile += "<tr>";
		trHTMLMobile += "	<td class='border-top border-0 pb-0' colspan='5'>" + btnTradeEdit + "</td>";
		trHTMLMobile += "	<td class='border-top border-0 pb-0 text-end'>" + btnTradeRemove + "</td>";
		trHTMLMobile += "</tr>";
		trHTMLMobile += "<tr>";
		trHTMLMobile += "	<td class='pt-0 border-0 text-end pb-0' colspan='5'>" + checkTrades + "</td>";
		trHTMLMobile += "	<td class='pt-0 border-0 pb-0'>&nbsp;</td>";
		trHTMLMobile += "</tr>";
		trHTMLMobile += "<tr>";
		trHTMLMobile += "	<td class='py-0 pb-0 border-0 text-end'><span class='text-secondary'>X</span></td>";
		trHTMLMobile += "	<td class='py-0 pb-0 border-0 text-end'><span class='text-secondary'>EP</span></td>";
		trHTMLMobile += "	<td class='py-0 pb-0 border-0 text-end'><span class='text-secondary'>SL</span></td>";
		trHTMLMobile += "	<td class='py-0 pb-0 border-0 text-end'><span class='text-secondary'>TP</span></td>";
		trHTMLMobile += "	<td class='py-0 pb-0 border-0 text-end'><span class='text-secondary'>CP</span></td>";
		trHTMLMobile += "	<td class='py-0 pb-0 border-0 text-end'>&nbsp;</td>";
		trHTMLMobile += "</tr>";
		trHTMLMobile += "<tr>";
		trHTMLMobile += "	<td class='py-0 border-0 text-end'>" + trade.leverage + "</td>";
		trHTMLMobile += "	<td class='py-0 border-0 text-end'>" + trade.entryPrice + "</td>";
		trHTMLMobile += "	<td class='py-0 border-0 text-end'>" + trade.stopLoss + "</td>";
		trHTMLMobile += "	<td class='py-0 border-0 text-end'>" + trade.takeProfit + "</td>";
		trHTMLMobile += "	<td class='py-0 border-0 text-end'>" + trade.closePrice + "</td>";
		trHTMLMobile += "	<td class='py-0 border-0 text-end'>&nbsp;</td>";
		trHTMLMobile += "</tr>";
		trHTMLMobile += "<tr>";
		trHTMLMobile += "	<td class='border-bottom pt-0 border-0 text-end' colspan='5'> " + totalTrades + "</td>";
		trHTMLMobile += "	<td class='border-bottom pt-0 border-0 text-end'>&nbsp;</td>";
		trHTMLMobile += "</tr>";

		tableTradeList.innerHTML += trHTML;
		tableTradeListMobile.innerHTML += trHTMLMobile;
	}

	tradesCountFilter.innerHTML = (tradesFilteredCount === tradesCountAll) ? tradesFilteredCount : tradesFilteredCount + "/" +tradesCountAll;

	let msg0 	= (inputSearch.value !== "") ? " " + TEXTS.empty_list_or_clear : "";
	let msg2 	= TEXTS.empty_list_select + msg0 + ", " + tradesCountAll + " " + TEXTS.empty_list_trades;
	let msg 	= (tradesCountAll) ? msg2 : TEXTS.empty_list;
	let msgHTML = "<tr><td colspan='10' class='tradeListEmptyMessage text-center text-body-tertiary p-5'><small>- " + msg + " -</small></td></tr>";

	tableTradeList.innerHTML 		= (tableTradeList.innerHTML === "") ?       msgHTML : tableTradeList.innerHTML;
	tableTradeListMobile.innerHTML 	= (tableTradeListMobile.innerHTML === "") ? msgHTML : tableTradeListMobile.innerHTML;

	renderTotalTrades(tradesFilteredData);
	setClickButtons();
		
	if(getTheme() === "dark") loadDarkTheme();
};

let renderTotalTrades = function(trades) {
	let avgReturn 			= 0;
	let avgReturnCount		= 0;
	let porcOK       		= 0;
	let returnMay0			= 0;
	let returnMin0   		= 0;
	let sumReturnPos		= 0;
	let sumReturnNeg		= 0;
	let fKelly          	= 0;
	let mat             	= 0;
	let tradesCount 		= 0;
	for(id in trades) {
		tradesCount++;
		let trade = trades[id];
		if(trade.calcReturn !== "") {
			avgReturn += parseFloat(trade.calcReturn);
			avgReturnCount++;
			let ret = parseFloat(trade.calcReturn);
			if(ret > 0) {
			  sumReturnPos += ret;
			  returnMay0++;
			} else {
			  sumReturnNeg += ret;
			  returnMin0++;
			}
		}
	}

	if(returnMin0 === 0) returnMin0 = 1
	if(returnMay0 === 0) returnMay0 = 1;

	avgReturn 	= avgReturn/(avgReturnCount === 0 ? 1 : avgReturnCount)
	porcOK		= (returnMay0/(avgReturnCount === 0 ? 1 : avgReturnCount)) * 100
	let AB4     = sumReturnNeg / returnMin0 
	let AA4     = sumReturnPos / returnMay0 
	let E13     = porcOK / 100
	AB4         = AB4 === 0 ? 1 : AB4
	AA4         = AA4 === 0 ? 1 : AA4
	fKelly      = ((E13-(1-E13)/(AB4/AA4))/10/2) * 100  
	let E14     = (100 - (E13 * 100)) / 100
	let AA3     = (sumReturnPos / returnMay0) * (E13 === 0 ? 1 : E13) 
	let AB3     = (sumReturnNeg / returnMin0) * (E14 === 0 ? 1 : E14) 

	if(AB3 !== 0) {
	  if(AA3 !== 0) {
		mat = ((E13*(AA3/AB3))-E14)*-1
	  } else {
		mat = 0
	  }
	} else {
	  mat = E13*AA3*100
	}

	let sysRent   	= (mat < 1)  ? "+" + TEXTS.totals_1 + "-" : "+" + TEXTS.totals_2 + "-"
	let SLTP      	= (E13<50 && porcOK<0) ? "+" + TEXTS.totals_3 + "-" : ""
	let position  	= ((fKelly===2) ? "+" + TEXTS.totals_4 + "-" : (fKelly>2 ? "+" + TEXTS.totals_5 + "-" : ""));
	let question  	= "+" + TEXTS.totals_6 + " " + TEXTS.totals_7 + "-";
	let SLPI      	= (E14 > 90) ? "+" + TEXTS.totals_8 + "-" : ""

	let classMsg 	= "fw-normal badge bg-white border-0 text-secondary px-3 border-1 border-start border-primary";
	let msgHTML 	= (sysRent + "" + SLTP + "" + position + "" + question + "" + SLPI).split("-").join("</span>");
	msgHTML			= msgHTML.split("+").join('<span class="' + classMsg + '">');
	
	totalAvgReturn.innerHTML= (tradesCount === 0) ? "0" : avgReturn.toFixed(2).toString() + "%";
	totalAvgHits.innerHTML 	= (tradesCount === 0) ? "0.00%" : porcOK.toFixed(2).toString() + "%";
	totalMat.innerHTML 		= mat.toFixed(2);
	totalFK.innerHTML 		= (tradesCount === 0) ? "0.00" : fKelly.toFixed(2);
	messages.innerHTML		= (tradesCount === 0) ? "" : msgHTML;
};

//
// functions trade form
//
const myTrade = function(position, orderType) {
    this.id 			= appData.generator.id();
    tradesID[this.id]	= true;
	this._object		= "trade";
    this.createdAt 		= appData.generator.time();
    this.updatedAt 		= null;
    this.position 		= position; // short or long
    this.per 			= null; 	// BTC/XMR
    this.leverage 		= null;		// 1 or 2 or 3 or etc...
    this.entryPrice 	= null;		// 1500.40
    this.marketOrLimit1 = null;		// market or limit
    this.stopLoss 		= null;		// 1500.00
    this.takeProfit 	= null;		// 1501.00
    this.closePrice 	= null;		// 1500.70
    this.marketOrLimit2 = null;		// market or limit
    this.orderType 		= orderType === undefined ? null : "test";
	this.comment 		= "";		// text...
	this.status			= "open"; 	// open or closed
	this.calcR			= "";		// 12.50
	this.calcR2			= "";		// 15.00
	this.calcRF			= "";		// ...
	this.calcReturn		= "";
	this.calcRisk		= "";
	this.calcRrr		= "";
}

let formTrade = function(idOrName, options, value) {
	
	let objects = {
		selected : idOrName,
		inputHiddenID,
		inputRadioPosition : inputRadioPosition,
		inputTextPer,
		inputTextLeverage,
		inputTextEntryPrice,
		inputRadioMarketOrLimit1 : inputRadioMarketOrLimit1,
		inputTextStopLoss,
		inputTextTakeProfit,
		inputTextClosePrice,
		inputRadioMarketOrLimit2 : inputRadioMarketOrLimit2,
		inputTextOrderType : inputTextOrderTypeTest,
		inputTextComment,	
	}

	if(idOrName === undefined) {
		let values = [];
		
		for(let inputID in objects) {
			let inputLength = objects[inputID].length || 0;
			if(inputLength > 0) {
				objects[inputID].forEach(function(input) {
					if(input.type === "radio") {
						if(input.checked) {
							values[inputID] = input.value;
						} 
					}
				})
			} else {
				values[inputID] = objects[inputID].value
			}
		}

		return { object: objects, value: values };	
	}
	
	if(options === undefined) {
		return document.getElementById(idOrName) || document.querySelectorAll("input[name='" + idOrName + "']");
	}
	
	if(value === undefined) {
		let elements= document.querySelectorAll("input[name='" + idOrName + "']:" + options);
		let el 		= {value: ""};
		if(elements.length > 0) {
			let values = "";
			for(let e in elements) {
				if(elements[e].type === "checkbox") {
					values += elements[e].value + ";";
				} else {
					values = elements[0].value + ";";
				}
			}
			el.value = values.slice(0,-1);
		}
		return el;
	}

	let nodes = document.querySelectorAll("input[name='" + idOrName + "']");

	for(let node in nodes) {
		let el = nodes[node];
		if(el.type === "radio") {
			if(el.value === value) {
				el.checked = true;
			}
		}
		if(el.type === "checkbox") {
			let values = value.split(";");
			for(let index in values) {
				el.checked = false;
				setTimeout(function() {
					if(el.value === values[index]) {
						el.checked = true;
					}
				}, 10);
			}
		}
	}
}

let renderFormTrade = function(id) {
	
	form.reset();
	formTradeCalcReset();

	let trade = appData.get(id); 
	inputHiddenID.value = id;
	formTrade("inputRadioPosition", "checked", trade.position);
	inputTextPer.value = trade.per; 
	inputTextLeverage.value = trade.leverage; 
	inputTextEntryPrice.value = trade.entryPrice; 
	formTrade("inputRadioMarketOrLimit1", "checked", trade.marketOrLimit1);
	inputTextStopLoss.value = trade.stopLoss;
	inputTextTakeProfit.value = trade.takeProfit; 
	inputTextClosePrice.value = trade.closePrice; 
	formTrade("inputRadioMarketOrLimit2", "checked", trade.marketOrLimit2);
	formTrade("inputTextOrderType", "checked", trade.orderType);
	inputTextComment.value 		= trade.comment || "";
	divCalcR.innerHTML 			= trade.calcR === "" ? "" : myFormatNumber(trade.calcR);
	divCalcR2.innerHTML 		= trade.calcR2 === "" ? "" : myFormatNumber(trade.calcR2); 
	divCalcRF.innerHTML 		= trade.calcRF === "" ? "" : myFormatNumber(trade.calcRF);
	divCalcRisk.innerHTML 		= trade.calcRisk === "" ? "" : myFormatNumber(trade.calcRisk);
	divCalcRrr.innerHTML 		= trade.calcRrr;
	divCalcReturn.innerHTML		= trade.calcReturn === "" ? "" : myFormatNumber(trade.calcReturn) + "%";
	smallTextDates.innerHTML 	= "Created: " + timeConverter(trade.createdAt) + " - Updated: " + timeConverter(trade.updatedAt);

	calculateR 		= trade.calcR === "" ? "" : parseFloat(trade.calcR);
	calculateR2		= trade.calcR2 === "" ? "" : parseFloat(trade.calcR2);
	calculateRF 	= trade.calcRF === "" ? "" : parseFloat(trade.calcRF);
	calculateRisk 	= trade.calcRisk === "" ? "" : parseFloat(trade.calcRisk);

	sectionForm.classList.remove("d-none");
	inputTextPer.focus();
}

const formTradeCalcReset = function() {
	divCalcR.innerHTML 		= "";
	divCalcR2.innerHTML 	= ""; 
	divCalcRF.innerHTML 	= "";
	divCalcRisk.innerHTML 	= "";
	divCalcRrr.innerHTML 	= "";
	divCalcReturn.innerHTML	= "";
}

let tradeSave = function() {
	let tradeID			= inputHiddenID.value;
	let tradePosition 	= formTrade("inputRadioPosition", "checked").value;
	let trade 			= tradeID === '0' ? (new myTrade(tradePosition)) : appData.get(tradeID);
	trade.position		= tradePosition;
	trade.per 			= inputTextPer.value;
	trade.leverage 		= inputTextLeverage.value;
	trade.entryPrice 	= inputTextEntryPrice.value;
	trade.marketOrLimit1= formTrade("inputRadioMarketOrLimit1", "checked").value;
	trade.stopLoss 		= inputTextStopLoss.value;
	trade.takeProfit 	= inputTextTakeProfit.value;
	trade.closePrice 	= inputTextClosePrice.value;
	trade.marketOrLimit2= formTrade("inputRadioMarketOrLimit2", "checked").value;
	trade.orderType 	= formTrade("inputTextOrderType", "checked").value;
	trade.comment 		= inputTextComment.value;
	trade.updatedAt		= appData.generator.time();
	trade.status		= trade.closePrice !== "" ? "close" : trade.status;
	trade.calcR			= calcR(trade);
	trade.calcR2		= calcR2(trade, trade.calcR);
	trade.calcRF		= calcRF(trade);
	trade.calcRisk		= calcRisk(trade);
	trade.calcRrr		= calcRrr(trade.calcRisk, trade.calcRF);
	trade.calcReturn	= calcReturn(trade, trade.calcR2);

	appData.save(trade);

	form.reset();
	formTradeCalcReset();
	smallTextDates.innerHTML = "&nbsp;";
	renderTableTradeList();	
}

let tradeDelete = function(id) {
	appData.remove(id);
	renderTableTradeList();
}

let reloadCalcFor = function(controlName) {

	// no change order of call function reload.
	if(controlName === "entryPrice") {
		reloadCalcRisk();
		reloadCalcRF();
		reloadCalcR();
		reloadCalcR2();
		reloadCalcRrr();
		reloadCalcReturn();
	}
	if(controlName === "stopLoss") {
		reloadCalcRisk();
		reloadCalcRrr();
	}
	if(controlName === "takeProfit") {
		reloadCalcRF();
		reloadCalcRrr();
	}
	if(controlName === "closePrice" || controlName === "leverage" || controlName === "marketOrLimit") {
		if(controlName !== "marketOrLimit") reloadCalcR();
		reloadCalcR2();
		reloadCalcReturn();
	}
};

let reloadCalcR = function() {
	let positionValue 		= inputRadioPositionShort.checked ? inputRadioPositionShort.value : inputRadioPositionLong.value;
	let tradeForCalcR 		= {
		entryPrice: inputTextEntryPrice.value, 
		closePrice: inputTextClosePrice.value, 
		leverage: inputTextLeverage.value, 
		position: positionValue
	};
	calculateR  			= calcR(tradeForCalcR);
	divCalcR.innerHTML 		= calculateR;
};

let reloadCalcR2 = function() {
	let marketOrLimit1Value	= inputRadioMarket1.checked ? inputRadioMarket1.value : inputRadioLimit1.value;
	let trade = {
		leverage: inputTextLeverage.value, 
		entryPrice: inputTextEntryPrice.value, 
		closePrice: inputTextClosePrice.value, 
		marketOrLimit1: marketOrLimit1Value
	};
	calculateR2 = calcR2(trade, calculateR);
	divCalcR2.innerHTML	= calculateR2;
};

let reloadCalcReturn = function() {
	let marketOrLimit1Value	= inputRadioMarket1.checked ? inputRadioMarket1.value : inputRadioLimit1.value;
	let trade	= {
		leverage: inputTextLeverage.value, 
		entryPrice: inputTextEntryPrice.value, 
		closePrice: inputTextClosePrice.value, 
		marketOrLimit1: marketOrLimit1Value
	};
	divCalcReturn.innerHTML	= calcReturn(trade, calculateR2);
}

let reloadCalcRF = function() {
	let trade 				= {
		takeProfit: inputTextTakeProfit.value, 
		entryPrice: inputTextEntryPrice.value
	};
	calculateRF 			= calcRF(trade);
	divCalcRF.innerHTML 	= calculateRF;
};

let reloadCalcRisk = function() {
	let trade 				= {
		entryPrice: inputTextEntryPrice.value, 
		stopLoss: inputTextStopLoss.value
	};
	calculateRisk 			= calcRisk(trade);
	divCalcRisk.innerHTML 	= calculateRisk;
};

let reloadCalcRrr = function() {
	divCalcRrr.innerHTML = calcRrr(calculateRisk, calculateRF);
};

//
// functions trade calculations
//
const calcR = function(trade) {
	if(trade.closePrice === "") return "";
	const isPositionLong= trade.position === "long";
	const closePrice    = parseFloat(trade.closePrice);
	const entryPrice   	= parseFloat(trade.entryPrice);
	const leverage    	= parseFloat(trade.leverage);
	const divPriceIn    = (entryPrice === 0 || entryPrice === "") === 0 ? 1 : entryPrice;
	const divPriceClose = (closePrice === 0 || closePrice === "") ? 1 : closePrice;
	if(isPositionLong)
		return (((closePrice - entryPrice) / divPriceIn) * leverage) * 100;
	return (((entryPrice - closePrice) / divPriceClose) * leverage) * 100;
}

const calcR2 = function(trade, calcRValue) {
	if(calcRValue === "") return "";
	const isMlMarket    = trade.marketOrLimit1 === "market";
	const isEqualPrice  = trade.entryPrice === trade.closePrice
	const leverage   	= parseInt(trade.leverage);

	if(isMlMarket) {
		if(isEqualPrice) {
			return -(-0.225 * leverage);
		}
		return -((calcRValue/100) * (0.225 * leverage) - calcRValue);
	}

	if(isEqualPrice) {
		return 0.025;
	}
	return (calcRValue/100 * (0.025 * leverage)) + calcRValue;
}

const calcRF = function(trade) {
	if(trade.takeProfit === "" || trade.entryPrice === "") return "";
	let takeProfit = parseFloat(trade.takeProfit);
	let entryPrice = parseFloat(trade.entryPrice);
	if(takeProfit > 0 && entryPrice > 0) {
		return (takeProfit - entryPrice);
	}
	return "";
}

const calcRisk = function(trade) {
	if(trade.entryPrice === "" || trade.stopLoss === "") return "";
	let priceIn = parseFloat(trade.entryPrice);
	let stopLoss = parseFloat(trade.stopLoss);

	if(priceIn > 0 && stopLoss > 0) {
		return (priceIn - stopLoss)
	}
	return "";
}

const calcRrr = function(calcRiskValue, calcRFValue) {
	calcRiskValue = parseFloat(calcRiskValue)
	calcRFValue   = parseFloat(calcRFValue)
	if(calcRiskValue !== 0 && calcRFValue !== 0) {
		let calcRRRF = calcRiskValue/calcRFValue;
		if(calcRiskValue < 0) {
			calcRRRF = -(calcRiskValue)/calcRFValue;
		}
		calcRRRF = numberToFraction(calcRRRF);
		return calcRRRF.toString().split("/").join(":");
	}
	return "Review";
}

const calcReturn = function (trade, calcR2Value) {
	
	if(calcR2Value === "") return "";
	if(trade.entryPrice === "") return "";
	if(trade.closePrice === "") return "";
	if(trade.leverage === "") return "";

	const isLmMarket    = trade.marketOrLimit1 === 'market';
	const isEqualPrice  = trade.entryPrice === trade.closePrice;
	const xValue        = trade.leverage;

	if(isLmMarket) {
	  if(isEqualPrice) {
		return -(-(-0.225 * xValue) + calcR2Value); // -0.225 * (xValue + calcR2Value)
	  } 
	  return -((calcR2Value/100) * (0.225 * xValue) - calcR2Value);
	}

	if(isEqualPrice) {
		return (0.025 * xValue) + calcR2Value;
	}

	return ((calcR2Value/100) * (0.025 * xValue)) + calcR2Value;
}

//
// functions section admin
//
function exportData() {
	let exportLocalStorage = {};
	for(let id in appData.items) {
 		exportLocalStorage[appData.storageKey.main + id] = JSON.stringify(appData.items[id]); 
	} 
	let dataStorage 	= JSON.stringify(exportLocalStorage , null, 4);
	let blobData		= new Blob([dataStorage], {type: "octet/stream"});
	let fileName 		= 'CRPTNTSMT_data_' + ((new Date).getTime()) + '.json';
	let href 			=  window.URL.createObjectURL(blobData);

	exportDataLink.setAttribute('href', href);
	exportDataLink.setAttribute('download', fileName );
	exportDataLink.click();
}

function importData(target) {
	let dataFile = target.files[0];
	let reader = new FileReader();
	reader.onload = function(event) {
		let dataImport = JSON.parse(event.target.result);
		for(data in dataImport) {
			appData.save({key: data, value: dataImport[data]})
		}
		document.location = "#section/trade-list";
		document.location.reload();	
	};
	reader.readAsText(dataFile);
}

let setTheme = function(themeValue) {
	appData.admin("theme", themeValue);
}

function removeData(action) {
	if(action === "confirm") {
		btnRemoveDataConfirm.classList.add("disabled");
		btnRemoveDataCancel.classList.remove("d-none");
		btnRemoveDataYes.classList.remove("d-none");
	}
	else if(action === "cancel") {
		btnRemoveDataConfirm.classList.remove("disabled");
		btnRemoveDataCancel.classList.add("d-none");
		btnRemoveDataYes.classList.add("d-none");
	} else {
		for(id in appData.items) {
			appData.remove(id);
		}
		btnRemoveDataConfirm.classList.remove("disabled");
		btnRemoveDataCancel.classList.add("d-none");
		btnRemoveDataYes.classList.add("d-none");
		document.location = "#section/trade-list";
		document.location.reload();	
	}
}

//
// functions commons
//
let getTheme = function() {
	return appData.admin("theme");
}

let loadDarkTheme = function() {
	document.body.classList.add("bg-dark");

	navbar.classList.remove("bg-white");
	navbar.classList.remove("shadow-sm");
	navbar.classList.add("border-bottom");
	navbar.classList.add("border-primary");

	let isVisibleForm = !sectionForm.classList.toString().includes("d-none");
	let isVisibleAdmin= !sectionAdmin.classList.toString().includes("d-none");

	if(isVisibleForm || isVisibleAdmin) {
		navbar.classList.remove("bg-dark");
		navbar.classList.add("bg-primary");
		navbar.classList.add("bg-opacity-10");
	} else {
		navbar.classList.remove("bg-primary");
		navbar.classList.remove("bg-opacity-10");
		navbar.classList.add("bg-dark");
	}

	headerSubTitle.classList.remove("text-body-tertiary");
	headerSubTitle.classList.add("text-primary");

	document.getElementById("cardAdmin").classList.add("bg-dark");
	document.getElementById("cardFormTrade").classList.add("bg-dark");

	document.querySelectorAll("label").forEach(function(i) {
		if(!i.classList.toString().includes("btn")) {
			i.classList.add("bg-dark");
			i.classList.add("bg-opacity-10");
			i.classList.add("text-primary");
		}
	});

	document.querySelectorAll("table").forEach(function(t) {
		if(!t.className.includes("no-change-class"))
			t.classList.add("table-dark");
	});

	document.querySelectorAll(".tradeListEmptyMessage").forEach(function(i) {
		i.classList.remove("text-body-tertiary");
		i.classList.add("border-top");
	});


	btnSearch.classList.remove("border-0");

	let badgeList = document.querySelectorAll(".badge");
	for(let i = 0; i < badgeList.length; i++) {
		badgeList[i].classList.remove("bg-white");
		badgeList[i].classList.remove("bg-light");
		// badgeList[i].classList.add("text-white");
		// badgeList[i].classList.add("bg-dark");
		// badgeList[i].classList.add("bg-opacity-10");
	}

	document.querySelectorAll("td").forEach(function(td){ 
		td.classList.add("border-primary");
		td.classList.add("text-primary");
	});

	document.getElementById("containerTradeList").classList.remove("bg-body-tertiary");
	document.getElementById("containerTradeList").classList.add("bg-dark");

	document.querySelectorAll("input").forEach(function(i) {
		if(i.type === "text" || i.type === "number") {
			i.classList.add("bg-dark");
			i.classList.add("bg-opacity-10");
			i.classList.add("border-primary");
		}
	});

	inputSearch.classList.add("text-primary");
	footer.classList.add("bg-dark");

	// document.querySelectorAll("*").forEach(function(i){
		// i.className = i.className.split("primary").join("secondary");
	// });

};

let loadSection = function() {
	let locationHash 	= document.location.hash.split("-").join("_");
	let sectionDefault	= "trade_list";
	let selectedSection = (locationHash === '') ? sectionDefault : locationHash.split("#section/").join("");
	
	appData.load();

	if(selectedSection === sectionDefault) {
		renderTableTradeList();
	} else {
		setClickButtons();
	}

	let tradeID 		= 0;
	let sectionList 	= document.querySelectorAll("section");
	footer.classList.add('d-none');
	
	for(let i = 0; i < sectionList.length; i++) {
    	sectionList[i].classList.add("d-none");
	}

	let id = selectedSection.substr(1); 	
	if(!isNaN(parseInt(id))) {
		tradeID = parseInt(id);
		selectedSection = "trade_form";
		renderFormTrade(tradeID);
	}

	document.getElementById(selectedSection).classList.remove('d-none');
	footer.classList.remove('d-none');

	if(getTheme() === "dark") loadDarkTheme();
};

let setClickButtons = function() {
	const buttons = document.querySelectorAll('a, button');
	buttons.forEach(button => {
		button.addEventListener('click', clickButton);
	});
};

let clickButton = event => {

	let exclude	= [
		"btnRemoveDataConfirm", 
		"btnRemoveDataYes", 
		"btnRemoveDataCancel", 
		"exportDataLink", 
		"btnExportData", 
		"btnSearch", 
	];

	if(!exclude.some(function(btnID) { return btnID === event.target.id})) {

		event.preventDefault();
		
		if(event.target.nodeName === "BUTTON") {
			document.location = event.target.value;
		} else {
			let url = new URL(event.target.href);
			document.location = url.hash;
		}

		// if(event.target.classList.contains("btnTradeDelete")) { } else {
			//document.location.reload();
		// }
		
		loadSection();

		return this.removeEventListener('click', clickButton, false);
	}
}

let __________log = function(obj) {
	let storagekeyLog = "__________log";
	if(obj === undefined) {
		console.log(storagekeyLog);
	} else {
		let storageLogValue = appData.get(storagekeyLog);
		let storageValLog 	= storageLogValue === null ? [] : JSON.parse(storageLogValue);
		storageValLog.push(obj);
		localStorage.setItem(storagekeyLog, JSON.stringify(storageValLog));
	}
}

let myFormatNumber = function (value, add) {
	if(value === "") return "";
	value = parseFloat(value).toFixed(4).toString();
	return value + "" + (add === undefined ? "" : add);
}

let appData = {
	storageKey : {
		main: "MT_",
		admin: "MTADMIN",
	},
	generator: {
		id: function() {
			let createdUniqTime = null;
			do { createdUniqTime = (new Date()).getTime(); 
			} while(tradesID.hasOwnProperty(createdUniqTime))
			return createdUniqTime;
		},
		time: function() {
			return (new Date()).getTime();
		}	
	},
	save: function(obj) {
		if(obj.id === undefined) {
			localStorage.setItem(obj.key, obj.value);
		} else {
			let id 	= obj.id;
			this.items[id] = obj;
			obj = JSON.stringify(obj);
			localStorage.setItem(this.storageKey.main + id, obj);
			inputHiddenID.value = id;
		}
	},
	get: function(id) {
		if(!isNaN(parseInt(id))) {
			return JSON.parse(localStorage.getItem(this.storageKey.main + id));
		}  
		if(id !== this.storageKey.main) return localStorage.getItem(id);
		if(this.items === undefined) this.load();
		let obj = this.items[id];
		inputHiddenID.value = id;
		return obj;
	},
	load: function() {
		if(!this.items) {
			this.items = [];
			for(id in localStorage) {
				if(id.substr(0,3) === this.storageKey.main) {
					let item = JSON.parse(localStorage[id]);
					this.items[item.id] = item;
				}
			}
		}
	},
	remove: function(id) {
		delete this.items[id];
		localStorage.removeItem(this.storageKey.main + id);
	},
	admin: function(key, value) {
		let adminSetting = JSON.parse(localStorage.getItem(this.storageKey.admin));
		if(adminSetting === null) {
			adminSetting = {};
			adminSetting[key] = value;
		}
		if(value === undefined) {
			return adminSetting[key];
		} else {
			adminSetting[key] = value;
			localStorage.setItem(this.storageKey.admin, JSON.stringify(adminSetting));
		}
	}
};

// Ref. Code: https://stackoverflow.com/q/56587303
const numberToFraction = function( amount ) {
    // This is a whole number and doesn't need modification.
    if ( parseFloat( amount ) === parseInt( amount ) ) {
        return amount;
    }
    // Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
    var gcd = function(a, b) {
        if (b < 0.0000001) {
            return a;
        }
        return gcd(b, Math.floor(a % b));
    };
    var len = amount.toString().length - 2;
    var denominator = Math.pow(10, len);
    var numerator = amount * denominator;
    var divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;
    var base = 0;
    // In a scenario like 3/2, convert to 1 1/2
    // by pulling out the base number and reducing the numerator.
    if ( numerator > denominator ) {
        base = Math.floor( numerator / denominator );
        numerator -= base * denominator;
    }
    amount = Math.floor(numerator) + '/' + Math.floor(denominator);
    if ( base ) {
        amount = base + ' ' + amount;
    }
    return amount;
}

// Ref Code: https://web.dev/storage-for-the-web/
const storageSize = async function() {
	if (navigator.storage && navigator.storage.estimate) {
		const quota = await navigator.storage.estimate();
		// quota.usage -> Number of bytes used.
		// quota.quota -> Maximum number of bytes available.
		const percentageUsed = (quota.usage / quota.quota) * 100;
		console.log(`You've used ${percentageUsed}% of the available storage.`);
		const remaining = quota.quota - quota.usage;
		console.log(`You can write up to ${remaining} more bytes.`);
	}
}

// Ref Code: https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
const storageAvailable = function(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

// Ref code: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/6078873#6078873
function timeConverter(UNIX_timestamp){
	if(UNIX_timestamp) {
		var a = new Date(UNIX_timestamp);
		console.log(a);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = (a.getHours() < 10 ? "0" : "") + a.getHours();
		var min = (a.getMinutes() < 10 ? "0" : "") + a.getMinutes();
		var sec = (a.getSeconds() < 10 ? "0" : "") + a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		return time;
	}
	return "-";
}

// Ref code: https://es.stackoverflow.com/a/148870
function timeElapsed(UNIX_timestamp) {
	var nacimiento = new Date(UNIX_timestamp)
	var hoy = new Date()

	var tiempoPasado= hoy - nacimiento
	var segs = 1000;
	var mins = segs * 60;
	var hours = mins * 60;
	var days = hours * 24;
	var months = days * 30.416666666666668;
	var years = months * 12;

	//calculo 
	var anos = Math.floor(tiempoPasado / years);

	tiempoPasado = tiempoPasado - (anos * years);
	var meses = Math.floor(tiempoPasado / months)

	tiempoPasado = tiempoPasado - (meses * months);
	var dias = Math.floor(tiempoPasado / days)

	tiempoPasado = tiempoPasado - (dias * days);
	var horas = Math.floor(tiempoPasado / hours)

	tiempoPasado = tiempoPasado - (horas * hours);
	var minutos = Math.floor(tiempoPasado / mins)

	tiempoPasado = tiempoPasado - (minutos * mins);
	var segundos = Math.floor(tiempoPasado / segs)

	let message = "";
	if(anos !== 0) message += anos + "yr ";
	if(meses !== 0) message += meses + "mth ";
	if(dias !== 0) message += dias + ( dias === 1 ? "dy " : "dys ");
	if(horas !== 0) message += horas + "hr ";
	if(minutos !== 0) message += minutos + "mn";

	return (message === "" ? "now" : message);
}