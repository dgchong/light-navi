$(document).ready(function() {
	//全局变量
	var globalEnvName = null;

	//1、初始加载数据
	if (undefined == lightNaviData) {
		console.error('loading light navi data error!');
		return false;
	}

	//2、初始生效相关配置参数
	effectiveConfig(lightNaviData.config);

	//3、渲染左侧菜单列表
	refreshLeftNav(lightNaviData.config.envs);

	//4、创建文档索引结构
	var sysDataIndex = createIndexSchema();

	//5、构建文档索引数据
	structureSysDataIndex(lightNaviData, sysDataIndex);

	//6、默认初始显示的系统导航列表
	showSysItems(sysDataIndex.documentStore.docs);

	//7、点击搜索按钮
	$("#search-btn").bind("click", function() {
		let kws = $("#search-input").val();
		if ($.isEmptyObject(kws)) {
			showSysItems(sysDataIndex.documentStore.docs);
			return false;
		}
		kws = pinyinUtil.getPinyin(kws);
		let searchResultArr = sysDataIndex.search(kws, {
			fields: {
				name: {
					boost: 1
				},
				name_py: {
					boost: 1
				},
				desc: {
					boost: 1
				},
				desc_py: {
					boost: 1
				}
			},
			bool: "AND",
			expand: true
		});
		let docs = [];
		if (!$.isEmptyObject(searchResultArr)) {
			for (let i = 0, len = searchResultArr.length; i < len; i++) {
				docs.push(searchResultArr[i].doc);
			}
		}
		showSysItems(docs);
	});

	//8、监听enter键事件
	$(document).keyup(function(event) {
		if (event.keyCode == 13) {
			$("#search-btn").trigger("click");
		}
	});

	//9、左侧菜单点击事件
	$("#nav-ul li").bind("click", function() {
		let li = $(this);
		if (li.hasClass('nav-li-selected')) {
			globalEnvName = null;
		} else {
			globalEnvName = $(this).text();
			li.siblings().removeClass('nav-li-selected');
		}
		li.toggleClass('nav-li-selected');
		$("#search-btn").trigger("click");
	});

	//初始生效相关配置参数
	function effectiveConfig(config) {
		let showFooter = config.showFooter;
		if (!showFooter) {
			$("#ontent-footer").addClass('footer-hidden')
		}
		let defalutEnv = config.defalutEnv;
		if ('all' != defalutEnv) {
			let index = $.inArray(defalutEnv, config.envs);
			if (-1 < index) {
				globalEnvName = defalutEnv;
			}
		}
	}
	
	//渲染左侧菜单列表
	function refreshLeftNav(items) {
		if ($.isEmptyObject(items)) {
			console.error('config envs data is empty!')
			return false;
		}
		let navHtml = '';
		for (item of items) {
			if (item == globalEnvName) {
				navHtml += '<li class="nav-li-selected">' + item + '</li>';
			} else {
				navHtml += '<li>' + item + '</li>';
			}
		}
		$('#nav-ul').html(navHtml);
	}

	//创建文档索引结构
	function createIndexSchema() {
		var index = elasticlunr(function() {
			var fields = ['name', 'name_py', 'logo', 'desc', 'desc_py', 'env', 'url'];
			for (field of fields) {
				this.addField(field);
			}
			this.setRef('id');
		});
		return index;
	}

	//构建文档索引数据
	function structureSysDataIndex(lightNaviData, sysDataIndex) {
		var envs = lightNaviData.config.envs;
		for (var i = 0, len = lightNaviData.data.length; i < len; i++) {
			var sys = lightNaviData.data[i];
			var urlArr = sys.urls;
			for (var j = 0, lenj = urlArr.length; j < lenj; j++) {
				//如果url配置值为空，则说明没有该环境的系统入口配置，跳过
				if (("" === urlArr[j]) || (null === urlArr[j])) {
					continue;
				}
				//数据项中url数组的长度，如果超过了全局的环境变量数组长度，则直接跳过
				if (j >= envs.length) {
					continue;
				}
				//构建索引doc对象
				var doc = {
					"name": sys.name,
					"name_py": pinyinUtil.getPinyin(sys.name),
					"logo": fillDefaultLogo(sys.logo),
					"desc": sys.desc,
					"desc_py": pinyinUtil.getPinyin(sys.desc),
					"env": envs[j],
					"url": urlArr[j],
					"id": i * 10 + j
				}
				sysDataIndex.addDoc(doc);
			}
		}
	}

	//填充默认logo
	function fillDefaultLogo(logo) {
		if (!$.isEmptyObject(logo)) {
			return logo;
		}
		return 'default.png';
	}

	//展示导航项
	function showSysItems(docs) {
		var itemsHtml = '';
		if ($.isEmptyObject(docs)) {
			itemsHtml = '<div class="item-none">empty !</div>';
		} else {
			let itemsMap = new Map();
			$.each(docs, function(i, doc) {
				let env = doc.env;
				//如果选了环境，则只要符合条件的
				if (null != globalEnvName) {
					if (env != globalEnvName) {
						return true;
					}
				}
				if (itemsMap.has(env)) {
					itemsMap.get(env).push(doc);
				} else {
					itemsMap.set(env, [doc]);
				}
			});
			for ([key, items] of itemsMap) {
				let envHtml = '<fieldset class="item-field">' +
					'<legend>' + key + '</legend>' +
					'<div class="field-div">'
				for (doc of items) {
					let sysHtml = '<a href="' + doc.url + '">' +
						'<section class="sys-item">' +
						'<span class="item-logo">' +
						'<img src="img/' + doc.logo + '" title="' + doc.name + '" />' +
						'</span>' +
						'<span class="item-words">' +
						'<span class="name">' + doc.name + '</span>' +
						'<span class="desc">' + doc.desc + '</span>' +
						'</span>' +
						'</section>' +
						'</a>'
					envHtml = envHtml + sysHtml;
				}
				envHtml += '</div></fieldset>';
				itemsHtml = itemsHtml + envHtml;
			}
		}
		$("#content-item").html(itemsHtml);
	}
});