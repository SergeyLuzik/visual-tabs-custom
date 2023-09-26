var default_images = [
	{full_link: 'https://cdn.speed-dial.net/images/default/1.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/1.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/2.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/2.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/3.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/3.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/4.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/4.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/5.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/5.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/6.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/6.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/7.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/7.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/8.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/8.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/9.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/9.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/10.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/10.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/11.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/11.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/12.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/12.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/13.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/13.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/14.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/14.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/15.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/15.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/16.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/16.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/17.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/17.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/18.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/18.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/19.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/19.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/20.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/20.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/21.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/21.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/22.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/22.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/23.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/23.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/24.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/24.jpg'},
	{full_link: 'https://cdn.speed-dial.net/images/default/25.jpg', thumbs: 'https://cdn.speed-dial.net/images/default/small/25.jpg'}
];
var user_img = '',
	bg_mini = '',
	load_setting = {};

function getItem (item, callback){
	chrome.storage.local.get(item, callback);
}
function setItem (item, value, callback){
	if(item == 'links'){
		chrome.storage.local.set({ links:value }, callback);
	} else if(item == 'opt'){
		chrome.storage.local.set({ opt:value }, callback);
	} else if(item == 'categories'){
		chrome.storage.local.set({ categories:value }, callback);
	}
}




function saveOptions(action) {
	$('#loading').show();

	if(action == 'save') {
		var opt = {},
			test = true;

		opt.search = $('#search_c').val();
		opt.col_in_row = $('#col_in_row').val();
		opt.bg_phase = $('#bg_phase').is(':checked');

		opt.search_status = $('#search_status').is(':checked');
		opt.bg_img_status = $('#bg_img_status').is(':checked');
		opt.group_status = $('#group_status').is(':checked');
		opt.show_plus_btn = $('#show_plus_btn').is(':checked');
		opt.show_context_btn = $('#show_context_btn').is(':checked');
		opt.group_style = $('#group_style').val();
		opt.group_pos = $('#group_pos').val();
		opt.bg_color = $('#bg_color').val();


		if($('.img_col span.active').is('span')) {
			test = false;
			var img_url = $('.img_col span.active').data('url');
			getBase64(null, img_url, function (err, dataUrl, bg_mini) {
				opt.bg = dataUrl;
				opt.bg_mini = bg_mini;
				saveOpts(opt);
			});
		}
		else if(user_img!='') {
			opt.bg = user_img;
			opt.bg_mini = bg_mini;
		}
		else if($('#opt_bg').val()!='') {
			test = false;
			var img_url = $('#opt_bg').val();
			getBase64(null, img_url, function (err, dataUrl, bg_mini) {
				console.log(dataUrl);
				opt.bg = dataUrl;
				opt.bg_mini = bg_mini;
				saveOpts(opt);
			});
		} else {
			opt.bg = load_setting.bg;
			opt.bg_mini = load_setting.bg_mini;
		}

		if(test) {saveOpts(opt);}

	} else if(action=='reset') {
		var opt = {
			bg: '../img/bg_4.jpg',
			bg_color: '#ffffff',
			bg_img_status: true,
			search: 'yandex',
			col_in_row: 'col_in_row_5',
			search_status: true,
			group_status: true,
			show_plus_btn: true,
			show_context_btn: true,
			group_style: 'i_t',
			group_pos: 'top',
			bg_phase: true
		};
		saveOpts(opt);
	}
}

function saveOpts(opt) {
	load_setting = opt;
	setItem('opt', opt);
	$('#loading').hide();
	$('#success').modal('show');
}


function loadSettings() {
	getItem('opt', function(obj){
		var opt = obj.opt;
		if(typeof opt['show_plus_btn'] === "undefined") opt.show_plus_btn = true;
		if(typeof opt['show_context_btn'] === "undefined") opt.show_context_btn = true;

		load_setting = opt;
		$('#col_in_row').val(opt.col_in_row);
		$('#search_c').val(opt.search);
		if(opt.bg_phase) {$('#bg_phase').prop('checked', true);}

		if(opt.search_status) {$('#search_status').prop('checked', true);}
		if(opt.group_status) {$('#group_status').prop('checked', true);}
		if(opt.show_plus_btn) {$('#show_plus_btn').prop('checked', true);}
		if(opt.show_context_btn) {$('#show_context_btn').prop('checked', true);}
		if(opt.bg_img_status) {$('#bg_img_status').prop('checked', true);}
		$('#group_style').val(opt.group_style);
		$('#group_pos').val(opt.group_pos);
		$('#bg_color').val(opt.bg_color);

		bgStatus();
	});

	//reset
	$('.images_colection').html('');
	$('#opt_bg').val('');
	user_img = '';
	bg_mini = '';

	$(default_images).each(function () {
		$('.images_colection').append('<div class="img_col"><span data-url="'+this.full_link+'" style="background-image: url('+this.thumbs+');"></span></div>');
	});
	setTimeout(function () {
		hider_bg_prev = false;
		$('.img_col span').on('click', function () {
			if($(this).is('.active')) {
				$('.img_col span.active').removeClass('active');
				return false;
			}
			var full_link = $(this).data('url');
			$('.img_col span.active').removeClass('active');
			$(this).addClass('active');

			clearTimeout(hider_bg_prev);
			$('#options_page').css('opacity', '.8');
			$('#bg_prev').css('background-image', 'url('+full_link+')').show();
			hider_bg_prev = setTimeout(function() {
				$('#bg_prev').fadeOut(300);
				$('#options_page').removeAttr('style');
			}, 2000);
		});
	}, 100);
}
// hider_bg_prev = setTimeout(function () {}, 0);




$(document).ready(function () {
	ui.i18n();
	loadSettings();

	$('#btn_export').click(exportSpd);
	$('#btn_import').click(function(){
		$('#importFile').click();
	});
	$('#importFile').change(importSpd);
	

	/*var v_notification = localStorage.getItem('notification');
	if(v_notification==null) {
		localStorage.setItem('notification', 1);
	}*/


	$('#options_reset').click(function() {
		saveOptions('reset');
		loadSettings();
	});
	$('#options_save').click(function() {
		saveOptions('save');
	});

	$('#back_to_newtab').on('click', function () {
		chrome.tabs.create({'url': chrome.extension.getURL('pages/newtab.html')}, function () {
			window.close();
		});
	});


	var dropZone = $('#dropzone');
	dropZone[0].ondragover = function(event) {
		event.preventDefault();
		// event.stopPropagation();
		$(this).addClass('hover');
	};

	dropZone[0].ondragleave = function(event) {
		event.preventDefault();
		// event.stopPropagation();
		$(this).removeClass('hover');
	};

	dropZone[0].ondrop = function(event) {
		event.preventDefault();
		// event.stopPropagation();
		$(this).removeClass('hover');

		f = event.dataTransfer.files[0];
		console.log(f);
		var types = ["image/jpeg", "image/gif", "image/png"];

		if(types.indexOf(f.type) >= 0) {
			var reader = new FileReader();
			reader.onload = function(event) {
				var result = event.target.result;
				user_img = result;

				var img = new Image();
				img.src = result;
				img.onload = function () {
					canvas = document.createElement("canvas");
					var new_w = screen.width / 2.5;
					var new_h = img.height * (new_w /img.width);
					canvas.width = new_w;
					canvas.height = new_h;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0, new_w, new_h);
					bg_mini = canvas.toDataURL("image/png");

					$('.normal_text').hide(0);
					$('.success_text').show(0);
				};
			};
			reader.onerror = function(event) {
				$('.normal_text').hide(0).delay(3000).show(0);
				$('.error_text').show(0).delay(3000).hide(0);
			};
			reader.readAsDataURL(f);
		} else {
			$('.normal_text').hide(0).delay(3000).show(0);
			$('.format_error_text').show(0).delay(3000).hide(0);
		}
	};



	$('.soc_btn').click(function () {
		var soc_data = $(this).data('soc');
		var page_link = 'https://chrome.google.com/webstore/detail/speed-dial/ejbjamhkdedinncaeiackcdehpccoejm';
		var urls = {
			g: 'https://plus.google.com/share?url='+encodeURIComponent(page_link),
			f: 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(page_link),
			t: 'https://twitter.com/intent/tweet?url='+encodeURIComponent(page_link),
			r: 'http://www.reddit.com/submit?url='+encodeURIComponent(page_link),
			v: 'https://vk.com/share.php?url='+encodeURIComponent(page_link+'?hl=ru'),
			o: 'https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl='+encodeURIComponent(page_link+'?hl=ru')
		};

		window.open(urls[soc_data], null, 'width=900, height=500, status=no, resizable=no, top=200, left=200');
		chrome.extension.sendRequest('open_share_window');
		return false;
	});


	$('#bg_img_status').change(function (e) { 
		bgStatus();
	});


	hider_bg_prev_2 = false;
	$('#bg_color').colorpicker({
		format: 'hex',
		colorSelectors: ['#d33', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#222'],
		customClass: 'colorpicker-2x',
		sliders: {
		saturation: {
			maxLeft: 150,
			maxTop: 150
		},
		hue: {
			maxTop: 150
		},
		alpha: {
			maxTop: 150
		}
		}
	}).on('changeColor', function(e) {
		var color = e.color.toString('hex');
		$(this).val(color);

		if($('.colorpicker').is('.colorpicker-visible') === false) return false;

		clearTimeout(hider_bg_prev_2);
		$('#options_page').css('opacity', '.8');
		$('#bg_prev').css('background', color).show();
		hider_bg_prev_2 = setTimeout(function() {
			$('#bg_prev').fadeOut(300);
			$('#options_page').removeAttr('style');
		}, 2000);
	});
});



var ui = {
	i18n: function () {
		$('#search_input').attr('placeholder', chrome.i18n.getMessage('search_input'));

		$('[data-i18n]').each(function () {
			$(this).html(lang_data($(this).data('i18n')));
		});
	}
};
function lang_data(s) {return chrome.i18n.getMessage(s);}


function bgStatus() {
	if($('#bg_img_status').prop('checked')) {
		$('#bg_on').show();
		$('#bg_off').hide();
	} else {
		$('#bg_on').hide();
		$('#bg_off').show();
	}
}


function getBase64(img, url, callback) {
	if(!img) {
		var img = new Image();
		img.src = url;
		img.onload = function () {
			canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);
			var bg = canvas.toDataURL("image/gif");

			var new_w = screen.width / 2.5;
			var new_h = img.height * (new_w /img.width);
			canvas.width = new_w;
			canvas.height = new_h;
			ctx.drawImage(img, 0, 0, new_w, new_h);
			var bg_mini = canvas.toDataURL("image/png");


			callback(null, bg, bg_mini);
		};
	}
};




function exportSpd() {
	var dataForImport = {
			categories: [],
			links: [],
			opts: [],
			lStorage: []
		},
		count_1 = 0,
		count_2 = 0;


	var asynKostil = function () {
		if(count_1==count_2) {
			setTimeout(function () {
				importStep2();
			}, 200);
		}
	};



	var importStep2 = function () {
		if(localStorage && localStorage.length>0) {
			dataForImport.lStorage = $.extend(true, {}, localStorage);
			delete dataForImport['lStorage'].imagesArray;
		}
		getItem('opt', function(obj){
			dataForImport.opts = obj.opt;

			getItem('categories', function(obj){
				dataForImport.categories = obj.categories;
				setTimeout(function () {
					var _f = JSON.stringify(dataForImport);
					_.save(_f, 'export.spd', 'text/spd');
					$('#loading').hide();
				}, 100);
			});
			/*setTimeout(function () {
				var _f = JSON.stringify(dataForImport);
				_.save(_f, 'export.spd', 'text/spd');
			}, 100);*/
		});
	};



	getItem('links', function(obj){
		$('#loading').show();

		var recurse = function(arr, i) {
			if(i == arr.length - 1) {
				setTimeout(function () {
					dataForImport.links = arr;
					asynKostil();

					progressBar(0, 0, 'hide');
				}, 10);
				return false;
			}

			progressBar(i+1);

			if(arr[i].logo) {
				_.getBase64(arr[i].logo, i, function (dase64img, j) {
					arr[j].logo = dase64img;
					nextTick(arr, i+1)
				});
			} else if(arr[i].bgImage) {
				_.getBase64(arr[i].bgImage, i, function (dase64img, j) {
					arr[j].bgImage = dase64img;
					nextTick(arr, i+1)
				});
			} else {
				nextTick(arr, i+1)
			}
		}
		
		var nextTick = function(arr, i) {
			setTimeout(function(){
				recurse(arr, i)
			}, 1)
		}

		progressBar(0, obj.links.length, 'show');
		recurse(obj.links, 0)
	});
}


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

function importSpd(event) {
	getFilesList();
	$('#loading').show();
	var file = event.target.files[0];
	if (file) {
		var reader = new FileReader();
		reader.onload = function(e) {
			if(file.name.substr(-3,3) != 'spd'){
				alert(chrome.i18n.getMessage('only_spd'));
				$('#loading').hide();
				return;
			}
			var importJson = null;
			try {
				importJson = JSON.parse(e.target.result);
			} catch (e) {
				alert(chrome.i18n.getMessage('file_damaged'));
				$('#loading').hide();
				return false;
			}
			/*if(importJson.store === undefined || importJson.ls === undefined){
				alert("The file is corrupted");
				return;
			}*/

			localStorage.clear();
			for(var key in importJson['lStorage']) {
				localStorage[key] = importJson.lStorage[key];
			};


			/*if(opt.search_status) {$('#search_status').prop('checked', true);}
			if(opt.group_status) {$('#group_status').prop('checked', true);}
			$('#group_style').val(opt.group_style);
			$('#group_pos').val(opt.group_pos);*/

			if(typeof importJson.opts['search_status'] === "undefined") {importJson.opts['search_status'] = true;}
			if(typeof importJson.opts['group_status'] === "undefined") {importJson.opts['group_status'] = true;}
			if(typeof importJson.opts['show_plus_btn'] === "undefined") {importJson.opts['show_plus_btn'] = true;}
			if(typeof importJson.opts['show_context_btn'] === "undefined") {importJson.opts['show_context_btn'] = true;}

			if(!importJson.opts['group_style']) {importJson.opts['group_style'] = 'i_t';}
			if(!importJson.opts['group_pos']) {importJson.opts['group_pos'] = 'top';}

			if(typeof importJson.opts['bg_img_status'] === "undefined") {importJson.opts['bg_img_status'] = true;}
			if(!importJson.opts['bg_color']) {importJson.opts['bg_color'] = '#ffffff';}
			setItem('opt', importJson.opts);


			if(!importJson.categories) {
				setItem('categories', [{'id': 1, 'name': chrome.i18n.getMessage('loc_18'), 'icon': 'home'}]);
			} else {
				setItem('categories', importJson.categories);
			}


			var recurse = function(arr, i) {
				if(i == arr.length - 1) {
					setTimeout(function () {
						const links = fixBrokenLinks(importJson.links)
						setItem('links', links);
						$('#loading').hide();
						progressBar(0, 0, 'hide');
						setTimeout(loadSettings, 10);
						filesRemove();
					}, 10);
					return false;
				}
				progressBar(i+1);

				var _that = arr[i];
				var link = document.createElement('a');
				link.href = _that.url;
				var hostName = link.hostname;
				var _fileName = hostName.replace(/\./g, '_')+'_'+_.rand(1, 99999);
				if(typeof _that.category === "undefined" || _that.category === 'main') {_that.category = 1;}

				if(_that.logo) {
					_.save_file_base64(_that.logo, _fileName, i, function (localAdress, j) {
						arr[j].logo = localAdress;
						nextTick(arr, i+1)
					})
				} else if(_that.bgImage) {
					_.save_file_base64(_that.bgImage, _fileName, i, function (localAdress, j) {
						arr[j].bgImage = localAdress;
						nextTick(arr, i+1)
					})
				} else {
					nextTick(arr, i+1)
				}
			}
			var nextTick = function(arr, i) {
				setTimeout(function(){
					recurse(arr, i)
				}, 1)
			}

			progressBar(0, importJson['links'].length, 'show');
			recurse(importJson['links'], 0)


			// for(var i=0; i<importJson['links'].length; i++) {
			// 	var _that = importJson.links[i];
			// 	var link = document.createElement('a');
			// 	link.href = _that.url;
			// 	var hostName = link.hostname;
			// 	var _fileName = hostName.replace(/\./g, '_')+'_'+_.rand(1, 99999);
			// 	if(typeof _that.category === "undefined" || _that.category === 'main') {_that.category = 1;}

			// 	if(_that.logo) {
			// 		_.save_file_base64(_that.logo, _fileName, i, function (localAdress, j) {
			// 			importJson.links[j].logo = localAdress;
			// 		})
			// 	} else if(_that.bgImage) {
			// 		_.save_file_base64(_that.bgImage, _fileName, i, function (localAdress, j) {
			// 			importJson.links[j].bgImage = localAdress;
			// 		})
			// 	}



			// 	// console.log(_fileName, importJson.links[i]);
			// 	if(i == importJson['links'].length-1) {
			// 		setTimeout(function () {
			// 			setItem('links', importJson.links);
			// 			$('#loading').hide();
			// 			setTimeout(loadSettings, 10);
			// 			filesRemove();
			// 		}, 100);
			// 	}
			// }
		};
		setTimeout(function () {
			reader.readAsText(file);
		}, 2000);
	} else {
		alert("Failed to load file");
	}
}



var _ = {
	save: function(a, b, c) {
		if (a) {
			b || (b = "console.json"), "object" == typeof a && (a = JSON.stringify(a, void 0, 4)), c = c ? c : "text/plain";
			var d = new Blob([a], {
					type: c
				}),
				e = document.createEvent("MouseEvents"),
				f = document.createElement("a");
			f.download = b, f.href = window.URL.createObjectURL(d), f.dataset.downloadurl = ["text/json", f.download, f.href].join(":"), e.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), f.dispatchEvent(e)
		}
	},

	getBase64: function (link, j, callback, outputFormat) {
		// outputFormat = outputFormat || 'image/png';
		var img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function () {
			var canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(this, 0, 0);
			var _dataURL = canvas.toDataURL(outputFormat);
			callback(_dataURL, j);
		};
		img.onerror = function(){
			callback('file_none', j);
		}
		img.src = link;
	},

	save_file_base64: function (fileurl, name, j, callback) {
		var that = base64toBlob(fileurl.replace(/.+,/, ''));
		var format = 'jpg';
		var blob = new Blob([that], {type: 'blobtype'});
		directory.fs.root.getFile(name+'.'+format, {create: true}, function(fileEntry) {
			fileEntry.createWriter(function(writer) {
			writer.onwrite = function(e) {};
			writer.onerror = function(e) { console.log("error"); console.log(e); };
				var blob = new Blob([that], {type: 'blobtype'});
				writer.write(blob);
				var url = fileEntry.toURL();
				callback(url, j);
			}, errorHandler);
		}, errorHandler);
	},

	rand: function (min, max) {
		min = min || 1;
		max = max || 100;
		return Math.floor((Math.random() * max) + min);
	}
}


var directory = {};
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
window.requestFileSystem(
	window.PERSISTENT, 200*1024*1024, // 200MB
	function(filesystem) {
		directory.fs = filesystem;
	},
	errorHandler
);



var entries;
function getFilesList(){
	entries = [];
	var dirReader = directory.fs.root.createReader(); // create reader
	var readEntries = function() { // new function so you can loop on itself
		dirReader.readEntries(function(results) { // read all entries saved
			if (!results.length) {
				console.log('remove all files'); // display all entries saved
				// fileRemove();
			} else {
				entries = entries.concat(results);
				readEntries();
			}
		}, errorHandler);
	}
	readEntries();
}
function filesRemove() {
	for(var i=0; i<entries.length; i++) {
		directory.fs.root.getFile(entries[i].name, {create: false}, function(fileEntry) {
			fileEntry.remove(function() {
				console.log('File removed.');
			}, errorHandler);
		}, errorHandler);
	}
}





function base64toBlob(base64Data, contentType) {
	if(base64Data.indexOf('filesystem:chrome-extension://') > -1 || base64Data == 'file_none') {
		console.error('Потерянный файл')
		return '';
	}

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


/**
 * Функция для работы с примитивным прогрессбаром
 * @param {number || string} val_in текущее значение прогресса
 * @param {number || string} val_out цель
 * @param {string} action 'show' инициализация, 'hide' отключение, NULL просто изменение значения val_out
 */
function progressBar(val_in, val_out, action) {
	if(action == 'show') {
		$('.save_progress').show();
		$('.save_progress_in').text('0');
		$('.save_progress_out').text(val_out.toString());
	} else if(action == 'hide') {
		$('.save_progress').hide();
		$('.save_progress_in').text('0');
		$('.save_progress_out').text('0');
	} else {
		$('.save_progress_in').text(val_in.toString());
	}
}