chrome.runtime.onInstalled.addListener(function (obj){
	var reason = obj.reason;
	if(reason == "install"){
		setOnInstall();
		// _gaq.push(['_trackEvent', 'extensions', 'install']);
	}else if(reason == "update"){
		setOnUpdate();
	}
});



getItem('opt', function(obj){
	var opt = obj.opt;
	console.log(opt)

	if(opt.show_context_btn === undefined || opt.show_context_btn == true) {
		// add button to context menu
		chrome.contextMenus.create({
			id: "contextMenuBtn",
			contexts: ["page",  "link"],
			title: chrome.i18n.getMessage("add_bookmark_context")
		});

		// add event listener for button
		chrome.contextMenus.onClicked.addListener((info, tab) => {
			if(info.pageUrl.indexOf('chrome-extension') != -1) return false;
			if(info.linkUrl) {
				var url = info.linkUrl;
				var saved_url = encodeURIComponent(url);
				chrome.tabs.create({url: '/pages/newtab.html?add_url='+saved_url, active: true});
			} else if(info.pageUrl) {
				var url = info.pageUrl;
				var title = tab.title;
				var saved_url = encodeURIComponent(url);
				chrome.tabs.create({url: '/pages/newtab.html?add_url='+saved_url+'&title='+title, active: true});
			}
		})
	}
})


// downloadItem = chrome.contextMenus.create({
// 	id: "utilsExtDownloadMenuItem",
// 	// parentId: rootItem,
// 	title: chrome.i18n.getMessage("add_bookmark_context"),
// 	contexts: ["page",  "link"],
// 	onclick: addNewBookmark
// }, function(){
// });
// function addNewBookmark(info, tab) {
// 	if(info.pageUrl.indexOf('chrome-extension') != -1) return false;

// 	if(info.linkUrl) {
// 		var url = info.linkUrl;
// 		var saved_url = encodeURIComponent(url);
// 		chrome.tabs.create({url: '/pages/newtab.html?add_url='+saved_url, active: true});
// 	} else if(info.pageUrl) {
// 		var url = info.pageUrl;
// 		var title = tab.title;
// 		var saved_url = encodeURIComponent(url);
// 		chrome.tabs.create({url: '/pages/newtab.html?add_url='+saved_url+'&title='+title, active: true});
// 	}
// }


const fixBrokenLinks = (links) => {
	const fixLinks = [{
		broken: "https://alitems.com/g/1e8d11449421a60bd21c16525dc3e8/",
		fixed: "https://aliexpress.ru/#no_ads"
	}, {
		broken: "https://ad.admitad.com/g/tekzyq4q2i21a60bd21cf7c2d5eccb/",
		fixed: "https://worldoftanks.eu/ru/"
	}, {
		broken: "https://ad.admitad.com/g/40f3crspww21a60bd21c9dc87d04ab/",
		fixed: "https://worldofwarships.eu/ru/"
	}, {
		broken: "https://ad.admitad.com/g/1d9ed345dd21a60bd21cdc28f2033d/",
		fixed: "https://www.wildberries.ru/"
	}];
	
	return links.map(link => {
		const findInBrokens = fixLinks.findIndex(v => v.broken === link.url);
		if(findInBrokens !== -1) {
			link.url = fixLinks[findInBrokens].fixed;
		}
		return link;
	});
}


function setOnUpdate() {
	// localStorage['show_help'] = '1_1_1';

	// getItem('opt', function(obj){
	// 	var opt = obj.opt;
	// 	// console.log(opt);
	// 	if(!opt.search) {opt.search = 'google';}
	// 	if(!opt.col_in_row) {opt.col_in_row = 'col_in_row_4';}
	// 	if(typeof opt.bg_phase === "undefined") {opt.bg_phase = true;}

	// 	if(typeof opt.search_status === "undefined") {opt.search_status = true;}
	// 	if(typeof opt.bg_img_status === "undefined") {opt.bg_img_status = true;}
	// 	if(typeof opt.group_status === "undefined") {opt.group_status = true;}
	// 	if(typeof opt.group_style === "undefined") {opt.group_style = 'i_t';}
	// 	if(typeof opt.group_pos === "undefined") {opt.group_pos = 'top';}
	// 	if(typeof opt.bg_color === "undefined") {opt.bg_color = '#ffffff';}

	// 	// delete opt.search_status;
	// 	// delete opt.bg_img_status;
	// 	setItem('opt', opt);
	// });

	getItem('links', function(obj){
		let links = fixBrokenLinks(obj.links);
		setItem('links', links);
	});
}



function setOnInstall(){
	var lang = chrome.i18n.getMessage('@@ui_locale');
	var opt = {
		'bg': '../img/bg_4.jpg',
		'bg_color': '#ffffff',
		'bg_img_status': true,
		'search': 'yandex',
		'col_in_row': 'col_in_row_5',
		'search_status': true,
		'group_status': true,
		'group_style': 'i_t',
		'group_pos': 'top',
		'bg_phase': true
	};
	setItem('opt', opt);

	var _tabs = [
		{'id': 1, 'name': chrome.i18n.getMessage('loc_18'), 'icon': 'home'},
		{'id': 2, 'name': chrome.i18n.getMessage('loc_19'), 'icon': 'shopping-cart'}
	];
	setItem('categories', _tabs);

	setTimeout(function () {
		setDials(lang, function (links) {
			setItem('links', links, function(){
				chrome.tabs.create({url: '/pages/newtab.html?help'});
			});
		});
	}, 100);
}

function setItem (item, value, callback){
	if(item == 'links'){
		chrome.storage.local.set({ links:value }, callback);
	} else if(item == 'opt') {
		chrome.storage.local.set({ opt:value }, callback);
	} else if(item == 'categories') {
		chrome.storage.local.set({ categories:value }, callback);
	}
}
function getItem (item, callback){
	chrome.storage.local.get(item, callback);
}



if(chrome.i18n.getMessage('@@ui_locale') == 'ru') {
	if(chrome.runtime.setUninstallURL) {
		// const appOpenings = window.localStorage.getItem("opening_newtab_count") || -99;
		// const ab = localStorage['ab_bg'];
		const appOpenings = 99;
		const ab = 99;
		chrome.runtime.setUninstallURL('https://speed-dial.net/uninstall/?count='+appOpenings+'&hl='+chrome.i18n.getMessage('@@ui_locale')+'&ab_bg='+ab);
	}
}




chrome.runtime.onMessage.addListener(function (request, sender, f_callback) {
	if(!request) return false;

	if(request.captureUrl) {
		hiddenCapture(request.captureUrl, function (data) {
			f_callback(data);
		});
	} else if(request=='close_hidden_window') {
		if(hidden_window_id!=0) {
			chrome.windows.remove(hidden_window_id);
			stop = true;
		}
	} else if(request=='open_share_window') {
		// _gaq.push(['_trackEvent', 'extensions', 'open_share_window']);
	}
});




var hidden_window_id = 0,
	stop = false;
function hiddenCapture(link, callback) {
	var windowParam = {
		url: link,
		focused: false,
		left: 1e5,
		top: 1e5,
		width: 100,
		height: 100,
		type: "popup"
	},
	tab;
	stop = false;

	chrome.windows.create(windowParam, function(w) {
		console.log(w)
		if (!w.tabs || !w.tabs.length) {
			chrome.windows.remove(w.id);
			console.error('not found page');
			return false;
		}
		hidden_window_id = w.id;
		tab = w.tabs[0];

		chrome.tabs.update(tab.id, {
			muted: true
		});
		chrome.tabs.executeScript(tab.id, {
			code: 'document.addEventListener("DOMContentLoaded", function(){document.body.style.overflow = "hidden";});',
			runAt: "document_start"
		});

		var closeWindow = setTimeout(function () {
			chrome.windows.remove(w.id);
			callback({error: 'long_load'});
			stop = true;
		}, 12000);

		chrome.windows.update(w.id, {
			width: 1080,
			height: 700,
			top: 1e5,
			left: 1e5
		}, function () {
			checkerStatus();
		});

		function checkerStatus() {
			if(stop==true) {
				clearInterval(closeWindow);
				hidden_window_id = 0;
				return false;
			}

			chrome.tabs.get(tab.id, function(tabInfo) {
				if (tabInfo.status == "complete") {
					setTimeout(function () {
						chrome.tabs.captureVisibleTab(w.id, function(dataUrl) {
							callback({
								capture: dataUrl,
								title: tabInfo.title
							});
							clearInterval(closeWindow);
							chrome.windows.remove(w.id);
							hidden_window_id = 0;
						});
					}, 400)

				} else {
					setTimeout(function () {
						checkerStatus();
					}, 500);
				}
			});
		}
	});
}



async function setDials(lang, callback) {
	if(lang=='ru1') {var file_load = 'install_ru.txt';}
	else {var file_load = 'install_en.txt';}

	try {
		const url = chrome.runtime.getURL(file_load);
		const response = await fetch(url)
		let links = await response.json();
		// for(var i=0; i<links.length; i++) {
	// 		// 	var _that = links[i];
	// 		// 	var link = document.createElement('a');
	// 		// 	link.href = _that.url;
	// 		// 	var hostName = link.hostname;
	// 		// 	var _fileName = hostName.replace(/\./, '_')+'_'+_.rand(1, 99999);

	// 		// 	if(_that.logo) {
	// 		// 		_.save_file_base64(_that.logo, _fileName, i, function (localAdress, j) {
	// 		// 			links[j].logo = localAdress;
	// 		// 		})
	// 		// 	} else if(_that.bgImage) {
	// 		// 		_.save_file_base64(_that.bgImage, _fileName, i, function (localAdress, j) {
	// 		// 			links[j].bgImage = localAdress;
	// 		// 		})
	// 		// 	}
	// 		// }
		callback(links);
	} catch (error) {
		setMinimalizmDials(lang, callback);
	}

	// httpRequest = new XMLHttpRequest();
	// httpRequest.open("GET", file_load, true);
	// httpRequest.onreadystatechange = function () {
	// 	if (httpRequest.readyState == 4 && httpRequest.status == 200) {
	// 		console.log(JSON.parse(httpRequest.responseText));
	// 		try {
	// 			var links = JSON.parse(httpRequest.responseText);
	// 		} catch (e) {
	// 			setMinimalizmDials(lang, callback);
	// 			return false;
	// 		}


	// 		// for(var i=0; i<links.length; i++) {
	// 		// 	var _that = links[i];
	// 		// 	var link = document.createElement('a');
	// 		// 	link.href = _that.url;
	// 		// 	var hostName = link.hostname;
	// 		// 	var _fileName = hostName.replace(/\./, '_')+'_'+_.rand(1, 99999);

	// 		// 	if(_that.logo) {
	// 		// 		_.save_file_base64(_that.logo, _fileName, i, function (localAdress, j) {
	// 		// 			links[j].logo = localAdress;
	// 		// 		})
	// 		// 	} else if(_that.bgImage) {
	// 		// 		_.save_file_base64(_that.bgImage, _fileName, i, function (localAdress, j) {
	// 		// 			links[j].bgImage = localAdress;
	// 		// 		})
	// 		// 	}
	// 		// }

	// 		setTimeout(function () {
	// 			callback(links);
	// 		}, 100);


	// 	} else if (httpRequest.readyState == 4 && httpRequest.status != 200) {
	// 		setMinimalizmDials(lang, callback);
	// 	}
	// };
	// httpRequest.send(null);
}



function setMinimalizmDials(lang, callback) {
	var ru_links = [
		{'id': 1, 'category': 1, 'style': 'minimalizm', 'url': 'http://yandex.ru', 'title': 'yandex.ru', 'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQUlEQVQ4T2NkYGAQBmIZIGYBYmLALaCizzCFjECGwcePH+fz8fEZENL99u3b4yIiIolAdTeRDTD9///fKUKaYfLTpk1Nyc7OXQVzBcgF5v/+/TuBbMCPw8cYXueUMPz/8oXh94NHDMp/P8Clga44JSoqmgAUuA4SBBlg8e/v3+MwFX/fvGV4pGHMILV9HQO7qRHDXWYBFANA6qbPmJGRnZ29HMj8BDLA6u/fP0dhBnxZuY7h0+QZDFJHdoGF7jELMij9fY/iw7dv350VExOLBwpeBRlg8+fP78MwFZ/nLGL4un4zg8TW1WCh+yxCDIp/3mEE0dSp03Ly8/OXgAyw+/3710GYip9nzjO89AljkLl5loGJn4/hAaswg8LvtxgGAF1xQUJCIh5kgMOvXz/3I6t4X9XI8H3TdgZ2awuGL/OXMMj/eoNhwLt3b4EGSCWCDHD69fPHXmQV/798ZXiqZcYg2F7P8CYpm0H+52sMA/onTCwsLy9fCDLA5eeP77uRVXxs7mL4feUag8jKBQyPOMQY5H68QjHg9es3F2RkZVOAgmdBBrj9+P5tJzwanz5jeG5gwyB+YBsDq7YGw2NOcQbZ7y9RDOjq7iyuq2tcABR8BzLA4/v3r9thKj6WNzD8+/iRQXBGP1jomaQ6g9RzeMplePny1TkFBcVMoBQ49YIM8Pz+7cs2DE/iEGhrby9ubm4F2w4zwPnJk8dThQQF1QkZ8vzF83PKyqrZQHXwpA9ygRQQ6wAxGyEDoPKgZA9PGACIXduPx4yfkAAAAABJRU5ErkJggg=='},
		{'id': 2, 'category': 1, 'style': 'minimalizm', 'url': 'http://vk.com', 'title': 'vk.com', 'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA9ElEQVQ4T2OMaVx9mIGRwYaBHPCf4QhjTNPq/+TohekZpAYsrg2B++rHrz8Mn7/9ZNh2/BbDnjN3MXyL1QswA1buvcygJCXEYKopzfD//3+G7L4tYMOQAV4DYpvXMEiJ8DJ0ZrozgFySAzTg5+8/xBvw6v1XBj5udgYONhaGZbsvMWw/cYs0L2w5dpOBnZWZwUZPnoGDnZVh9qbTDIcvPiTeBSAvgECStxGDo5ESw+nrTxkmrTlOvAGgQOQFesEJqBnkjRVA/lagq4gORJDCX7//Mrz99I3hxNXHDBsOXWf4B4wNggaQkrQHQ1KmIDv/Z/h/FADgXYQXJARkIAAAAABJRU5ErkJggg=='},
		{'id': 3, 'category': 1, 'style': 'minimalizm', 'url': 'http://youtube.com', 'title': 'YouTube', 'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABIklEQVQ4T2NkoBAwUqifgToGPFESUWP+zzztPwODMtBF/EDMDsRcaK77BuT/BOKPQHyH+S9Duvijl/fALniuKL4JqNmXJO/8Z1wn9eBFMNiAp4riz4AMSZIMYGC4L3X/pRLYgGeK4t+BFAeyASIbdzJ8W7aI4fvmDQz/v33FZvZ7oAFCMAOAPkAFkvdegAX+f/nM8H3jWoYvs6Yx/H38CFnRP6ABzAQN+H39KsPXGVMYvm/bxMDw9y9OA0AhzIksK7xqI8OXaZMYfh7cB3QGhgNBSt8BXSBMnUAERuNGoB1+pMXC/zVS91+Fgl3wUkVM+e9fxokM/xk0gGlTACjEBsS8aAZ+AvJ/AfEnBsb/N5n+MmZLPHx5nzpJmTSno6qm2AUAsWFuEaYEv3cAAAAASUVORK5CYII='},
		{'id': 4, 'category': 1, 'style': 'minimalizm', 'url': 'https://aliexpress.ru/#no_ads', 'title': 'Aliexpress', 'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB50lEQVQ4T52SQUiTYRjH/8/7bbrp3FIMC/RYp1jo0THIiwgqBEpCh6CTEnQwwaA8apCiHaJQL0KHQOkQaBAe3GF4VepYR8spxdQ53dz2vY/P+21MmxNHD7yX73ve3/P//9+H+B3a4cY4CGEwXKikCDnpjSKLMeJ5rLGNDk4DzJXcBojkeORYiJA9hUzym3KfbBE4VyFAdFa3MHx3dZbifYrTP5WMr+xysUtUeG5pUKzNxcXJtg0ogRmN5cp41BqwLOcviRLaDrrYmCdvLTz3epHZXIe9s3URIj3WjRZUtYWQjiyDU0dOTwGgoZqa0fB+Bcm5CaS/LsqUkgexc/B0DcA3+BLxJz3Qu78EoM4p8AVQP72I7I/vOJx5XtZB3bPXcN8OYm9kAJw8OKfAtLNGzYMh1D4aRuLVU5ysr569q0itDnXC/+Itjj68wfHSrDPdycHJwAFIDnUB+EcmxWcYqS8fnTxMVbWG4O1+iMxGFInpUfBhfvq/gIIKFWiA9/5jeDv7Qf5reXZiH6nVT0h9XoA+iBenXwQUlBi6qm+Eun7TAeg/Mei9v3lLJU98ZqE0NtMsueR1Xr4bFAtaGXHvLhv7FR9l+bMCoDVZkY7/A9gR+n0H7UrROFiFmcxyXl1klp90VGseOwXlNL7/ezgVPgAAAABJRU5ErkJggg=='}
	];

	if(lang) {
		if(lang=='ru') {
			var links = ru_links;
		} else {
			var links = [
				{'id': 1, 'category': 1, 'style': 'minimalizm', 'url': 'https://www.google.com', 'title': 'google.com', 'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZ0lEQVQ4T4WTXUgUURTH/3dmd9bJaIMSKSoTdIOidlUwUonKHnQLCiQWiwJ7yCKwxR4iCiLMIB9K2FpXoYceeossgrAPzTZ8KDAlDLM0PyJCJWyl2nV2Pjp3ctdxW2zgMtx7/+d3Pu45DCmfYRiFuq7X0vEeWjnz12P07xIEIcQY67easMSGDJeRYYBEx1Oh1j1p2kjjJ1CUn5sAbqxp2hNRFMsMRUHs0T3EOjugjY/C0HTYcjbCUV4B+aAPTJJA2jBpKzjEBNDBbe5Zn55E5Lwf6thI2iCkou1wXguYdxRJK0FOMp4z7Xu555lTR02v3ItcdRhScQkgCFBe92Du5XM4G29AXLfBCi9g5L2VvJ9Q+wOINNyF/pNh5fUQ7Fvci6PQdROWUo8WDvhEgDztTTG0yffQZmsgH7m5VB2Td5TGEAcoBLCrL5ZTYgpEz0OwVZVJUfnVX//AduSLuHIog9dBWQB0ZdJzxCG6H4Ct9i4JKMoV0VS9APhIEeTP9myFGvuKV1kXcWBbfdoUGtrn0D2oYp/Hhnqvg0fwgUcQIkDt28EmXBgI4wcyEdx1CQVZmxdBhr7pqLsThUq1vFyVgbJNIgfc4s/oIWWfosVx7Nk5jEQmIAl2+FxelK4phMAE9E4NoL1vBtEvPriyJbTUyGB/e9idaCTzKad+f8eZcCOGCZLuy3OUonm3H9lOxr0HqZFOJ1pZplQ66GCnosdxf/gpHo+HzWhg0EStWIu960tQ7doP2ebgrd9NbVxJK2YdJpmozTyS/wxTkDRnuXFymKwGvCYE4hA+zrnzd5/p30mGbWT4zqr/A/G1Fw0VdmNfAAAAAElFTkSuQmCC'},
				{'id': 2, 'category': 1, 'style': 'minimalizm', 'url': 'http://facebook.com', 'title': 'facebook.com', 'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA80lEQVQ4T2NkoBAwgvSb+TYcZmFksiHFrD///x05tbnBFmyAS+zs/yysHKToZ/jz+wfDnsWpjGADPJIW/8elm4+bnaEg0YLBRFeK4eu33wwv33xhKGjdAVa+Y14sYQPK06wZHMwVUcz3TF5CvAFrp4QxcHGyMRTUL2U4feEeWCOfCMRAolywfW4MWLFr3GwGFlZOFJfgNQCmET1snrz4xJBavYmwC3AZsHT9CYYlW+4QNuDTm/tgRUc31oJpa/9mMM3GJcDAwSVI2ACY02EugYU8spdICsRBboBr/ILDzMzMWDMTzjD4x3B0x4JYG3BeoAQAAJVjdxG7Rxs6AAAAAElFTkSuQmCC'},
				{'id': 3, 'category': 1, 'style': 'minimalizm', 'url': 'http://youtube.com', 'title': 'YouTube', 'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABIklEQVQ4T2NkoBAwUqifgToGPFESUWP+zzztPwODMtBF/EDMDsRcaK77BuT/BOKPQHyH+S9Duvijl/fALniuKL4JqNmXJO/8Z1wn9eBFMNiAp4riz4AMSZIMYGC4L3X/pRLYgGeK4t+BFAeyASIbdzJ8W7aI4fvmDQz/v33FZvZ7oAFCMAOAPkAFkvdegAX+f/nM8H3jWoYvs6Yx/H38CFnRP6ABzAQN+H39KsPXGVMYvm/bxMDw9y9OA0AhzIksK7xqI8OXaZMYfh7cB3QGhgNBSt8BXSBMnUAERuNGoB1+pMXC/zVS91+Fgl3wUkVM+e9fxokM/xk0gGlTACjEBsS8aAZ+AvJ/AfEnBsb/N5n+MmZLPHx5nzpJmTSno6qm2AUAsWFuEaYEv3cAAAAASUVORK5CYII='},
				{'id': 4, 'category': 1, 'style': 'minimalizm', 'url': 'https://aliexpress.ru/#no_ads', 'title': 'Aliexpress', 'favicon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB50lEQVQ4T52SQUiTYRjH/8/7bbrp3FIMC/RYp1jo0THIiwgqBEpCh6CTEnQwwaA8apCiHaJQL0KHQOkQaBAe3GF4VepYR8spxdQ53dz2vY/P+21MmxNHD7yX73ve3/P//9+H+B3a4cY4CGEwXKikCDnpjSKLMeJ5rLGNDk4DzJXcBojkeORYiJA9hUzym3KfbBE4VyFAdFa3MHx3dZbifYrTP5WMr+xysUtUeG5pUKzNxcXJtg0ogRmN5cp41BqwLOcviRLaDrrYmCdvLTz3epHZXIe9s3URIj3WjRZUtYWQjiyDU0dOTwGgoZqa0fB+Bcm5CaS/LsqUkgexc/B0DcA3+BLxJz3Qu78EoM4p8AVQP72I7I/vOJx5XtZB3bPXcN8OYm9kAJw8OKfAtLNGzYMh1D4aRuLVU5ysr569q0itDnXC/+Itjj68wfHSrDPdycHJwAFIDnUB+EcmxWcYqS8fnTxMVbWG4O1+iMxGFInpUfBhfvq/gIIKFWiA9/5jeDv7Qf5reXZiH6nVT0h9XoA+iBenXwQUlBi6qm+Eun7TAeg/Mei9v3lLJU98ZqE0NtMsueR1Xr4bFAtaGXHvLhv7FR9l+bMCoDVZkY7/A9gR+n0H7UrROFiFmcxyXl1klp90VGseOwXlNL7/ezgVPgAAAABJRU5ErkJggg=='}
			];
		}
	} else {
		var links = ru_links;
	}

	setTimeout(function () {
		callback(links);
	}, 100);
}





function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 1024;
  var byteCharacters = atob(base64Data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
	var begin = sliceIndex * sliceSize;
	var end = Math.min(begin + sliceSize, bytesLength);

	var bytes = new Array(end - begin);
	for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
	  bytes[i] = byteCharacters[offset].charCodeAt(0);
	}
	byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}
function errorHandler(e) {console.log('Error: ' + e);}


// var directory = {};
// window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
// window.requestFileSystem(
// 	window.PERSISTENT, 200*1024*1024, // 200MB
// 	function(filesystem) {
// 		directory.fs = filesystem;
// 	},
// 	errorHandler
// );


// var _ = {
// 	save_file_base64: function (fileurl, name, j, callback) {
// 		var that = base64toBlob(fileurl.replace(/.+,/, ''));
// 		var format = 'png';
// 		var blob = new Blob([that], {type: 'blobtype'});
// 		directory.fs.root.getFile(name+'.'+format, {create: true}, function(fileEntry) {
// 			fileEntry.createWriter(function(writer) {
// 				writer.onwrite = function(e) {
// 					var url = fileEntry.toURL();
// 					callback(url, j);
// 				};
// 				writer.onerror = function(e) {console.log("error"); console.log(e);};
// 				var blob = new Blob([that], {type: 'blobtype'});
// 				writer.write(blob);
// 			}, errorHandler);
// 		}, errorHandler);
// 	},
// 	rand: function (min, max) {
// 		min = min || 1;
// 		max = max || 100;
// 		return Math.floor(Math.random() * (max - min + 1)) + min;
// 	}
// }
