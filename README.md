# light-navi  超轻量级导航小工具

&emsp;&emsp; 一个纯静态实现的，支持中英文名称检索的超轻量级导航小工具。主要可应用于企业 / 团队内部系统导航，**尤其适合运维、开发、测试等技术同学在日常工作中使用**。

&emsp;&emsp;在线演示地址：[https://www.dgchong.cn/light-navi/index.html](https://www.dgchong.cn/light-navi/index.html)

&emsp;&emsp;代码包：[下载](https://github.com/dgchong/light-navi/tags)


## 一、代码结构

&emsp;&emsp;`light-navi`代码包文件结构如下所示：	
```
light-navi
   ├── data
   │   └── ln.data.json
   ├── img
   ├── static
   ├── index.html
   └── README.md
```
1. ***index.html*** ：	用户操作的主窗口页面；
2. ***img目录*** ：存放导航项目的logo图片；
3. ***static目录*** ：存放`light-navi`本身其它css、img、js等静态资源文件，以及所依赖的js包；
4. ***ln.data.json*** ：存放需要导航的项目配置数据，需要增加**/**减少导航应用时，编辑该文件即可。


## 二 、安装部署

##### a. Nginx部署（推荐）
&emsp;&emsp; 1. 将下载下来的代码包，放到 Nginx 的 html 目录下;

&emsp;&emsp; 2. 执行命令`unzip light-navi-{version}.zip`解压代码包即可。

解压后，在浏览器中直接输入 [http://{nginx地址}/light-navi-{version}]() 就可以访问到主页面了。

##### b. 其它方式
&emsp;&emsp; 因为`light-navi`是通过纯静态文件实现的，所以理论上，可将其部署在任何`web`容器下使用，如`Apache`、`Tomcat`、`Jetty`等。
当然，如果你愿意，你也可以直接在本地直接用浏览器打开代码根目录下的`index.html`使用。


## 三、使用简介

&emsp;&emsp;进入`light-navi`主页面后，如下图所示：

![http://www.dgchong.cn/img/main.jpg](http://www.dgchong.cn/img/main.jpg "主操作页面")
&emsp;&emsp;在主页面中，默认将根据不同的部署环境，全量展示所有的项目列表信息：

&emsp;&emsp; 1. 直接点击项目小方块，就会在新窗口中打开对应的系统；

&emsp;&emsp; 2. 点击左侧环境菜单选项，就会筛选出对应环境的全部项目列表；

&emsp;&emsp; 3. 在搜索框中输入关键词，点搜索，就会筛选出所有包含关键词的项目列表；


## 四、编辑导航数据

&emsp;&emsp;`light-navi` 小工具默认有一些示例项目配置数据，实际使用时，你需要将其中的数据修改为自己实际的项目信息，而这些改动，
你只需要编辑 `/data` 文件夹下的 `ln.data.json` 文件即可。`ln.data.json` 文件数据结构示例如下：
```javascript
lightNaviData = {
    "config":{
	"envs":[
		"开发环境",
		"测试环境",
		"生产环境"
	],
	"showFooter":true,
	"defalutEnv":"all"
    },
    "data":[
        {
            "name":"Grafana",
			"logo":"grafana.png",
			"desc":"一个跨平台的开源的度量分析和可视化工具，可以通过将采集的数据查询然后可视化的展示，并及时通知。",
            "urls":[
                "http://grafana-dev.dgchong.cn",
				"http://grafana-test.dgchong.cn",
				"http://grafana-pro.dgchong.cn"
            ]
        },
	{
	    "name":"GitLab",
		"logo":"gitlab.png",
		"desc":"一个用于仓库管理系统的开源项目，使用Git作为代码管理工具，并在此基础上搭建起来的Web服务。",
	    "urls":[
		"http://gitlab.dgchong.cn"
	    ]
	},
	{
	    "name":"Confluence",
		"logo":"wiki.png",
		"desc":"一个专业的企业知识管理与协同软件，也可以用于构建企业wiki。",
	    "urls":[
			"",
		"http://confluence.dgchong.cn"
	    ]
	}
    ]
}
```

&emsp;&emsp;各参数字段含义简要说明如下：

<table>
   <tr>
      <th>参数</th>
      <th>参数项</th>
      <th>说明</th>
   </tr>
   <tr>
      <td rowspan="3">config</td>
      <td>envs</td>
      <td>数组。即开发、测试、生产等各个环境的名称数组，左侧菜单将根据该配置展示；后续也可根据该配置筛选。</td>
   </tr>
   <tr>
      <td>showFooter</td>
      <td>是否显示light-navi主页面下方的foot信息。不想显示改为false即可。</td>
   </tr>
   <tr>
      <td>defalutEnv</td>
      <td>默认选中的左侧菜单项。默认值为”all“，即不选中；如果需要默认选中某一项，则改为对应菜单项的值即可。（也就是envs数组中的一个值）</td>
   </tr>
   <tr>
      <td rowspan="4">data</td>
      <td>name</td>
      <td>项目名称。</td>
   </tr>
   <tr>
      <td>logo</td>
      <td>项目logo图片名称。填写后，需将对应名称的图片放在 /img 目录下；如不填值，则会默认填充展示light-Navi的logo图片。</td>
   </tr>
   <tr>
      <td>desc</td>
      <td>项目描述。</td>
   </tr>
   <tr>
      <td>urls</td>
      <td>数组。即开发、测试、生产等各个环境的项目URL地址。该数组的值与envs数组参数中的值，依次一一对应。如果某个环境没有该项目的地址，则以""占位，light-Navi将跳过处理。</td>
   </tr>
</table>

&emsp;&emsp;如果你需要增加 / 减少 / 调整需要导航的项目，直接编辑 `data` 参数数据节点并保存即可。然后直接刷新浏览器页面，就可以看到最新的导航列表。

## 其它

1. `light-navi`是一个只有3、4百行代码的纯静态导航小工具，用于满足特定的场景需求，不要期望解决太多问题。
2. `light-navi`之所以能以较少的代码，达到相对可用的状态，是因为站在了前人的肩膀上。共引入了以下3个JS库。
	1. [jquery](https://github.com/jquery/jquery) ( 用于页面基本dom操作 )
	2. [elasticlunr.js](https://github.com/weixsong/elasticlunr.js)	（ 用于支持英文全文检索 ）
	3. [pinyinjs](https://github.com/sxei/pinyinjs)	（ 用于支持中文全文检索。众所周知，因为中文的博大精深，
		中文的全文检索，分词是一个很复杂的问题，而通过纯js实现就更难了【词库太大不适和】，所以，此处笔者取了个巧，通过该库将中文转成拼音，然后
		再通过英文分词检索工具，变相实现对中文的全文检索。所以，通过中文关键词搜索时，尽量多输入几个关键字，以提高检索准确度。）
	

&emsp;&emsp;
&emsp;&emsp;		
&emsp;&emsp;
&emsp;&emsp;
&emsp;&emsp;

**如果你觉得`light-navi`还不错的话，右上角帮点个小:star::star::star:吧~	:blush:**

&emsp;&emsp;
&emsp;&emsp;		
&emsp;&emsp;
&emsp;&emsp;
&emsp;&emsp;
