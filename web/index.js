Ext.define('index', {
    extend: 'Ext.container.Viewport',
    initComponent: function () {
        var me = this;
        var test = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/kucun',
                reader: {
                    type: 'json',
                    root: 'mes'
                }

            },
            fields: ['meMerchandiseInfoByMerchandiseId.merchandiseName', 'num'],
            autoLoad: true
        });
        Ext.Ajax.request({
            url: 'validOper',
            async: false,
            success: function (response) {
                logger = Ext.JSON.decode(response.responseText);
            },
            failure: function () {
                window.location.href = 'login.html'
            }
        });

        var username1 = logger.list[0].operName;
        var power = logger.list[0].auRoleInfoByRoleId.roleName;
        var roleid = logger.list[0].auRoleInfoByRoleId.roleId;
        Ext.Ajax.request({
            url: 'caidan23',
            async: false,
            success: function (response) {
                me.menuData = Ext.JSON.decode(response.responseText);
            }
        });
        me.roleStore = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            fields: [
                {
                    name: 'id', type: 'String', mapping: 'menuinfoEntity.menuId'
                },
                {
                    name: 'text', type: 'String', mapping: 'menuinfoEntity.menuName'
                }
            ],
            root: {
                text: '登陆者权限',
                id: '-1',
                children: me.menuData.menulist.children
            }
        });
        this.createMenuList();

        Ext.apply(this, {

            layout: 'border',
            style: {
                backgroundColor: '#d3e1f1'
            },
            items: [
                {
                    region: 'north',
                    xtype: 'toolbar',
                    border: false,
                    height: 60,
                    style: 'background-color:#157fcc',
                    items: [
                        {
                            xtype: 'tbtext',
                            text: '电子商务后台管理系统',
                            style: {
                                color: 'black',
                                fontSize: '20pt',
                                font: ''
                            }


                        },
//                        {
//                            html: '<div class="header">' +
//                                '<img class="logo" SRC="img/LOGO.gif"/>' +
//                                '<div class="title">' +
//                                '<div class="wrap"><span class="color">XX电商管理系统</span></div>'
//                                +
//                                '<span class="back">XX电商管理系统</span>' +
//                                '</div>' +
//                                '<marquee  scrollAmount=4   onmouseout=start() width="600" >' +
//                                '<img class="welcome" src="img/welcome.gif"/>' +
//                                '<h2 class="x-panel-header">&nbsp;&nbsp;&nbsp;欢&nbsp;迎&nbsp;您&nbsp;的&nbsp;使&nbsp;用&nbsp;!</h2>' +
//                                '</marquee>' +
//                                '</div>'
//                            columnWidth: .78,
//                            columnHeight: 2
//                        },
                        { xtype: 'tbfill' },
                        {  xtype: 'tbtext', text: '操作员：'},
                        { xtype: 'tbtext', text: username1},
                        {xtype: 'tbtext', text: '权限：'},
                        { xtype: 'tbtext', text: power},
                        {
                            xtype: 'button',
                            text: '注销',
                            handler: function () {
                                Ext.MessageBox.confirm('提示消息', '是否要退出当前用户?', function (choice) {
                                    if (choice == 'yes') {
                                        window.location = "loginout.jsp"
                                    }
                                });
                            }
                        }
                    ]
                },
                {
                    region: 'west',

                    width: 200,
                    title: '<font size=4>主功能导航</font>',
                    //  title: '主功能导航',
                    layout: 'accordion',
                    collapsible: true,
                    split: true,
                    margin: '5 0 5 0',
                    items: me.menuList
                },
                {
                    region: 'center',
                    title: '',
                    html: '',
                    margin: '5 0 5 0',
                    xtype: 'tabpanel',
                    id: 'mytabPanel',
                    items: [
                        {
                            title: '统计图',
                            closable: true,
                            bodyStyle: {
                                background: 'url(img/23.jpg) no-repeat '
                            },

                            items: [
                                {
                                    items: [
                                        { xtype: 'chart',
                                            width: 650,
                                            height: 300,
                                            animate: true,
                                            store: test,
                                            theme: 'Base:gradients',
                                            series: [
                                                {
                                                    type: 'pie',
                                                    angleField: 'num',
                                                    showInLegend: true,
                                                    tips: {
                                                        trackMouse: true,
                                                        renderer: function (storeItem, item) {
                                                            var total = 0;
                                                            test.each(function (rec) {
                                                                total += rec.get('num');
                                                            });
                                                            this.setTitle(storeItem.get('meMerchandiseInfoByMerchandiseId.merchandiseName') + ': ' + Math.round(storeItem.get('num') / total * 100) + '%');
                                                        }
                                                    },
                                                    highlight: {
                                                        segment: {
                                                            margin: 20
                                                        }
                                                    },
                                                    label: {
                                                        field: 'meMerchandiseInfoByMerchandiseId.merchandiseName',
                                                        display: 'rotate',
                                                        contrast: true,
                                                        font: '18px Arial'
                                                    }
                                                }
                                            ]},
                                        {width: 650,
                                            height: 300,
                                            xtype: 'chart',
                                            animate: true,
                                            store: test,
                                            axes: [
                                                {
                                                    type: 'Numeric',
                                                    position: 'bottom',
                                                    fields: ['num'],
                                                    label: {
                                                        renderer: Ext.util.Format.numberRenderer('0,0')
                                                    },
                                                    title: '',
                                                    grid: true,
                                                    minimum: 0
                                                },
                                                {
                                                    type: 'Category',
                                                    position: 'left',
                                                    fields: ['meMerchandiseInfoByMerchandiseId.merchandiseName'],
                                                    title: ''
                                                }
                                            ],
                                            series: [
                                                {
                                                    type: 'bar',
                                                    axis: 'bottom',
                                                    highlight: true,
                                                    tips: { trackMouse: true,
                                                        width: 140,
                                                        height: 28,
                                                        renderer: function (storeItem, item) {
                                                            this.setTitle(storeItem.get('meMerchandiseInfoByMerchandiseId.merchandiseName') + ': ' + storeItem.get('num') + ' views');
                                                        }
                                                    },
                                                    label: {
                                                        display: 'insideEnd',
                                                        field: 'num',
                                                        renderer: Ext.util.Format.numberRenderer('0'),
                                                        orientation: 'horizontal',
                                                        color: '#333',
                                                        'text-anchor': 'middle'
                                                    },
                                                    xField: 'meMerchandiseInfoByMerchandiseId.merchandiseName',
                                                    yField: 'num'
                                                }
                                            ]}
                                    ]
                                }
                            ]
                        }
//                        {
//                            title: '线型图',
//                            closable: true,
//                            width: 500,
//                            height: 300,
//                            xtype: 'chart',
//                            animate: true,
//                            store: test,
//                            axes: [
//                                {
//                                    type: 'Numeric',
//                                    position: 'bottom',
//                                    fields: ['num'],
//                                    label: {
//                                        renderer: Ext.util.Format.numberRenderer('0,0')
//                                    },
//                                    title: 'Sample Values',
//                                    grid: true,
//                                    minimum: 0
//                                },
//                                {
//                                    type: 'Category',
//                                    position: 'left',
//                                    fields: ['meMerchandiseInfoByMerchandiseId.merchandiseName'],
//                                    title: 'Sample Metrics'
//                                }
//                            ],
//                            series: [
//                                {
//                                    type: 'bar',
//                                    axis: 'bottom',
//                                    highlight: true,
//                                    tips: { trackMouse: true,
//                                        width: 140,
//                                        height: 28,
//                                        renderer: function (storeItem, item) {
//                                            this.setTitle(storeItem.get('meMerchandiseInfoByMerchandiseId.merchandiseName') + ': ' + storeItem.get('num') + ' views');
//                                        }
//                                    },
//                                    label: {
//                                        display: 'insideEnd',
//                                        field: 'num',
//                                        renderer: Ext.util.Format.numberRenderer('0'),
//                                        orientation: 'horizontal',
//                                        color: '#333',
//                                        'text-anchor': 'middle'
//                                    },
//                                    xField: 'meMerchandiseInfoByMerchandiseId.merchandiseName',
//                                    yField: 'num'
//                                }
//                            ]
//                        }
                    ],
                    bodyStyle: {
                        background: 'url(img/33.jpg) no-repeat '
                    }

                },
                {

                    region: 'east',
                    title: '权限',
                    width: 200,
                    collapsible: true,
                    split: true,
                    margin: '5 0 5 0',
                    xtype: 'treepanel',
                    id:'tree44',
                    store: me.roleStore


                },
                {
                    region: 'south',
                    xtype: 'toolbar',

                    border: false,

                    items: ['->',
                        {
                            xtype: 'tbtext',
                            id: 'mydate',
                            style: {
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: 'silver'
                            },
                            width: 200,
                            listeners: {
                                'render': function () {
                                    Ext.TaskManager.start({
                                        run: function () {
                                            Ext.getCmp('mydate').update('系统时间：' + Ext.util.Format.date((new Date()), 'Y-m-d H:i:s'));
                                        },
                                        interval: 1000
                                    });
                                }
                            }
                        },
                        '->',
                        {
                            xtype: 'tbtext',
                            text: '版权所有 启奥实训',
                            style: {
                                color: 'red',
                                fontWeight: 'bold'
                            }
                        }
                    ]

                }
            ]
        });
        this.callParent();
        Ext.getCmp("tree44").expandAll();
    },
    menuList: new Array(),
    createMenuList: function () {
        var menuData = {}, tpl, me = this;

        tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="part01">',
            '<img src="{src}">',
            '<div class="con" style="">',
            '<span>{menuName}</span>',
            '<div class="con1">{remark}</div>',
            '</div>',
            '</div>',
            '</tpl>'
        );
        Ext.Ajax.request({
            url: 'validOper',
            async: false,
            success: function (response) {
                logger = Ext.JSON.decode(response.responseText);
            },
            failure: function () {
                window.location.href = 'login.html'
            }
        });
        var roleid = logger.list[0].auRoleInfoByRoleId.roleId;

        Ext.Ajax.request({
//          url: 'caidan2?aa.auRoleInfoByRoleId.roleId='+roleid,
            url: 'caidan23',
            async: false,
            success: function (response) {
                menuData = Ext.JSON.decode(response.responseText);
            }
        });


        for (var i = 0, len = menuData.menulist.children.length; i < len; i++) {
            var storeID = 'store_' + i, item, title = menuData.menulist.children[i].menuinfoEntity.menuName;
            Ext.create('Ext.data.Store', {
                id: storeID,
                data: menuData.menulist.children[i].children,
                fields: [
                    { name: 'remark', type: 'string' },
                    {name: 'TAuMenuInfoEntity.menuId', type: 'string'}, //TODO 返回的根节点的各个字段名
                    {name: 'menuName', type: 'string', mapping: 'menuinfoEntity.menuName'},
                    {name: 'src', type: 'string', mapping: 'menuinfoEntity.src'},
                    {name: 'url', type: 'string', mapping: 'menuinfoEntity.url'},
                    {name: 'tag', type: 'string', mapping: 'menuinfoEntity.tag'}
                ]
            });

            item = {
                xtype: 'panel',
                title: title,
                layout: 'fit',
                items: [
                    {
                        xtype: 'dataview',
                        store: Ext.data.StoreManager.lookup(storeID),
                        tpl: tpl,
                        itemSelector: 'div.part01',
                        listeners: {
                            itemdblclick: function (view, record) {
                                Ext.require(record.get('url'), function () {
                                    var center = Ext.getCmp('mytabPanel');
                                    var tab = center.items.get(record.get('tag'));
                                    if (!tab) {
                                        var obj = Ext.create(record.get('url'));
                                        center.add(obj);
                                        center.setActiveTab(obj);
                                    } else {
                                        if (center.setActiveTab() !== tab) {
                                            center.setActiveTab(obj);
                                        }

                                    }

                                }, this);
                            }
                        }
                    }
                ]
            };
            me.menuList.push(item);
        }
    }
});